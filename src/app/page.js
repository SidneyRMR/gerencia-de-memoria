'use client'
import React from 'react';
import Simulation from './components/Simulation';

const App = () => {
  return (
    <div className="App min-h-screen flex items-center justify-center bg-gray-200">
      <div className="bg-white p-8 rounded shadow-lg w-3/4">
        <h1 className="text-3xl font-semibold mb-6 text-center text-gray-900">Simulador de Substituição de Memória</h1>
        <Simulation />
      </div>
    </div>
  );
};

export default App;

