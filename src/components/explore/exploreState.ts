import { atom } from 'recoil';

import { DEFAULT_LAT_LNG, DEFAULT_MAP_ZOOM } from '@/constants/map';
import { recoilPersist } from '@/utils/persistState';

import { LatLng } from '../shared/map/types';

const { persistAtom: persistExploreMapDefaultCenterAndZoom } = recoilPersist({
  key: 'persistExploreMapDefaultCenterAndZoom',
});
export const exploreMapDefaultCenterAndZoomState = atom<
  LatLng & {
    zoom: number;
  }
>({
  key: 'exploreMapDefaultCenterAndZoomState',
  default: {
    lat: DEFAULT_LAT_LNG.lat,
    lng: DEFAULT_LAT_LNG.lng,
    zoom: DEFAULT_MAP_ZOOM,
  },
  effects_UNSTABLE: [persistExploreMapDefaultCenterAndZoom],
});

export const exploreDrawerOpenState = atom<boolean>({
  key: 'exploreDrawerOpenState',
  default: false,
});

type QueryParams = {
  query: string;
  type: 'all'; // TODO.
  // page: number;
  center: LatLng;
  boundary: string | null;
};

export const exploreQueryParamsState = atom<QueryParams | null>({
  key: 'exploreQueryParamsState',
  default: null,
});
