const ColorPicker = ({ colors, selectedColor, onColorSelect }) => (
  <div className="overflow-visible">
    <div className="flex justify-around items-center w-full max-w-xl mx-auto">
      {colors.filter(c => c !== '#FFFFFF').map((color) => (
        <button
          key={color}
          onClick={() => onColorSelect(color)}
          className={`aspect-square w-[8vw] max-w-[40px] min-w-[32px] rounded-full transition-all duration-200 overflow-visible ${
            selectedColor === color 
              ? 'shadow-[0_4px_0_rgba(0,0,0,0.2)] -translate-y-1' 
              : 'shadow-[0_4px_0_rgba(0,0,0,0.1)]'
          }`}
          style={{
            backgroundColor: color,
            border: color === '#000000' ? '1px solid #e5e5e5' : 'none',
          }}
        />
      ))}
    </div>
  </div>
);
export default ColorPicker;