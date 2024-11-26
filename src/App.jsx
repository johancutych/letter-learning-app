import React, { useState, useRef, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Shuffle } from 'lucide-react';

const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
// Updated colors to represent common objects babies learn:
// Black (default), Red (apple), Green (leaf), Blue (sky), 
// Yellow (banana), Pink (flower), Purple (grape), Orange (orange)
const colors = ['#000000', '#FF6C6C', '#7BDC9D', '#568AD2', '#FFC532', '#FF87B7', '#C57AE6', '#FF7E0F'];

const LetterLearningApp = () => {
  const [currentLetterIndex, setCurrentLetterIndex] = useState(0);
  const [selectedColor, setSelectedColor] = useState(colors[0]);
  const [touchStart, setTouchStart] = useState(null);
  const [touchEnd, setTouchEnd] = useState(null);
  const letterScrollRef = useRef(null);
  const isInitialMount = useRef(true);
  const [shouldScroll, setShouldScroll] = useState(false);

  const handleMix = () => {
    const randomLetterIndex = Math.floor(Math.random() * alphabet.length);
    const randomColorIndex = Math.floor(Math.random() * colors.length);
    setCurrentLetterIndex(randomLetterIndex);
    setSelectedColor(colors[randomColorIndex]);
    setShouldScroll(true);
  };

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    document.body.style.position = 'fixed';
    document.body.style.width = '100%';
    document.body.style.height = '100%';
    document.body.style.touchAction = 'none';
    
    return () => {
      document.body.style.overflow = '';
      document.body.style.position = '';
      document.body.style.width = '';
      document.body.style.height = '';
      document.body.style.touchAction = '';
    };
  }, []);

  const handleTouchStart = (e) => {
    setTouchStart(e.touches[0].clientX);
  };

  const handleTouchMove = (e) => {
    e.preventDefault();
    setTouchEnd(e.touches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > 50;
    const isRightSwipe = distance < -50;

    if (isLeftSwipe && currentLetterIndex < alphabet.length - 1) {
      setCurrentLetterIndex(prev => prev + 1);
      setShouldScroll(true);
    }
    if (isRightSwipe && currentLetterIndex > 0) {
      setCurrentLetterIndex(prev => prev - 1);
      setShouldScroll(true);
    }

    setTouchStart(null);
    setTouchEnd(null);
  };

  const nextLetter = () => {
    if (currentLetterIndex < alphabet.length - 1) {
      setCurrentLetterIndex(prev => prev + 1);
      setShouldScroll(true);
    }
  };

  const previousLetter = () => {
    if (currentLetterIndex > 0) {
      setCurrentLetterIndex(prev => prev - 1);
      setShouldScroll(true);
    }
  };

  const scrollLetters = (direction) => {
    if (letterScrollRef.current) {
      const scrollAmount = 200;
      letterScrollRef.current.scrollLeft += direction * scrollAmount;
    }
  };

  const handleLetterClick = (index) => {
    setCurrentLetterIndex(index);
    setShouldScroll(true);
  };

  // Updated scroll effect to handle edge cases
  React.useEffect(() => {
    if (!isInitialMount.current && shouldScroll && letterScrollRef.current) {
      const container = letterScrollRef.current;
      const button = container.children[currentLetterIndex];
      
      if (button) {
        const buttonLeft = button.offsetLeft;
        const containerWidth = container.offsetWidth;
        const buttonWidth = button.offsetWidth;
        const maxScroll = container.scrollWidth - containerWidth;
        
        let scrollLeft = buttonLeft - (containerWidth / 2) + (buttonWidth / 2);
        
        // Prevent scrolling past the edges
        if (scrollLeft < 0) {
          scrollLeft = 0;
        } else if (scrollLeft > maxScroll) {
          scrollLeft = maxScroll;
        }
        
        // Don't scroll if it's the first few or last few items and we're at the edge
        if ((currentLetterIndex < 3 && container.scrollLeft === 0) || 
            (currentLetterIndex > alphabet.length - 4 && container.scrollLeft === maxScroll)) {
          setShouldScroll(false);
          return;
        }
        
        container.scrollTo({
          left: scrollLeft,
          behavior: 'smooth'
        });
      }
      setShouldScroll(false);
    }
    isInitialMount.current = false;
  }, [currentLetterIndex, shouldScroll]);

  const handleWheel = (e) => {
    e.preventDefault();
  };

  return (
    <div className="fixed inset-0 bg-gray-50 flex flex-col">
      <div 
        className="flex-1 min-h-0 flex items-center justify-center relative"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        <button 
          onClick={previousLetter}
          disabled={currentLetterIndex === 0}
          className="hidden lg:block absolute left-2 sm:left-8 p-2 text-gray-500 disabled:opacity-30 z-10 hover:text-gray-700 transition-colors"
          aria-label="Previous letter"
        >
          <ChevronLeft className="w-12 h-12" />
        </button>
        
        <div className="text-center flex items-center justify-center">
          <h1 
            className="font-bold transition-colors duration-300 select-none leading-none"
            style={{ 
              color: selectedColor,
              fontSize: 'min(85vw, 65vh)',
              opacity: touchEnd ? '0.8' : '1',
              transform: touchEnd ? `translateX(${(touchEnd - touchStart) * 0.1}px)` : 'translateX(0)',
              transition: 'transform 0.2s ease-out, opacity 0.2s ease-out',
            }}
          >
            {alphabet[currentLetterIndex]}
          </h1>
        </div>

        <button 
          onClick={nextLetter}
          disabled={currentLetterIndex === alphabet.length - 1}
          className="hidden lg:block absolute right-2 sm:right-8 p-2 text-gray-500 disabled:opacity-30 z-10 hover:text-gray-700 transition-colors"
          aria-label="Next letter"
        >
          <ChevronRight className="w-12 h-12" />
        </button>
      </div>

      <div className="flex-none bg-white shadow-lg">
        <div className="max-w-7xl mx-auto px-4 pt-4 pb-5">
          <div className="flex justify-center mb-4">
            <button
              onClick={handleMix}
              className="bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-full p-3 shadow-md transition-transform hover:scale-110 focus:outline-none focus:ring-2 focus:ring-offset-2 flex items-center gap-2"
              aria-label="Mix letters and colors"
            >
              <Shuffle className="w-6 h-6" />
            </button>
          </div>

          <div className="overflow-x-hidden px-2">
            <div className="flex justify-center gap-2 sm:gap-3 mb-4">
              {colors.map((color) => (
                <button
                  key={color}
                  onClick={() => setSelectedColor(color)}
                  className="w-9 h-9 sm:w-11 sm:h-11 rounded-full shadow-md transition-transform hover:scale-110 focus:outline-none focus:ring-2 focus:ring-offset-2 flex-shrink-0"
                  style={{
                    backgroundColor: color,
                    transform: selectedColor === color ? 'scale(1.1)' : 'scale(1)',
                    border: color === '#000000' ? '1px solid #e5e5e5' : 'none',
                    boxSizing: 'border-box'
                  }}
                  aria-label={`Select color ${color}`}
                />
              ))}
            </div>
          </div>

          <div className="relative flex items-center max-w-full">
            <button 
              onClick={() => scrollLetters(-1)}
              className="hidden lg:block absolute left-0 z-10 p-2 text-gray-500 hover:text-gray-700 bg-white rounded-full shadow-md"
              aria-label="Scroll letters left"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>

            <div 
              ref={letterScrollRef}
              className="overflow-x-auto overflow-y-hidden scrollbar-hide mx-auto lg:mx-12 w-full"
              onWheel={handleWheel}
            >
              <div 
                className="flex gap-2 min-w-min sm:justify-between px-4"
                style={{ scrollBehavior: 'smooth' }}
              >
                {alphabet.map((letter, index) => (
                  <button
                    key={letter}
                    onClick={() => handleLetterClick(index)}
                    className={`flex-shrink-0 w-12 h-12 sm:w-14 sm:h-14 rounded-xl text-xl sm:text-2xl font-bold shadow-sm transition-all duration-200 flex items-center justify-center
                      ${currentLetterIndex === index 
                        ? 'bg-blue-500 text-white scale-105 shadow-md' 
                        : 'bg-white text-gray-700 hover:bg-gray-100'}`}
                    aria-label={`Select letter ${letter}`}
                    aria-pressed={currentLetterIndex === index}
                  >
                    {letter}
                  </button>
                ))}
              </div>
            </div>

            <button 
              onClick={() => scrollLetters(1)}
              className="hidden lg:block absolute right-0 z-10 p-2 text-gray-500 hover:text-gray-700 bg-white rounded-full shadow-md"
              aria-label="Scroll letters right"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LetterLearningApp;