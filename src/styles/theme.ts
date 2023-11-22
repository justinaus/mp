import { createTheme } from '@mui/material/styles';

// yp..
const VIVID_MODE = {
  primary: {
    main: '#ff4713',
  },
  secondary: {
    main: '#686868',
  },
  tertiary: {
    main: '#b2fce4',
    contrastText: '#333333',
  },
  hashtag: '#415dff',
};

// const CALM_MODE = {
//   primary: {
//     main: '#c67330',
//     // light: '#ce9273',
//     // dark: '#965d34',
//   },
//   secondary: {
//     main: '#666666',
//     light: '#999999',
//   },
//   // hashtag: '#546e7a',
//   hashtag: '#00376b', // insta.
//   // hashtag: '#4489cd',
// };

// 다크모드 처럼 모드 선택.
const COLOR_MODE = VIVID_MODE;

export const theme = createTheme({
  spacing: 4,
  typography: {
    fontFamily: ['SUIT', 'sans-serif'].join(','),
    button: {
      textTransform: 'none', // 이거 없음 영어 다 대문자로 됨.
    },
    h1: {
      fontSize: 20,
      fontWeight: 700,
    },
    h2: {
      fontSize: 18,
      fontWeight: 700,
    },
    subtitle1: {
      fontSize: 18,
      fontWeight: 700,
    },
    subtitle2: {
      fontSize: 16,
      fontWeight: 700,
    },
    subtitle3: {
      fontSize: 14,
      fontWeight: 700,
    },
    subtitle4: {
      fontSize: 12,
      fontWeight: 700,
    },
    body1: {
      fontSize: 16,
      fontWeight: 400,
    },
    body2: {
      fontSize: 14,
      fontWeight: 300,
    },
    body3: {
      fontSize: 14,
      fontWeight: 400,
    },
    caption: {
      fontSize: 12,
      fontWeight: 400,
    },
  },
  palette: {
    common: {
      black: '#333333',
    },
    primary: COLOR_MODE.primary,
    secondary: COLOR_MODE.secondary,
    tertiary: COLOR_MODE.tertiary,
    text: {
      primary: '#333333',
      secondary: COLOR_MODE.secondary.main,
    },
    hashtag: COLOR_MODE.hashtag,
    background: {
      grey: '#f5f5f5',
    },
  },
  components: {
    MuiButton: {
      defaultProps: {
        disableRipple: true,
      },
      variants: [
        {
          props: { variant: 'outlined' },
          style: {
            backgroundColor: `#ffffff`,
            ':hover': {
              backgroundColor: `#ffffff`,
            },
          },
        },
      ],
      styleOverrides: {
        root: {
          borderRadius: 8,
          '&.MuiButton-contained': {
            boxShadow: 'none',
            '&:hover': {
              boxShadow: 0,
            },
            '&:active': {
              boxShadow: 0,
            },
          },
        },
      },
    },
    MuiTypography: {
      defaultProps: {
        variantMapping: {
          subtitle1: 'strong',
          subtitle2: 'strong',
          subtitle3: 'strong',
          subtitle4: 'strong',
        },
      },
      styleOverrides: {
        root: {
          letterSpacing: -0.2,
        },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
            borderWidth: '1px',
            borderColor: '#666666',
          },
        },
      },
    },
  },
});
