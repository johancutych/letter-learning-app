import React, { useState, useRef } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
const colors = ['#000000', '#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4', '#FFEEAD', '#D4A5A5', '#9B59B6'];

const LetterLearningApp = () => {
  const [currentLetterIndex, setCurrentLetterIndex] = useState(0);
  const [selectedColor, setSelectedColor] = useState(colors[0]);
  const [touchStart, setTouchStart] = useState(null);
  const [touchEnd, setTouchEnd] = useState(null);
  const letterScrollRef = useRef(null);

  const handleTouchStart = (e) => {
    setTouchStart(e.touches[0].clientX);
  };

  const handleTouchMove = (e) => {
    setTouchEnd(e.touches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > 50;
    const isRightSwipe = distance < -50;

    if (isLeftSwipe && currentLetterIndex < alphabet.length - 1) {
      setCurrentLetterIndex(prev => prev + 1);
    }
    if (isRightSwipe && currentLetterIndex > 0) {
      setCurrentLetterIndex(prev => prev - 1);
    }

    setTouchStart(null);
    setTouchEnd(null);
  };

  const nextLetter = () => {
    if (currentLetterIndex < alphabet.length - 1) {
      setCurrentLetterIndex(prev => prev + 1);
    }
  };

  const previousLetter = () => {
    if (currentLetterIndex > 0) {
      setCurrentLetterIndex(prev => prev - 1);
    }
  };

  const scrollLetters = (direction) => {
    if (letterScrollRef.current) {
      const scrollAmount = 200;
      letterScrollRef.current.scrollLeft += direction * scrollAmount;
    }
  };

  React.useEffect(() => {
    if (letterScrollRef.current) {
      const selectedButton = letterScrollRef.current.children[currentLetterIndex];
      selectedButton?.scrollIntoView({
        behavior: 'smooth',
        block: 'nearest',
        inline: 'center'
      });
    }
  }, [currentLetterIndex]);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Main letter display */}
      <div 
        className="h-[80vh] min-h-[500px] flex items-center justify-center relative"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        <button 
          onClick={previousLetter}
          disabled={currentLetterIndex === 0}
          className="absolute left-2 sm:left-8 p-2 text-gray-500 disabled:opacity-30 z-10"
        >
          <ChevronLeft size={48} />
        </button>
        
        <div className="text-center max-h-full flex items-center justify-center px-16">
          <h1 
            className="font-bold transition-colors duration-300 select-none leading-none"
            style={{ 
              color: selectedColor,
              fontSize: 'min(80vw, 80vh)',
            }}
          >
            {alphabet[currentLetterIndex]}
          </h1>
        </div>

        <button 
          onClick={nextLetter}
          disabled={currentLetterIndex === alphabet.length - 1}
          className="absolute right-2 sm:right-8 p-2 text-gray-500 disabled:opacity-30 z-10"
        >
          <ChevronRight size={48} />
        </button>
      </div>

      {/* Controls section */}
      <div className="w-full bg-white p-4 shadow-lg">
        <div className="max-w-7xl mx-auto">
          {/* Color selection */}
          <div className="flex justify-center flex-wrap gap-2 sm:gap-4 mb-4">
            {colors.map((color) => (
              <button
                key={color}
                onClick={() => setSelectedColor(color)}
                className="w-8 h-8 sm:w-12 sm:h-12 rounded-full shadow-md transition-transform hover:scale-110 focus:outline-none focus:ring-2 focus:ring-offset-2"
                style={{
                  backgroundColor: color,
                  transform: selectedColor === color ? 'scale(1.1)' : 'scale(1)',
                  border: color === '#000000' ? '2px solid #e5e5e5' : 'none'
                }}
              />
            ))}
          </div>

          {/* Letter selection with navigation arrows */}
          <div className="relative flex items-center max-w-full">
            <button 
              onClick={() => scrollLetters(-1)}
              className="hidden sm:block absolute left-0 z-10 p-2 text-gray-500 hover:text-gray-700 bg-white rounded-full shadow-md"
            >
              <ChevronLeft size={24} />
            </button>

            <div 
              ref={letterScrollRef}
              className="overflow-x-auto mx-auto sm:mx-12 w-full"
              style={{
                scrollbarWidth: 'none',
                msOverflowStyle: 'none',
                '::-webkit-scrollbar': { display: 'none' }
              }}
            >
              <div 
                className="flex gap-1 pb-2 min-w-min sm:justify-between"
                style={{ scrollBehavior: 'smooth' }}
              >
                {alphabet.map((letter, index) => (
                  <button
                    key={letter}
                    onClick={() => setCurrentLetterIndex(index)}
                    className={`flex-shrink-0 w-10 h-10 rounded-lg text-lg font-bold shadow transition-colors
                      ${currentLetterIndex === index 
                        ? 'bg-blue-500 text-white' 
                        : 'bg-white text-gray-700 hover:bg-gray-100'}`}
                  >
                    {letter}
                  </button>
                ))}
              </div>
            </div>

            <button 
              onClick={() => scrollLetters(1)}
              className="hidden sm:block absolute right-0 z-10 p-2 text-gray-500 hover:text-gray-700 bg-white rounded-full shadow-md"
            >
              <ChevronRight size={24} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LetterLearningApp;