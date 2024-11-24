'use client'

import React, { useState } from 'react';
import FIFOClock from '../algorithms/FIFOClock';

const Simulation = () => {
  const [capacity, setCapacity] = useState(3); // Número de quadros na memória
  const [referenceString, setReferenceString] = useState(''); // Sequência de páginas
  const [memoryState, setMemoryState] = useState([]);
  const [usageBits, setUsageBits] = useState([]);
  const [pageFaults, setPageFaults] = useState(0);

  const handleRunFIFOClock = () => {
    const sequence = referenceString.split(' ').map(Number);
    const fifoClock = new FIFOClock(capacity);

    sequence.forEach((page) => {
      fifoClock.substituir(page);
    });

    setMemoryState(fifoClock.exibirMemoria());
    setUsageBits(fifoClock.exibirUsoBits());
    setPageFaults(fifoClock.faltas);
  };

  return (
    <div className="simulation-container">
      <h1>Simulação de FIFO Segunda Chance</h1>

      <div className="controls">
        <label>
          Capacidade da Memória:
          <input
            type="number"
            value={capacity}
            onChange={(e) => setCapacity(Number(e.target.value))}
          />
        </label>
        <label>
          Sequência de Páginas:
          <input
            type="text"
            value={referenceString}
            onChange={(e) => setReferenceString(e.target.value)}
            placeholder="Ex: 1 2 3 4 1 2 5 1 2 3 4 5"
          />
        </label>
        <button onClick={handleRunFIFOClock}>Rodar FIFO Segunda Chance</button>
      </div>

      <div className="results">
        <h2>Resultados:</h2>
        <p>Estado Final da Memória: {memoryState.join(', ')}</p>
        <p>Bits de Uso: {usageBits.join(', ')}</p>
        <p>Total de Faltas de Página: {pageFaults}</p>
      </div>
    </div>
  );
};

export default Simulation;
