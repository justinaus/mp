import { atom } from 'recoil';

import { DEFAULT_LAT_LNG, DEFAULT_MAP_ZOOM } from '@/constants/map';
import { recoilPersist } from '@/utils/persistState';

import { LatLng } from '../map/types';

const { persistAtom: persistExploreMapCenter } = recoilPersist({
  key: 'persistHomeMapCenter',
});
export const exploreMapCenterState = atom<
  LatLng & {
    zoom: number;
  }
>({
  key: 'exploreMapCenterState',
  default: {
    lat: DEFAULT_LAT_LNG.lat,
    lng: DEFAULT_LAT_LNG.lng,
    zoom: DEFAULT_MAP_ZOOM,
  },
  effects_UNSTABLE: [persistExploreMapCenter],
});
