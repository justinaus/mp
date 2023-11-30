import { Global } from '@emotion/react';
import Box from '@mui/material/Box';
import { grey } from '@mui/material/colors';
import { styled } from '@mui/material/styles';
import SwipeableDrawer, {
  SwipeableDrawerProps,
} from '@mui/material/SwipeableDrawer';
import * as React from 'react';

export const drawerBleeding = 150;
const headerHeight = 30;
const contentMarginTop = drawerBleeding - headerHeight;
const contentTotalHeight = 500;

const iOS =
  typeof navigator !== 'undefined' &&
  /iPad|iPhone|iPod/.test(navigator.userAgent);

type Props = Pick<
  SwipeableDrawerProps,
  'sx' | 'children' | 'open' | 'onClose' | 'onOpen'
>;

export default function SwipeableEdgeDrawer({
  sx,
  children,
  open,
  onClose,
  onOpen,
  ...rest
}: Props) {
  return (
    <>
      <Global
        styles={{
          '.MuiDrawer-root > .MuiPaper-root': {
            // height: `calc(70% - ${drawerBleeding}px)`,
            height: contentTotalHeight - contentMarginTop,
            overflow: 'visible',
          },
          '.MuiDrawer-root > .MuiBackdrop-root': {
            opacity: '0 !important',
          },
        }}
      />
      <SwipeableDrawer
        anchor="bottom"
        open={open}
        onClose={onClose}
        onOpen={onOpen}
        swipeAreaWidth={drawerBleeding}
        disableSwipeToOpen={false}
        ModalProps={{
          keepMounted: true,
        }}
        disableBackdropTransition={!iOS}
        disableDiscovery={iOS}
        {...rest}
        sx={{
          ...sx,
        }}
      >
        <StyledBox
          sx={{
            position: 'absolute',
            top: -drawerBleeding,
            borderTopLeftRadius: 8,
            borderTopRightRadius: 8,
            visibility: 'visible',
            right: 0,
            left: 0,

            // boxShadow: '0px -4px 16px rgba(0,0,0,0.1)',
            boxShadow: '0px -4px 4px rgba(0,0,0,0.06)',

            height: headerHeight + 1, // 빈 공간 보여서..
          }}
        >
          <Puller />
          {/* <Typography sx={{ p: 2, color: 'text.secondary' }}>
            51 results
          </Typography> */}
        </StyledBox>
        <StyledBox
          sx={{
            px: 4,
            pb: 8,
            // height: '100%',
            height: contentTotalHeight,
            overflow: 'auto',
            marginTop: `-${contentMarginTop}px`,
            visibility: 'visible',
          }}
        >
          {/* <Box
            sx={{
              backgroundColor: '#ff0000',
            }}
          > */}
          {children}
        </StyledBox>
      </SwipeableDrawer>
    </>
  );
}

const StyledBox = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'light' ? '#fff' : grey[800],
}));

const Puller = styled(Box)(({ theme }) => ({
  width: 30,
  height: 6,
  backgroundColor: theme.palette.mode === 'light' ? grey[300] : grey[900],
  borderRadius: 3,
  position: 'absolute',
  top: 8,
  left: 'calc(50% - 15px)',
}));
