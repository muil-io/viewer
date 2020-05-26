import MobileIcon from './assets/sizes/mobile.svg';
import MonitorIcon from './assets/sizes/monitor.svg';
import TabletIcon from './assets/sizes/tablet.svg';

export const SCREEN_SIZES = {
  small: { size: '360px', icon: MobileIcon },
  medium: { size: '640px', icon: TabletIcon },
  full: { size: 'calc(100% - 160px)', icon: MonitorIcon },
};

export const HEADER_HEIGHT = 80;
export const HEADER_BACKGROUND_HEIGHT = 186;
export const SIDE_BAR_DEFAULT_WIDTH = 250;
export const OPTIONS_DEFAULT_WIDTH = 350;
