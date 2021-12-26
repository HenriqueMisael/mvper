import { Overlay, Spinner } from '@blueprintjs/core';
import { selectors, useSelector } from '../../store';
import './index.scss';

export const LoadingOverlay = () => {
  const isFetching = useSelector(selectors.core.getIsFetching);

  return (
    <Overlay enforceFocus usePortal hasBackdrop isOpen={isFetching}>
      <div className="global-loader">
        <Spinner />
      </div>
    </Overlay>
  );
};
