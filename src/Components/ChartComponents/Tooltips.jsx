import { Tooltip, TooltipWithBounds } from '@visx/tooltip';
import { Line } from '@visx/shape';

const TooltipComponent = ({
  tooltipData,
  tooltipLeft,
  tooltipTop,
  innerHeight,
  margin,
  theme,
}) => {
  if (!tooltipData) return null;

  return (
    <>
      {/* Vertical Line */}
      <Line
        from={{ x: tooltipLeft, y: margin.top }}
        to={{ x: tooltipLeft, y: innerHeight + margin.top }}
        stroke={theme.accentColorDark}
        strokeWidth={2}
        strokeDasharray="5,2"
        pointerEvents="none"
      />

      {/* Tooltip Circle */}
      <circle
        cx={tooltipLeft}
        cy={tooltipTop}
        r={4}
        fill={theme.accentColorDark}
        stroke="white"
        strokeWidth={2}
        pointerEvents="none"
      />

      {/* Tooltip Box for Price */}
      <TooltipWithBounds
        key={Math.random()}
        top={tooltipTop - 12}
        left={tooltipLeft + 12}
        style={{
          backgroundColor: theme.background,
          color: theme.tooltipTextColor,
          border: `1px solid ${theme.tooltipBorderColor}`,
          borderRadius: '4px',
        }}
      >
        <div>
          <strong>Price:</strong> ${tooltipData.price.toFixed(2)}
        </div>
      </TooltipWithBounds>

      {/* Tooltip Box for Date */}
      <Tooltip
        top={innerHeight + margin.top + 5}
        left={tooltipLeft}
        style={{
          backgroundColor: theme.background,
          color: theme.tooltipTextColor,
          border: `1px solid ${theme.tooltipBorderColor}`,
          borderRadius: '4px',
          textAlign: 'center',
          transform: 'translateX(-50%)',
        }}
      >
        {tooltipData.date.toLocaleDateString()}
      </Tooltip>
    </>
  );
};

export default TooltipComponent;
