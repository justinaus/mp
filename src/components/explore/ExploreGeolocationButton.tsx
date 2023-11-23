import { useCallback } from 'react';
import { useSetRecoilState } from 'recoil';

import GeolocationButton from '../map/GeolocationButton';
import { LatLng } from '../map/types';
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
