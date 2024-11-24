import React from 'react';
import { Line } from '@visx/shape';

const PriceLine = ({ data, yScale, width, margin, color }) => {
  if (!data) return null;
  const [tooltipData] = data.slice(-1); // Example: price at the last hover point
  if (!tooltipData) return null;

  return (
    <Line
      from={{ x: margin.left, y: yScale(tooltipData.price) }}
      to={{ x: width - margin.right, y: yScale(tooltipData.price) }}
      stroke={color}
      strokeWidth={1}
      strokeDasharray="5,2"
      pointerEvents="none"
    />
  );
};

export default PriceLine;
