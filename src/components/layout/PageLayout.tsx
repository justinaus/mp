import { Box, BoxProps } from '@mui/material';

type Props = Pick<BoxProps, 'sx'>;

export default function PageLayout({
  children,
  sx,
}: React.PropsWithChildren<Props>) {
  return (
    <Box
      className="min-height-100vh"
      sx={{
        display: 'flex',
        flexDirection: 'column',
        ...sx,
      }}
    >
      {children}
    </Box>
  );
}
