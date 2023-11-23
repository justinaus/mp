import { Button } from '@mui/material';
import React from 'react';

type Props = React.ComponentProps<typeof Button>;

export default function TransparentContainedButton({
  children,
  sx,
  ...rest
}: Props) {
  return (
    <Button
      variant="contained"
      sx={{
        // https://gist.github.com/lopspower/03fb1cc0ac9f32ef38f4
        backgroundColor: (theme) => `${theme.palette.primary.main}e6`, // e6 = 90%
        ' &:hover': {
          backgroundColor: (theme) => `${theme.palette.primary.dark}e6`,
        },
        ...sx,
      }}
      {...rest}
    >
      {children}
    </Button>
  );
}
