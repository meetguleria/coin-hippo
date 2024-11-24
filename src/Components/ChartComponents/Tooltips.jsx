import React, { useCallback } from 'react';
import { TooltipWithBounds } from '@visx/tooltip';
import { Line, Bar } from '@visx/shape';
import { localPoint } from '@visx/event';

const Tooltips = ({ data, xScale, yScale, width, height, margin, colorTheme }) => {
  const [tooltipData, setTooltipData] = React.useState(null);
  const [tooltipLeft, setTooltipLeft] = React.useState(null);
  const [tooltipTop, setTooltipTop] = React.useState(null);

  const handleTooltip = useCallback(
    (event) => {
      const { x } = localPoint(event) || { x: 0 };
      const x0 = xScale.invert(x);
      const index = data.findIndex((d) => d.date >= x0);
      const d = data[index];
      if (d) {
        setTooltipData(d);
        setTooltipLeft(xScale(d.date));
        setTooltipTop(yScale(d.price));
      }
    },
    [data, xScale, yScale]
  );

  return (
    <>
      {/* Hoverable Bar */}
      <Bar
        x={margin.left}
        y={margin.top}
        width={width - margin.left - margin.right}
        height={height - margin.top - margin.bottom}
        fill="transparent"
        onMouseMove={handleTooltip}
        onMouseLeave={() => setTooltipData(null)}
      />

      {/* Vertical Line */}
      {tooltipData && (
        <Line
          from={{ x: tooltipLeft, y: margin.top }}
          to={{ x: tooltipLeft, y: height - margin.bottom }}
          stroke={colorTheme.line}
          strokeWidth={2}
          pointerEvents="none"
          strokeDasharray="5,2"
        />
      )}

      {/* Tooltip */}
      {tooltipData && (
        <TooltipWithBounds
          top={tooltipTop - 12}
          left={tooltipLeft + 12}
          style={{
            backgroundColor: colorTheme.tooltipBg,
            color: colorTheme.tooltipColor,
            border: `1px solid ${colorTheme.tooltipBorder}`,
            borderRadius: '4px',
          }}
        >
          <div>
            <strong>Price:</strong> ${tooltipData.price.toFixed(2)}
          </div>
          <div>
            <strong>Date:</strong> {tooltipData.date.toDateString()}
          </div>
        </TooltipWithBounds>
      )}
    </>
  );
};

export default Tooltips;
