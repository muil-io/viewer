const SIDE_BAR_DEFAULT_WIDTH = 300;
const OPTIONS_DEFAULT_WIDTH = 350;

const SIDE_BAR_RANGE = [200, 600];
const OPTIONS_RANGE = [260, 700];

const minMax = (newWidth, range) => {
  if (newWidth > range[1]) {
    return range[1];
  }
  if (newWidth < range[0]) {
    return range[0];
  }
  return newWidth;
};

export const minMaxSideBarWidth = offset => minMax(SIDE_BAR_DEFAULT_WIDTH + offset, SIDE_BAR_RANGE);
export const minMaxOptionsWidth = offset => minMax(OPTIONS_DEFAULT_WIDTH - offset, OPTIONS_RANGE);
