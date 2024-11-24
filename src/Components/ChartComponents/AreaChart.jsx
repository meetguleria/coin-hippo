import { useMemo, useCallback } from 'react';
import { AreaClosed, Bar } from '@visx/shape';
import { curveMonotoneX } from '@visx/curve';
import { localPoint } from '@visx/event';
import { LinearGradient } from '@visx/gradient';
import { bisector } from 'd3-array';
import { createXScale, createYScale } from './Scales';

const AreaChart = ({
  data,
  width,
  height,
  margin,
  showTooltip,
  hideTooltip,
  setTooltipData,
  theme,
}) => {
  const xScale = useMemo(() => createXScale(data, width, margin), [data, width, margin]);
  const yScale = useMemo(() => createYScale(data, height, margin), [data, height, margin]);

  const bisectDate = bisector((d) => d.date).left;

  const handleTooltip = useCallback(
    (event) => {
      const { x } = localPoint(event) || { x: 0 };
      const x0 = xScale.invert(x - margin.left);
      const index = bisectDate(data, x0, 1);
      const d0 = data[index - 1];
      const d1 = data[index];
      let d = d0;
      if (d1 && Math.abs(x0 - d0.date) > Math.abs(x0 - d1.date)) d = d1;

      showTooltip({
        tooltipData: d,
        tooltipLeft: xScale(d.date),
        tooltipTop: yScale(d.price),
      });

      setTooltipData(d);
    },
    [data, xScale, yScale, margin.left, showTooltip, setTooltipData]
  );

  return (
    <>
      {/* Background Gradient */}
      <LinearGradient id="area-gradient" from={theme.areaFrom} to={theme.areaTo} toOpacity={0.1} />

      {/* Render the filled area */}
      <AreaClosed
        data={data}
        x={(d) => xScale(d.date)}
        y={(d) => yScale(d.price)}
        yScale={yScale}
        fill="url(#area-gradient)"
        stroke={theme.line}
        strokeWidth={2}
        curve={curveMonotoneX}
      />

      {/* Interactive Bar for hover detection */}
      <Bar
        x={margin.left}
        y={margin.top}
        width={width - margin.left - margin.right}
        height={height - margin.top - margin.bottom}
        fill="transparent"
        onMouseMove={handleTooltip}
        onTouchMove={handleTooltip}
        onMouseLeave={hideTooltip}
      />
    </>
  );
};

export default AreaChart;
