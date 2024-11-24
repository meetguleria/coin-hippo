import React from 'react';
import { GridRows, GridColumns } from '@visx/grid';

const GridLines = ({ xScale, yScale, width, height, margin, color }) => (
  <>
    <GridRows
      scale={yScale}
      width={width - margin.left - margin.right}
      strokeDasharray="2,2"
      stroke={color}
      pointerEvents="none"
      left={margin.left}
    />
    <GridColumns
      scale={xScale}
      height={height - margin.top - margin.bottom}
      strokeDasharray="2,2"
      stroke={color}
      pointerEvents="none"
      top={margin.top}
    />
  </>
);

export default GridLines;
