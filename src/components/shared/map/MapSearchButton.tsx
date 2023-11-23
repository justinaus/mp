import RefreshIcon from '@mui/icons-material/Refresh';
import { Button, ButtonProps } from '@mui/material';

type Props = Pick<ButtonProps, 'sx' | 'onClick' | 'disabled'>;

export default function MapSearchButton({ sx, ...rest }: Props) {
  return (
    <Button
      variant="outlined"
      size="medium"
      color="secondary"
      // variant="outlined"
      // fullWidth
      sx={{
        color: (theme) => theme.palette.primary.main,
        ...sx,
      }}
      {...rest}
      startIcon={<RefreshIcon />}
    >
      현 지도에서 검색
    </Button>
  );
}
