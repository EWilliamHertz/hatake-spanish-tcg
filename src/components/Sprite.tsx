import React from 'react';

interface SpriteProps {
  col: number; // The column number (starting at 0)
  row: number; // The row number (starting at 0)
  scale?: number; // How big you want it to appear (default 2x)
  className?: string;
}

export default function Sprite({ col, row, scale = 2, className = '' }: SpriteProps) {
  const tileSize = 16;
  const margin = 1;

  // Calculate the CSS background-position using your partner's exact math
  const xPos = -(col * (tileSize + margin));
  const yPos = -(row * (tileSize + margin));

  return (
    <div 
      className={`inline-block ${className}`}
      style={{
        width: `${tileSize}px`,
        height: `${tileSize}px`,
        backgroundImage: `url('/spritesheet.png')`,
        backgroundPosition: `${xPos}px ${yPos}px`,
        transform: `scale(${scale})`,
        imageRendering: 'pixelated' // This keeps the pixel art crisp instead of blurry
      }}
    />
  );
}