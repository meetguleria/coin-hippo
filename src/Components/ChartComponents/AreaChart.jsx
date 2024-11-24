import React from 'react';
import { AreaClosed } from '@visx/shape';
import { LinearGradient } from '@visx/gradient';

const AreaChart = ({ data, xScale, yScale, width, height, margin, colorTheme }) => (
  <>
    {/* Background Gradient */}
    <LinearGradient id="background" from={colorTheme.bgFrom} to={colorTheme.bgTo} />
    <LinearGradient id="area" from={colorTheme.areaFrom} to={colorTheme.areaTo} toOpacity={0.1} />

    <rect
      x={0}
      y={0}
      width={width}
      height={height}
      fill="url(#background)"
      rx={14}
    />

    {/* Area Chart */}
    <AreaClosed
      data={data}
      x={(d) => xScale(d.date) ?? 0}
      y={(d) => yScale(d.price) ?? 0}
      yScale={yScale}
      fill="url(#area)"
      stroke="url(#area)"
      curve={(d) => d.curveMonotoneX}
    />
  </>
);

export default AreaChart;
