import { SimplePaletteColorOptions } from '@mui/material';
import React from 'react';

declare module '@mui/material/styles' {
  interface TypographyVariants {
    subtitle3: React.CSSProperties;
    subtitle4: React.CSSProperties;
    body3: React.CSSProperties;
  }

  // allow configuration using `createTheme`
  interface TypographyVariantsOptions {
    subtitle3?: React.CSSProperties;
    subtitle4?: React.CSSProperties;
    body3: React.CSSProperties;
  }

  interface Palette {
    hashtag: string;
    tertiary: SimplePaletteColorOptions;
  }
  interface PaletteOptions {
    hashtag: string;
    tertiary: SimplePaletteColorOptions;
  }
}

// Update the Typography's variant prop options
declare module '@mui/material/Typography' {
  interface TypographyPropsVariantOverrides {
    subtitle3: true;
    subtitle4: true;
    body3: true;
  }
}

declare module '@mui/material/styles/createPalette' {
  interface TypeBackground {
    default: string;
    paper: string;
    grey: string;
  }
}
