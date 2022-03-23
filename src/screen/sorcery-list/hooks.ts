import { useSearchParams } from 'react-router-dom';

import { entities, Entity } from '../../common/model/sorcery';

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

export function useSphereRequirementFilter() {
  const [searchParams, setSearchParams] = useSearchParams();
  const setSphereRequirement = (newMaximum: number) => {
    searchParams.set('maxSphere', newMaximum.toString());
    setSearchParams(searchParams);
  };
  return [
    !searchParams.has('maxSphere') ? 5 : Number(searchParams.get('maxSphere')),
    setSphereRequirement,
  ] as [number, typeof setSphereRequirement];
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
