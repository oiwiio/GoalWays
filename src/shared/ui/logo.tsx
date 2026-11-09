import React from 'react';
import Svg, { Rect, Path } from 'react-native-svg';

export const Logo = ({ size = 72 }: { size?: number }) => (
  <Svg width={size} height={size} viewBox="0 0 32 32">
    <Rect width={32} height={32} rx={8} fill="#111111" />
    <Path
      d="M22 10.5A8 8 0 1 0 22 21.5"
      fill="none"
      stroke="#FFFFFF"
      strokeWidth={2.6}
      strokeLinecap="round"
    />
    <Path
      d="M11.5 16.5l3.2 3.2L23 11"
      fill="none"
      stroke="#FFFFFF"
      strokeWidth={2.6}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);
