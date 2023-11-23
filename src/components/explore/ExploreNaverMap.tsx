import { useQuery } from '@tanstack/react-query';
import queryString from 'query-string';
import { useMemo } from 'react';
import { NaverMap, useNavermaps } from 'react-naver-maps';
import { useRecoilValue } from 'recoil';

import { NaverAllSearchResponse } from '@/pages/api/naver/search/allSearch';

import MarkerCluster from '../shared/map/MarkerCluster';
import { exploreMapCenterState } from './exploreMapCenterState';

export default function ExploreNaverMap() {
  const navermaps = useNavermaps();

  const mapCenter = useRecoilValue(exploreMapCenterState);

  const { data } = useQuery<NaverAllSearchResponse>({
    queryKey: ['naver/search/allSearch', mapCenter.lng, mapCenter.lat],
    queryFn: () => {
      const obj = {
        query: '음식점',
        type: 'all',
        searchCoord: `${mapCenter.lng};${mapCenter.lat}`,
        // boundary
      };

      return fetch(
        `/api/naver/search/allSearch?${queryString.stringify(obj)}`,
      ).then((res) => res.json());
    },
  });

  const center = useMemo(() => {
    return new navermaps.LatLng(mapCenter.lat, mapCenter.lng);
  }, [mapCenter.lat, mapCenter.lng, navermaps.LatLng]);

  return (
    <NaverMap center={center} zoom={mapCenter.zoom}>
      {/* <Marker defaultPosition={new navermaps.LatLng(37.3595704, 127.105399)} /> */}
      {data?.data && <MarkerCluster places={data.data} />}
    </NaverMap>
  );
}
