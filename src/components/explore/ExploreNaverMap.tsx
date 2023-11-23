import { useQuery } from '@tanstack/react-query';
import queryString from 'query-string';
import { useCallback, useMemo } from 'react';
import { NaverMap, useNavermaps } from 'react-naver-maps';
import { useRecoilState } from 'recoil';
import { useDebouncedCallback } from 'use-debounce';

import { NaverAllSearchResponse } from '@/pages/api/naver/search/allSearch';

import MpOverlay from '../shared/map/MpOverlay';
import { exploreMapCenterState } from './exploreMapCenterState';

export default function ExploreNaverMap() {
  const navermaps = useNavermaps();

  const [mapCenter, setMapCenter] = useRecoilState(exploreMapCenterState);

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

  const debounced = useDebouncedCallback(
    // function
    (value) => {
      setMapCenter((oldValue) => ({
        ...oldValue,
        lat: value.y,
        lng: value.x,
      }));
    },
    // delay in ms
    1000,
  );

  const center = useMemo(() => {
    return new navermaps.LatLng(mapCenter.lat, mapCenter.lng);
  }, [mapCenter.lat, mapCenter.lng, navermaps.LatLng]);

  const handleCenterChanged = useCallback(
    (value: naver.maps.Coord) => {
      debounced(value);
    },
    [debounced],
  );

  return (
    <NaverMap
      center={center}
      zoom={mapCenter.zoom}
      onCenterChanged={handleCenterChanged}
    >
      {/* <Marker defaultPosition={new navermaps.LatLng(37.3595704, 127.105399)} /> */}
      {data?.data &&
        data?.data.map((item) => <MpOverlay key={item.id} restaurant={item} />)}
    </NaverMap>
  );
}
