import { Stack, Typography } from '@mui/material';
import InfiniteScroll from 'react-infinite-scroll-component';
import { useRecoilState } from 'recoil';

import SwipeableEdgeDrawer from '@/pages/explore/SwipeableEdgeDrawer';

import RestaurantListItem, {
  RestaurantInfo,
} from '../shared/restaurants/RestaurantListItem';
import { exploreDrawerOpenState } from './exploreState';

type Props = {
  restaurants: RestaurantInfo[] | null;
  hasMore: boolean | null;
  onNext: () => void;
};

export default function ExploreRestaurantsDrawer({
  restaurants,
  hasMore,
  onNext,
}: Props) {
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
      {restaurants?.length === 0 && (
        <Typography variant="subtitle3">검색 결과가 없습니다.</Typography>
      )}
      <InfiniteScroll
        scrollableTarget="scrollableDiv"
        next={onNext}
        hasMore={!!hasMore}
        loader={<></>}
        dataLength={restaurants?.length || 0}
        // height={500}
      >
        <Stack spacing={8}>
          {restaurants?.map((restaurant) => (
            <RestaurantListItem key={restaurant.id} data={restaurant} />
          ))}
        </Stack>
      </InfiniteScroll>
    </SwipeableEdgeDrawer>
  );
}
