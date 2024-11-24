import React, { useState, useEffect, useMemo } from 'react';
import { scaleTime, scaleLinear } from '@visx/scale';
import { max, extent } from 'd3-array';
import { GridLines, AreaChart, Tooltips } from './ChartComponents';
import apiService from '../services/apiService';

const Chart = ({ id }) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [tooltipData, setTooltipData] = useState(null);

  useEffect(() => {
    const fetchChartData = async () => {
      try {
        const response = await apiService.getCryptoMarketChart(id, 30);
        if (response?.prices) {
          const formattedData = response.prices.map(([timestamp, price]) => ({
            date: new Date(timestamp),
            price,
          }));
          setData(formattedData);
        }
      } catch (error) {
        console.error('Error fetching chart data:', error);
      } finally {
        setLoading(false); // Ensure loading stops even if the API fails
      }
    };

    fetchChartData();
  }, [id]);

  if (loading) {
    return <div>Loading chart...</div>; // Placeholder while loading
  }

  if (!data.length) {
    return <div>No data available to display the chart.</div>; // Fallback for no data
  }

  const width = 800;
  const height = 400;
  const margin = { top: 20, right: 20, bottom: 50, left: 70 };

  const xScale = useMemo(
    () =>
      scaleTime({
        domain: extent(data, (d) => d.date),
        range: [margin.left, width - margin.right],
      }),
    [data, margin.left, margin.right]
  );

  const yScale = useMemo(
    () =>
      scaleLinear({
        domain: [0, max(data, (d) => d.price) || 1], // Fallback to 1 to avoid domain issues
        range: [height - margin.bottom, margin.top],
        nice: true,
      }),
    [data, margin.bottom, margin.top, height]
  );

  const colorTheme = {
    bgFrom: '#3b6978',
    bgTo: '#204051',
    areaFrom: '#75daad',
    areaTo: '#edffea',
    line: '#fff',
    tooltipBg: '#3b6978',
    tooltipColor: '#fff',
    tooltipBorder: '#fff',
  };

  return (
    <svg width={width} height={height}>
      <GridLines xScale={xScale} yScale={yScale} width={width} height={height} margin={margin} color="#d3d3d3" />
      <AreaChart
        data={data}
        xScale={xScale}
        yScale={yScale}
        width={width}
        height={height}
        margin={margin}
        setTooltipData={setTooltipData}
        colorTheme={colorTheme}
      />
      <Tooltips
        tooltipData={tooltipData}
        xScale={xScale}
        yScale={yScale}
        colorTheme={colorTheme}
        height={height}
        margin={margin}
      />
    </svg>
  );
};

export default Chart;
