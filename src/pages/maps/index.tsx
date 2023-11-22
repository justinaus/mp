import { Box } from '@mui/material';
import { Container as MapDiv } from 'react-naver-maps';

import Map from '@/components/map/Map';

export default function Maps() {
  return (
    <Box>
      Maps!!
      <MapDiv
        style={{
          height: 400,
        }}
      >
        <Map />
      </MapDiv>
    </Box>
  );
}
