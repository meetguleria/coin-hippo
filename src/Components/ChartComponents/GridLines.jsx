import React from 'react';
import { GridRows, GridColumns } from '@visx/grid';

const GridLines = ({ xScale, yScale, width, height, margin, strokeColor, numTicks }) => (
  <>
    {/* Horizontal Grid Lines */}
    <GridRows
      scale={yScale}
      width={width - margin.left - margin.right}
      strokeDasharray="2,2"
      stroke={strokeColor}
      left={margin.left}
      numTicks={numTicks}
    />

    {/* Vertical Grid Lines */}
    <GridColumns
      scale={xScale}
      height={height - margin.top - margin.bottom}
      strokeDasharray="2,2"
      stroke={strokeColor}
      top={margin.top}
      numTicks={numTicks}
    />
  </>
);

export default GridLines;
