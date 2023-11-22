import { Box } from '@mui/material';
import { useEffect } from 'react';
import { Container as MapDiv } from 'react-naver-maps';

import Map from '@/components/map/Map';

export default function Maps() {
  useEffect(() => {
    fetch(
      `/api/naver/search/allSearch?query=%EC%9D%8C%EC%8B%9D%EC%A0%90&type=all&searchCoord=127.10845479999955%3B37.367722699999945&boundary=`,
    );
  }, []);

  return (
    <Box>
      Maps!!
      <MapDiv
        style={{
          height: 1000,
        }}
      >
        <Map />
      </MapDiv>
    </Box>
  );
}
