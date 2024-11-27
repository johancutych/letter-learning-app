const ColorPicker = ({ colors, selectedColor, onColorSelect }) => (
  <div className="overflow-visible">
    <div className="flex justify-center gap-2 sm:gap-3">
      {colors.map((color) => (
        <button
          key={color}
          onClick={() => onColorSelect(color)}
          className={`w-9 h-9 sm:w-11 sm:h-11 rounded-xl transition-all duration-200 overflow-visible ${
            selectedColor === color 
              ? 'shadow-[0_4px_0_rgba(0,0,0,0.2)] -translate-y-1' 
              : 'shadow-[0_4px_0_rgba(0,0,0,0.1)]'
          }`}
          style={{
            backgroundColor: color,
            border: color === '#FFFFFF' ? '1px solid #e5e5e5' : 'none',
          }}
        />
      ))}
    </div>
  </div>
);
export default ColorPicker;