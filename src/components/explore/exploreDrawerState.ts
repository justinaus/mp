import { atom } from 'recoil';

export const exploreDrawerOpenState = atom<boolean>({
  key: 'exploreDrawerOpenState',
  default: false,
});
