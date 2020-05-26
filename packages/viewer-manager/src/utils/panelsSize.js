const SIDE_BAR_RANGE = [200, 600];
const OPTIONS_RANGE = [260, 600];

const minMax = (newWidth, range) => {
  if (newWidth > range[1]) {
    return range[1];
  }
  if (newWidth < range[0]) {
    return range[0];
  }
  return newWidth;
};

export const minMaxSideBarWidth = (newWidth) => minMax(newWidth, SIDE_BAR_RANGE);
export const minMaxOptionsWidth = (newWidth) => minMax(newWidth, OPTIONS_RANGE);
