import { useCallback } from 'react';
import { useSetRecoilState } from 'recoil';

import GeolocationButton from '../shared/map/GeolocationButton';
import { LatLng } from '../shared/map/types';
import { exploreMapCenterState } from './exploreMapCenterState';

export default function ExploreGeolocationButton() {
  const setExploreMapCenter = useSetRecoilState(exploreMapCenterState);

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
