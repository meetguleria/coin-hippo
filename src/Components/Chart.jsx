import { useMemo, useCallback } from 'react';
import { AreaClosed, Line, Bar } from '@visx/shape';
import { curveMonotoneX } from '@visx/curve';
import { GridRows, GridColumns } from '@visx/grid';
import { scaleTime, scaleLinear } from '@visx/scale';
import { withTooltip, Tooltip, TooltipWithBounds, defaultStyles } from '@visx/tooltip';
import { localPoint } from '@visx/event';
import { LinearGradient } from '@visx/gradient';
import { max, extent, bisector } from 'd3-array';
import { timeFormat } from 'd3-time-format';
import styled from '@emotion/styled';

const ChartContainer = styled.div`
  position: relative;
`;

const tooltipStyles = {
  ...defaultStyles,
  background: '#1e2a35',
  border: '1px solid white',
  color: 'white',
};

const background = '#0d1a26';
const background2 = '#152d40';
const accentColor = '#1e77b7';
const accentColorDark = '#4a90e2';

const formatDate = timeFormat("%b %d, '%y");

const getDate = (d) => new Date(d.date);
const getStockValue = (d) => (d && d.price !== undefined ? d.price : 0); // Updated to match normalized data

const bisectDate = bisector((d) => new Date(d.date)).left;

const Chart = withTooltip(
  ({
    priceHistory,
    width,
    height = 400,
    margin = { top: 0, right: 0, bottom: 0, left: 0 },
    showTooltip,
    hideTooltip,
    tooltipData,
    tooltipTop = 0,
    tooltipLeft = 0,
  }) => {
    if (width < 10) return null;

    // Use normalized data here and add a console log to inspect it
    const data = useMemo(() => {
      console.log('Chart data:', priceHistory);
      return Array.isArray(priceHistory) ? priceHistory : [];
    }, [priceHistory]);

    if (!data.length) {
      console.warn('No data available for chart rendering');
      return <div>No data available for the chart</div>;
    }

    const innerWidth = width - margin.left - margin.right;
    const innerHeight = height - margin.top - margin.bottom;

    const dateScale = useMemo(
      () => {
        const domainExtent = extent(data, getDate);
        console.log('Date Scale Domain:', domainExtent);
        return scaleTime({
          range: [margin.left, innerWidth + margin.left],
          domain: domainExtent,
        });
      },
      [data, innerWidth, margin.left]
    );

    const stockValueScale = useMemo(
      () => {
        const minValue = Math.min(...data.map(getStockValue));
        const maxValue = max(data, getStockValue) || 0;
        console.log('Stock Value Scale Domain:', [minValue, maxValue]);

        return scaleLinear({
          range: [innerHeight + margin.top, margin.top],
          domain: [minValue, maxValue + innerHeight / 3],
          nice: true,
        });
      },
      [data, innerHeight, margin.top]
    );

    const handleTooltip = useCallback(
      (event) => {
        const { x } = localPoint(event) || { x: 0 };
        const x0 = dateScale.invert(x);
        const index = bisectDate(data, x0, 1);
        const d0 = data[index - 1];
        const d1 = data[index];
        let d = d0;

        if (d1 && getDate(d1)) {
          d =
            x0.valueOf() - getDate(d0).valueOf() > getDate(d1).valueOf() - x0.valueOf()
              ? d1
              : d0;
        }

        if (!d) {
          console.warn('Tooltip data is undefined or null'); // Debug log if tooltip data is undefined
          return;
        }

        console.log('Tooltip Data:', d); // Log tooltip data for debugging
        showTooltip({
          tooltipData: d,
          tooltipLeft: x,
          tooltipTop: stockValueScale(getStockValue(d)),
        });
      },
      [showTooltip, stockValueScale, dateScale, data]
    );

    return (
      <ChartContainer>
        <svg
          width="100%"
          height="100%"
          viewBox={`0 0 ${width} ${height}`}
          preserveAspectRatio="xMidYMid meet"
        >
          <defs>
            <clipPath id="chart-clip">
              <rect x={0} y={0} width={width} height={height} rx={14} />
            </clipPath>
            <LinearGradient id="area-background-gradient" from={background} to={background2} />
            <LinearGradient id="area-gradient" from={accentColor} to={accentColor} toOpacity={0.1} />
          </defs>

          <rect
            x={0}
            y={0}
            width={width}
            height={height}
            fill="url(#area-background-gradient)"
            rx={14}
          />

          <g clipPath="url(#chart-clip)">
            <GridRows
              left={margin.left}
              scale={stockValueScale}
              width={innerWidth}
              strokeDasharray="1,3"
              stroke={accentColor}
              strokeOpacity={0.1}
              pointerEvents="none"
            />
            <GridColumns
              top={margin.top}
              scale={dateScale}
              height={innerHeight}
              strokeDasharray="1,3"
              stroke={accentColor}
              strokeOpacity={0.1}
              pointerEvents="none"
            />
            <AreaClosed
              data={data}
              x={(d) => dateScale(getDate(d)) ?? 0}
              y={(d) => stockValueScale(getStockValue(d)) ?? 0}
              yScale={stockValueScale}
              strokeWidth={2}
              stroke="url(#area-gradient)"
              fill="url(#area-gradient)"
              curve={curveMonotoneX}
            />
            <Bar
              x={margin.left}
              y={margin.top}
              width={innerWidth}
              height={innerHeight}
              fill="transparent"
              onTouchStart={handleTooltip}
              onTouchMove={handleTooltip}
              onMouseMove={handleTooltip}
              onMouseLeave={() => hideTooltip()}
            />
            {tooltipData && (
              <g>
                <Line
                  from={{ x: tooltipLeft, y: margin.top }}
                  to={{ x: tooltipLeft, y: innerHeight + margin.top }}
                  stroke={accentColorDark}
                  strokeWidth={2}
                  pointerEvents="none"
                  strokeDasharray="5,2"
                />
                <circle
                  cx={tooltipLeft}
                  cy={tooltipTop + 1}
                  r={4}
                  fill="black"
                  fillOpacity={0.1}
                  stroke="black"
                  strokeOpacity={0.1}
                  strokeWidth={2}
                  pointerEvents="none"
                />
                <circle
                  cx={tooltipLeft}
                  cy={tooltipTop}
                  r={4}
                  fill={accentColorDark}
                  stroke="white"
                  strokeWidth={2}
                  pointerEvents="none"
                />
              </g>
            )}
          </g>
        </svg>
        {tooltipData && (
          <div>
            <TooltipWithBounds
              key={Math.random()}
              top={tooltipTop - 12}
              left={tooltipLeft + 12}
              style={tooltipStyles}
            >
              {`$${getStockValue(tooltipData).toFixed(2)}`}
            </TooltipWithBounds>
            <Tooltip
              top={height - margin.bottom}
              left={tooltipLeft}
              style={{
                ...defaultStyles,
                background: '#1e2a35',
                border: '1px solid white',
                color: 'white',
                minWidth: 72,
                textAlign: 'center',
                transform: 'translateX(-50%)',
              }}
            >
              {formatDate(getDate(tooltipData))}
            </Tooltip>
          </div>
        )}
      </ChartContainer>
    );
  }
);

export default Chart;
