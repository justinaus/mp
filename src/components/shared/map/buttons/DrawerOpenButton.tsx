import React from 'react';

import TransparentOutlinedIconButton from '../../buttons/TransparentOutlinedIconButton';

type Props = Pick<
  React.ComponentProps<typeof TransparentOutlinedIconButton>,
  'onClick' | 'sx'
>;

export default function DrawerOpenButton({ sx, ...rest }: Props) {
  return (
    <TransparentOutlinedIconButton
      color="primary"
      sx={{
        width: undefined,
        height: undefined,
        minWidth: undefined,
        padding: undefined,
        ...sx,
      }}
      {...rest}
    >
      Open Drawer
    </TransparentOutlinedIconButton>
  );
}
