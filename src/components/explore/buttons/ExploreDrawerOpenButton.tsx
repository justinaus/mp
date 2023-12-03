import { useCallback } from 'react';
import { useSetRecoilState } from 'recoil';

import DrawerOpenButton from '@/components/shared/map/buttons/DrawerOpenButton';

import { exploreDrawerOpenState } from '../exploreState';

export default function ExploreDrawerOpenButton() {
  const setExploreDrawerOpen = useSetRecoilState(exploreDrawerOpenState);

  const handleClick = useCallback(() => {
    setExploreDrawerOpen(true);
  }, [setExploreDrawerOpen]);

  return <DrawerOpenButton onClick={handleClick} />;
}
