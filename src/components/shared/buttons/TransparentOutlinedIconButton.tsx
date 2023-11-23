import { Button } from '@mui/material';
import React from 'react';

type Props = React.ComponentProps<typeof Button>;

export default function TransparentOutlinedIconButton({
  children,
  sx,
  ...rest
}: Props) {
  return (
    <Button
      variant="outlined"
      sx={{
        padding: 0,
        width: 36,
        height: 36,
        minWidth: 36,
        // https://gist.github.com/lopspower/03fb1cc0ac9f32ef38f4
        backgroundColor: '#ffffffe6', // e6 = 90%
        ' &:hover': {
          backgroundColor: '#ffffffe6', // e6 = 90%
        },
        ...sx,
      }}
      {...rest}
    >
      {children}
    </Button>
  );
}
