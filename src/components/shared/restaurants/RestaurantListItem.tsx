import { Stack } from '@mui/material';

// type RestaurantInfo = Pick<NaverPlace, 'id' | 'rank' | 'name' | 'michelinGuide'>

export default function RestaurantListItem() {
  return (
    <Stack spacing={4}>
      <Stack
        direction={'row'}
        sx={{
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        {/* <Typography variant="h2">{name}</Typography> */}
      </Stack>
    </Stack>
  );
}
