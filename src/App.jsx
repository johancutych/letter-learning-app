import React, { useState, useEffect } from 'react';
import { Menu } from 'lucide-react';
import NavMenu from './components/NavMenu';
import LearnPage from './components/LearnPage';
import ColorPicker from './components/ColorPicker';
import { letters, numbers, shapes, animals, colors } from './data/content';

const App = () => {
  const [currentPage, setCurrentPage] = useState('letters');
  const [menuOpen, setMenuOpen] = useState(false);
  const [selectedColor, setSelectedColor] = useState(colors[0]);
  const [indices, setIndices] = useState({
    letters: 0,
    numbers: 0,
    shapes: 0,
    animals: 0
  });

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

  const getPageContent = () => {
    switch(currentPage) {
      case 'letters': return letters;
      case 'numbers': return numbers;
      case 'shapes': return shapes;
      case 'animals': return animals;
      default: return letters;
    }
  };

  return (
    <div className="fixed inset-0 bg-gray-50 flex flex-col">
      <button
        onClick={() => setMenuOpen(true)}
        className="absolute top-4 left-4 z-50 bg-blue-500 hover:bg-blue-600 text-white rounded-xl p-2 shadow-[0_4px_0_rgb(37,99,235)] active:translate-y-1 active:shadow-none transition-all duration-150"
      >
        <Menu className="w-6 h-6" />
      </button>

      <NavMenu 
        isOpen={menuOpen}
        onClose={() => setMenuOpen(false)}
        onPageSelect={setCurrentPage}
        currentPage={currentPage}
      />

      <LearnPage
        items={getPageContent()}
        currentIndex={indices[currentPage]}
        setCurrentIndex={(index) => setIndices(prev => ({ ...prev, [currentPage]: index }))}
        selectedColor={selectedColor}
        setSelectedColor={setSelectedColor}
        colors={colors}
      />
    </div>
  );
};

export default App;