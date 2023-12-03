import MyLocationIcon from '@mui/icons-material/MyLocation';
import { useCallback } from 'react';

import TransparentOutlinedIconButton from '../../buttons/TransparentOutlinedIconButton';
import { LatLng } from '../types';

type Props = {
  onGetGeolocationPosition: (latLng: LatLng) => void;
};

export default function GeolocationButton({ onGetGeolocationPosition }: Props) {
  const handleClick = useCallback(() => {
    if (!navigator.geolocation) {
      alert('navigator.geolocation not working.');
      return;
    }

    navigator.geolocation.getCurrentPosition((position) => {
      onGetGeolocationPosition({
        lat: position.coords.latitude,
        lng: position.coords.longitude,
      });
    });
  }, [onGetGeolocationPosition]);

  return (
    <TransparentOutlinedIconButton color="primary" onClick={handleClick}>
      <MyLocationIcon fontSize="medium" />
    </TransparentOutlinedIconButton>
  );
}
