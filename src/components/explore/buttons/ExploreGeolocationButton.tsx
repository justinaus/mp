import { useCallback } from 'react';
import { useSetRecoilState } from 'recoil';

import GeolocationButton from '../../shared/map/buttons/GeolocationButton';
import { LatLng } from '../../shared/map/types';
import { exploreMapDefaultCenterAndZoomState } from '../exploreState';

export default function ExploreGeolocationButton() {
  const setExploreMapCenter = useSetRecoilState(
    exploreMapDefaultCenterAndZoomState,
  );

  const handleGetGeolocationPosition = useCallback(
    (latLng: LatLng) => {
      setExploreMapCenter((originData) => ({
        ...originData,
        ...latLng,
      }));
    },
    [setExploreMapCenter],
  );

  return (
    <GeolocationButton
      onGetGeolocationPosition={handleGetGeolocationPosition}
    />
  );
}
