import React from 'react';
import { X } from 'lucide-react';

const NavMenu = ({ isOpen, onClose, onPageSelect, currentPage }) => (
  <div 
    className={`fixed inset-0 bg-black bg-opacity-50 transition-opacity z-50 ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
    onClick={onClose}
  >
    <div 
      className={`fixed left-0 top-0 h-full w-64 bg-white shadow-lg transform transition-transform ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}
      onClick={e => e.stopPropagation()}
    >
      <div className="p-4">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-blue-500">Learning Pages</h2>
          <button 
            onClick={onClose}
            className="bg-blue-500 hover:bg-blue-600 text-white rounded-xl p-2 shadow-[0_4px_0_rgb(37,99,235)] active:translate-y-1 active:shadow-none transition-all duration-150"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        <nav className="space-y-3">
          {['Letters', 'Numbers', 'Shapes', 'Animals'].map(page => (
            <button 
              key={page}
              onClick={() => { 
                onPageSelect(page.toLowerCase()); 
                onClose(); 
              }}
              className="block w-full text-left px-6 py-3 rounded-xl text-lg font-semibold bg-blue-500 text-white transition-all duration-200 shadow-[0_4px_0_rgb(37,99,235)] hover:bg-blue-600 active:translate-y-1 active:shadow-none"
            >
              {page}
            </button>
          ))}
        </nav>
      </div>
    </div>
  </div>
);

export default NavMenu;