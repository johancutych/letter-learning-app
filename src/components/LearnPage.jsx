import React, { useState, useRef, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Shuffle } from 'lucide-react';
import ColorPicker from './ColorPicker';

const LearnPage = ({ items, currentIndex, setCurrentIndex, selectedColor, setSelectedColor, colors }) => {
  const [touchStart, setTouchStart] = useState(null);
  const [touchEnd, setTouchEnd] = useState(null);
  const [shouldScroll, setShouldScroll] = useState(false);
  const scrollRef = useRef(null);
  const isInitialMount = useRef(true);

  const handleTouch = {
    start: (e) => setTouchStart(e.touches[0].clientX),
    move: (e) => {
      e.preventDefault();
      setTouchEnd(e.touches[0].clientX);
    },
    end: () => {
      if (!touchStart || !touchEnd) return;
      const distance = touchStart - touchEnd;
      if (Math.abs(distance) > 50) {
        setCurrentIndex(prev => {
          const next = distance > 0 ? prev + 1 : prev - 1;
          return Math.min(Math.max(next, 0), items.length - 1);
        });
        setShouldScroll(true);
      }
      setTouchStart(null);
      setTouchEnd(null);
    }
  };

  const handleMix = () => {
    const randomIndex = Math.floor(Math.random() * items.length);
    const randomColor = colors[Math.floor(Math.random() * colors.length)];
    setCurrentIndex(randomIndex);
    setSelectedColor(randomColor);
  };

  useEffect(() => {
    if (!isInitialMount.current && shouldScroll && scrollRef.current) {
      const container = scrollRef.current;
      const button = container.children[currentIndex];
      if (button) {
        const scrollLeft = button.offsetLeft - (container.offsetWidth / 2) + (button.offsetWidth / 2);
        container.scrollTo({ left: Math.max(0, scrollLeft), behavior: 'smooth' });
      }
      setShouldScroll(false);
    }
    isInitialMount.current = false;
  }, [currentIndex, shouldScroll]);

  const scrollItems = (direction) => {
    if (scrollRef.current) {
      const container = scrollRef.current;
      const scrollAmount = container.offsetWidth - 100;
      const newScrollLeft = container.scrollLeft + (direction * scrollAmount);
      container.scrollTo({ left: newScrollLeft, behavior: 'smooth' });
    }
  };

  return (
    <>
      <div 
        className="flex-1 min-h-0 flex items-center justify-center relative"
        onTouchStart={handleTouch.start}
        onTouchMove={handleTouch.move}
        onTouchEnd={handleTouch.end}
      >
        <h1 
          className="font-bold transition-colors duration-300 select-none leading-none"
          style={{ 
            color: selectedColor,
            fontSize: 'min(85vw, 65vh)',
          }}
        >
          {items[currentIndex]}
        </h1>
      </div>

      <div className="flex-none bg-white shadow-lg">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <button
            onClick={handleMix}
            className="mx-auto block mb-4 bg-blue-500 hover:bg-blue-600 text-white rounded-xl p-3 shadow-[0_4px_0_rgb(37,99,235)] active:translate-y-1 active:shadow-none transition-all duration-150"
          >
            <Shuffle className="w-6 h-6" />
          </button>

          <div className="h-auto py-2 overflow-visible mb-4">
            <ColorPicker 
              colors={colors}
              selectedColor={selectedColor}
              onColorSelect={setSelectedColor}
            />
          </div>

          <div className="relative flex items-center w-full">
  <button 
    onClick={() => scrollItems(-1)}
    className="hidden lg:block flex-none bg-blue-500 hover:bg-blue-600 text-white rounded-xl p-2 shadow-[0_4px_0_rgb(37,99,235)] active:translate-y-1 active:shadow-none transition-all duration-150 z-10"
  >
    <ChevronLeft className="w-6 h-6" />
  </button>

  <div className="relative w-full">
 <div ref={scrollRef} className="overflow-x-auto scrollbar-hide w-full">
   <div className="flex gap-3 min-w-min py-2 relative">
     {items.map((item, index) => (
       <button
         key={item}
         onClick={() => {
           setCurrentIndex(index);
           setShouldScroll(true);
         }}
         className={`flex-shrink-0 w-12 h-12 sm:w-14 sm:h-14 rounded-xl text-xl sm:text-2xl font-bold bg-blue-500 text-white transition-all duration-200 flex items-center justify-center shadow-[0_4px_0_rgb(37,99,235)] hover:bg-blue-600 active:translate-y-1 active:shadow-none
           ${currentIndex === index ? 'bg-blue-600 -translate-y-1 shadow-none' : ''}`}
       >
         {item}
       </button>
     ))}
   </div>
 </div>
 <div className="absolute inset-y-0 -left-1 w-16 bg-gradient-to-r from-white to-transparent pointer-events-none"></div>
 <div className="absolute inset-y-0 -right-1 w-16 bg-gradient-to-l from-white to-transparent pointer-events-none"></div>
</div>

  <button 
    onClick={() => scrollItems(1)}
    className="hidden lg:block flex-none bg-blue-500 hover:bg-blue-600 text-white rounded-xl p-2 shadow-[0_4px_0_rgb(37,99,235)] active:translate-y-1 active:shadow-none transition-all duration-150 z-10"
  >
    <ChevronRight className="w-6 h-6" />
  </button>
</div>
        </div>
      </div>
    </>
  );
};

export default LearnPage;