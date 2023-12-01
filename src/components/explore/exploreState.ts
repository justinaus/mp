import { atom } from 'recoil';

import { DEFAULT_LAT_LNG, DEFAULT_MAP_ZOOM } from '@/constants/map';
import { recoilPersist } from '@/utils/persistState';

import { LatLng } from '../shared/map/types';

const { persistAtom: persistExploreMapCenterAndZoom } = recoilPersist({
  key: 'persistExploreMapCenterAndZoom',
});
export const exploreMapCenterAndZoomState = atom<
  LatLng & {
    zoom: number;
  }
>({
  key: 'exploreMapCenterAndZoomState',
  default: {
    lat: DEFAULT_LAT_LNG.lat,
    lng: DEFAULT_LAT_LNG.lng,
    zoom: DEFAULT_MAP_ZOOM,
  },
  effects_UNSTABLE: [persistExploreMapCenterAndZoom],
});

export const exploreDrawerOpenState = atom<boolean>({
  key: 'exploreDrawerOpenState',
  default: false,
});
