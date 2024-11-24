import { scaleTime, scaleLinear } from '@visx/scale';
import { extent, max } from 'd3-array';

export const createXScale = (data, width, margin) => {
  return scaleTime({
    range: [margin.left, width - margin.right],
    domain: extent(data, (d) => d.date),
  });
};

export const createYScale = (data, height, margin) => {
  return scaleLinear({
    range: [height - margin.bottom, margin.top],
    domain: [0, max(data, (d) => d.price)],
    nice: true, // Makes the scale end on rounded values
  });
};
