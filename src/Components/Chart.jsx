import React, { useState, useEffect, useMemo } from 'react';
import AreaChart from './ChartComponents/AreaChart';
import GridLines from './ChartComponents/GridLines';
import Tooltips from './ChartComponents/Tooltips';
import { normalizeCryptoData } from '../utils/normalizeCryptoData';
import { createXScale, createYScale } from './ChartComponents/Scales';
import { useTooltip } from '@visx/tooltip';
import { themeColors } from './ChartComponents/ChartTheme';

const Chart = ({ priceHistory, width, height, margin }) => {
  const [data, setData] = useState([]);
  const { tooltipData, tooltipLeft, tooltipTop, showTooltip, hideTooltip } = useTooltip();

  useEffect(() => {
    if (priceHistory?.prices?.length) {
      const normalizedData = normalizeCryptoData(priceHistory);
      setData(normalizedData);
    }
  }, [priceHistory]);

  if (!data.length) return <div>Loading...</div>;

  const xScale = useMemo(() => createXScale(data, width, margin), [data, width, margin]);
  const yScale = useMemo(() => createYScale(data, height, margin), [data, height, margin]);

  return (
    <svg width={width} height={height}>
      {/* Grid Lines */}
      <GridLines
        xScale={xScale}
        yScale={yScale}
        width={width}
        height={height}
        margin={margin}
        strokeColor={themeColors.gridStroke}
        numTicks={5}
      />

      {/* Area Chart */}
      <AreaChart
        data={data}
        width={width}
        height={height}
        margin={margin}
        showTooltip={showTooltip}
        hideTooltip={hideTooltip}
        setTooltipData={setData} // Assuming you update tooltip data dynamically
        theme={themeColors}
      />

      {/* Tooltip */}
      <Tooltips
        theme={themeColors}
        tooltipData={tooltipData}
        tooltipLeft={tooltipLeft}
        tooltipTop={tooltipTop}
        innerHeight={height - margin.bottom - margin.top}
        margin={margin}
      />
    </svg>
  );
};

export default Chart;
