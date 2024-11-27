// Basic shapes that babies can learn
const shapes = [
  '■', '●', '▲', '★', '♥', '◆', '▬', '⬟'
];

const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
const numbers = Array.from({ length: 20 }, (_, i) => (i + 1).toString());

// Colors represent familiar objects:
// black (default), red (apple), green (leaf), blue (sky), 
// yellow (sun), pink (flower), purple (grape), orange (orange),
// brown (bear), white (cloud)
const colors = [
  '#000000',   // black
  '#FF6C6C',   // red
  '#7BDC9D',   // green
  '#568AD2',   // blue
  '#FFC532',   // yellow
  '#FF87B7',   // pink
  '#C57AE6',   // purple
  '#FF7E0F',   // orange
  '#8B4513',   // brown
];

export { shapes, letters, numbers, colors };
