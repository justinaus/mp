import { useRecoilState } from 'recoil';

import SwipeableEdgeDrawer from '@/pages/explore/SwipeableEdgeDrawer';

import { exploreDrawerOpenState } from './exploreDrawerState';

export default function ExploreRestaurantsDrawer() {
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
      123
    </SwipeableEdgeDrawer>
  );
}
