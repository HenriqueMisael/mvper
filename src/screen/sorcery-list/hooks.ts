import { useSearchParams } from 'react-router-dom';

import { entities, Entity } from '../../common/model/sorcery';
import { selectors, useSelector } from '../../store';
import { getSorceries } from '../../store/core/selectors';

import { GrimMor, GrimMorID } from './grim-mor/slice/model';

export function useSelectedEntities() {
  const [searchParams, setSearchParams] = useSearchParams();
  const setSelectedEntities = (newlySelectedEntities: Entity[]) => {
    searchParams.set('entity', newlySelectedEntities.join(','));
    setSearchParams(searchParams);
  };

  return [searchParams.get('entity')?.split(',') ?? entities, setSelectedEntities] as [
    Entity[],
    typeof setSelectedEntities,
  ];
}

export function usePowerFilter() {
  const [searchParams, setSearchParams] = useSearchParams();
  const setPower = (newMaximum: number) => {
    searchParams.set('maxPower', newMaximum.toString());
    setSearchParams(searchParams);
  };

  return [
    !searchParams.has('maxPower') ? 5 : Number(searchParams.get('maxPower')),
    setPower,
  ] as [number, typeof setPower];
}

export function useSelectedGrimMorID() {
  const [searchParams, setSearchParams] = useSearchParams();
  const setSelectedGrimMorID = (grimMorID: GrimMorID) => {
    searchParams.set('grimMor', grimMorID);
    setSearchParams(searchParams);
  };

  return [searchParams.get('grimMor'), setSelectedGrimMorID] as [
    GrimMorID,
    typeof setSelectedGrimMorID,
  ];
}

export function useSelectedGrimMor() {
  const [searchParams, setSearchParams] = useSearchParams();

  const setSelectedGrimMor = (grimMor: GrimMor | null) => {
    searchParams.set('grimMor', grimMor == null ? '' : grimMor.id);
    setSearchParams(searchParams);
  };

  const grimMorByGrimMorID = useSelector(selectors.grimMor.getGrimMorByGrimMorID);
  const selectedGrimMorID = searchParams.get('grimMor');
  const selectedGrimMor =
    selectedGrimMorID === null || !(selectedGrimMorID in grimMorByGrimMorID)
      ? null
      : grimMorByGrimMorID[selectedGrimMorID];

  return [selectedGrimMor, setSelectedGrimMor] as [GrimMor | null, typeof setSelectedGrimMor];
}

export function useSelectedGrimMorSorceries() {
  const [selectedGrimMor] = useSelectedGrimMor();
  if (selectedGrimMor == null) return null;
  return selectedGrimMor.sorceries;
}

export function useFilteredSorceryList() {
  const baseSorceries = useSelector(getSorceries);
  const [selectedEntities] = useSelectedEntities();
  const [maxPower] = usePowerFilter();
  const selectedGrimMorSorceries = useSelectedGrimMorSorceries();

  const sorceries = selectedGrimMorSorceries != null ? selectedGrimMorSorceries : baseSorceries;
  return sorceries.filter((sorcery) => {
    if (!selectedEntities.includes(sorcery.entity)) return false;
    return sorcery.power <= maxPower;
  });
}
