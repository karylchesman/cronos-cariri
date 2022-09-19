/* eslint @typescript-eslint/no-empty-interface: "off" */

import 'styled-components';

import { light } from './themes/light';

export type Theme = typeof light;

declare module 'styled-components' {
  export interface DefaultTheme extends Theme { }
}
