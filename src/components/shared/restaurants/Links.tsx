import LinkIcon from '@mui/icons-material/Link';
import { Chip, Stack } from '@mui/material';
import { useCallback } from 'react';

import { getIsMobileDevice } from '@/utils/device';

type Props = {
  naverId: string;
  homePage?: string;
};

export default function Links({ naverId, homePage }: Props) {
  const isMobile = getIsMobileDevice();

  const naverUrl = isMobile
    ? `https://m.place.naver.com/restaurant/${naverId}`
    : `https://map.naver.com/v5/entry/place/${naverId}`;

  return (
    <Stack direction={'row'} spacing={2} flexWrap="wrap">
      <LinkChip label="Naver" link={naverUrl} />
      {homePage && <LinkChip label="Homepage" link={homePage} />}
    </Stack>
  );
}

function LinkChip({ label, link }: { label: string; link: string }) {
  const handleClick = useCallback(() => {}, []);

  return (
    <a href={link} target={'_blank'} rel="noreferrer">
      <Chip
        label={label}
        variant="outlined"
        size="small"
        icon={<LinkIcon />}
        sx={{
          paddingLeft: 1,
          marginBottom: 1,
        }}
        onClick={handleClick} // Chips with the onClick prop defined change appearance on focus, hover, and click.
      />
    </a>
  );
}
