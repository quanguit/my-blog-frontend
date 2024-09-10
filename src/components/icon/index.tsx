import { SvgIconProps } from '@mui/material';

import * as icons from '@/assets/icons';

export type IconName = keyof typeof icons;

export interface IconProps extends SvgIconProps {
  name: IconName;
}

export function Icon({ name, ...props }: IconProps) {
  const Component = icons[name];

  return <Component {...props} />;
}
