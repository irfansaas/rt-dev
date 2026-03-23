import React from 'react';
import { NTENT_COLORS } from '../../constants/ntentColors';
import { getDimension } from '../../constants/ntentDimensions';

export default function NTENTBadge({ dimension, showLabel = false, tooltip = '' }) {
  // Use centralized dimension definitions
  const dim = getDimension(dimension);
  if (!dim) return null;

  return (
    <span
      className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-xs font-bold text-white ml-2"
      style={{ backgroundColor: NTENT_COLORS[dimension]?.hex }}
      title={tooltip || `${dim.label} - NTENT Discovery`}
    >
      {dim.letter}
      {showLabel && <span className="ml-1">{dim.label}</span>}
    </span>
  );
}
