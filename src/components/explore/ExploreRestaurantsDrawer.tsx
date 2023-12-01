import { Stack } from '@mui/material';
import { useRecoilState } from 'recoil';

import SwipeableEdgeDrawer from '@/pages/explore/SwipeableEdgeDrawer';

import RestaurantListItem, {
  RestaurantInfo,
} from '../shared/restaurants/RestaurantListItem';
import { exploreDrawerOpenState } from './exploreState';

type Props = {
  restaurants: RestaurantInfo[] | null;
};

export default function ExploreRestaurantsDrawer({ restaurants }: Props) {
  const [exploreDrawerOpen, setExploreDrawerOpen] = useRecoilState(
    exploreDrawerOpenState,
  );

  const toggleDrawer = (newOpen: boolean) => () => {
    setExploreDrawerOpen(newOpen);
  };

  return (
    <SwipeableEdgeDrawer
      open={exploreDrawerOpen}
      onOpen={toggleDrawer(true)}
      onClose={toggleDrawer(false)}
    >
      <Stack spacing={8}>
        {restaurants?.map((restaurant) => (
          <RestaurantListItem key={restaurant.id} data={restaurant} />
        ))}
      </Stack>
    </SwipeableEdgeDrawer>
  );
}
