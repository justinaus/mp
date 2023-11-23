import { useMemo, useRef } from 'react';
import { Overlay, useMap } from 'react-naver-maps';

import { CustomOverlay } from './CustomOverlay';
import { createCustomMarker, latLng } from './helper';
import { Restaurant } from './types';

type Props = {
  restaurant: Restaurant;
};

export default function MpOverlay({ restaurant }: Props) {
  const map = useMap();

  // 마커를 한번만 생성하기 위해 useRef 사용
  const overlayRef = useRef<CustomOverlay<Restaurant> | null>(null);

  if (!map) return null;

  if (!overlayRef.current) {
    overlayRef.current = new CustomOverlay<Restaurant>({
      position: latLng(restaurant.latLng),
      map: map,
      element: createCustomMarker(
        <Marker restaurant={restaurant} />,
        <MarkerMeta restaurant={restaurant} />,
      ),
      // onClick: handleClick,
      data: restaurant,
    });
  }

  return <Overlay element={overlayRef.current} />;
}

function Marker({ restaurant }: { restaurant: Restaurant }) {
  const classes = useMemo(() => {
    // if (restaurant.isHighlight)
    //   return 'naver-marker-place naver-marker-place-blue-image';

    return 'naver-marker-place';
  }, []);

  return (
    <div className={classes}>
      <span className="emoji">{restaurant.emoji || '📍'}</span>
    </div>
  );
}

function MarkerMeta({ restaurant }: { restaurant: Restaurant }) {
  return <div className="naver-marker-name">{restaurant.name}</div>;
}
