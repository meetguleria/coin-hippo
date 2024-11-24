import { LinearGradient } from '@visx/gradient';

export const themeColors = {
  backgroundFrom: '#3b6978', // Blueish theme background start
  backgroundTo: '#204051',   // Blueish theme background end
  areaFrom: '#75daad',       // Area gradient start (blueish-green)
  areaTo: '#edffea',         // Area gradient end (lighter blueish)
  lineStroke: '#ffffff',     // Line stroke color (white)
  tooltipBg: '#3b6978',      // Tooltip background
  tooltipBorder: '#fff',     // Tooltip border
  tooltipColor: '#ffffff',   // Tooltip text color
  gridStroke: '#d3d3d3',     // Gridline color
};

// Gradient component for background

export const BackgroundGradient = () => (
  <LinearGradient
    id="chart-background-gradient"
    from={themeColors.backgroundFrom}
    to={themeColors.backgroundTo}
  />
);

// Gradient component for area.

export const AreaGradient = () => (
  <LinearGradient
    id="chart-area-gradient"
    from={themeColors.areaFrom}
    to={themeColors.areaTo}
    toOpacity={0.1}
  />
);
