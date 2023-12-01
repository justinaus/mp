import { useCallback } from 'react';
import { useSetRecoilState } from 'recoil';

import GeolocationButton from '../shared/map/GeolocationButton';
import { LatLng } from '../shared/map/types';
import { exploreMapCenterAndZoomState } from './exploreState';

export default function ExploreGeolocationButton() {
  const setExploreMapCenter = useSetRecoilState(exploreMapCenterAndZoomState);

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
