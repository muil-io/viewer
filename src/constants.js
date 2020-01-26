import FullIcon from './assets/sizes/full.svg';
import MobileIcon from './assets/sizes/mobile.svg';
import MonitorIcon from './assets/sizes/monitor.svg';
import TabletIcon from './assets/sizes/tablet.svg';

export const SCREEN_SIZES = {
  small: { size: '360px', icon: MobileIcon },
  medium: { size: '640px', icon: TabletIcon },
  big: { size: '870px', icon: MonitorIcon },
  full: { size: '100%', icon: FullIcon },
};

export const NOT_ALLOWED_HTML_TAGS = [
  'script',
  'iframe',
  'object', // for flash use
  'video', // for embedded video
  'audio', // for embedded audio
  'form', // for any kind of form
];

export const USE_WITH_CAUTION_CSS_PROPERTIES = ['url', '.gif'];
