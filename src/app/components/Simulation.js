import React, { useState } from 'react';
import { motion } from 'framer-motion';

// Classe do algoritmo FIFO Second Chance
class FIFOSecondChance {
  constructor(capacidade) {
    this.capacidade = capacidade;
    this.fila = new Array(capacidade).fill(null);
    this.indice = 0;
    this.faltas = 0;
  }

  consultar(numero_pagina) {
    for (let i = 0; i < this.capacidade; i++) {
      const pagina = this.fila[i];
      if (pagina && pagina.numero === numero_pagina) {
        pagina.R = 1;
        return true;
      }
    }
    return false;
  }

  substituir(numero_pagina) {
    if (!this.consultar(numero_pagina)) {
      this.faltas += 1;
      while (true) {
        const paginaAtual = this.fila[this.indice];
        if (!paginaAtual || paginaAtual.R === 0) {
          const replacedPage = paginaAtual ? paginaAtual.numero : null;
          this.fila[this.indice] = new Pagina(numero_pagina);
          this.indice = (this.indice + 1) % this.capacidade;
          return replacedPage;
        } else {
          paginaAtual.R = 0;
          this.indice = (this.indice + 1) % this.capacidade;
        }
      }
    }
    return null;
  }

  exibirMemoria() {
    return this.fila.map((pagina) => (pagina ? pagina.numero : '-'));
  }

  exibirBits() {
    return this.fila.map((pagina) => (pagina ? pagina.R : 0));
  }
}

class Pagina {
  constructor(numero) {
    this.numero = numero;
    this.R = 0;
  }
}

// Componente para entrada de dados
const InputSection = ({ capacity, setCapacity, setReferenceString }) => {
  const handleCapacityChange = (e) => {
    const newCapacity = parseInt(e.target.value, 10);
    if (!isNaN(newCapacity) && newCapacity > 0) {
      setCapacity(newCapacity);
    }
  };

  const handleReferenceStringChange = (e) => {
    const value = e.target.value.trim();
    const formatted = value.split(/\s+/).map(Number).filter((num) => !isNaN(num));
    setReferenceString(formatted);
  };

  return (
    <div className="flex flex-col items-center space-y-2">
      <label className="text-gray-700 font-bold">Capacidade da Memória:</label>
      <input
        type="number"
        className="border p-2 rounded text-center text-gray-500"
        value={capacity}
        onChange={handleCapacityChange}
        min={1}
      />
      <label className="text-gray-700 font-bold">Sequência de Páginas:</label>
      <input
        type="text"
        className="border p-2 rounded text-center text-gray-500"
        placeholder="Ex: 1 2 3 5 6"
        onChange={handleReferenceStringChange}
      />
    </div>
  );
};

// Componente para tabela de resultados
const SimulationTable = ({ steps }) => (
  <div className="overflow-x-auto w-full">
    <table className="table-auto w-full max-w-4xl border-collapse mt-5 shadow-lg text-sm md:text-base">
      <thead className="bg-gray-800 text-white">
        <tr>
          <th className="border px-2 md:px-4 py-2">Passo</th>
          <th className="border px-2 md:px-4 py-2">Página Referenciada</th>
          <th className="border px-2 md:px-4 py-2">Memória</th>
          <th className="border px-2 md:px-4 py-2">Bits</th>
          <th className="border px-2 md:px-4 py-2">Falta de Página</th>
        </tr>
      </thead>
      <tbody>
        {steps.map((step) => (
          <motion.tr
            key={step.step}
            className={`${step.pageFault === 'Sim' ? 'bg-red-100' : 'bg-gray-100'}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <td className="border px-2 md:px-4 py-2 text-center font-semibold text-gray-500">{step.step}</td>
            <td className="border px-2 md:px-4 py-2 text-center font-semibold text-gray-500">{step.page}</td>
            <td className="border px-2 md:px-4 py-2 text-center font-semibold text-gray-500">
              {step.memoryAfter.join(' ')}
            </td>
            <td className="border px-2 md:px-4 py-2 text-center font-semibold text-gray-500">
              {step.bitsAfter.join(' ')}
            </td>
            <td
              className={`border px-2 md:px-4 py-2 text-center font-semibold ${
                step.pageFault === 'Sim' ? 'bg-red-200 text-white' : 'text-gray-900'
              }`}
            >
              {step.pageFault}
            </td>
          </motion.tr>
        ))}
      </tbody>
    </table>
  </div>
);

// Componente principal
const Simulation = () => {
  const [capacity, setCapacity] = useState(5);
  const [referenceString, setReferenceString] = useState([]);
  const [simulationSteps, setSimulationSteps] = useState([]);
  const [pageFaults, setPageFaults] = useState(0);

  const runSimulation = () => {
    const memory = new FIFOSecondChance(capacity);
    const steps = [];

    referenceString.forEach((page, index) => {
      const memoryBefore = memory.exibirMemoria();
      const bitsBefore = memory.exibirBits();

      const replacedPage = memory.substituir(page);

      const memoryAfter = memory.exibirMemoria();
      const bitsAfter = memory.exibirBits();

      const pageFault = replacedPage !== null;

      steps.push({
        step: index + 1,
        page,
        replacedPage: replacedPage !== null ? replacedPage : '-',
        memoryAfter,
        bitsAfter,
        pageFault: pageFault ? 'Sim' : 'Não',
      });
    });

    setSimulationSteps(steps);
    setPageFaults(steps.filter((step) => step.pageFault === 'Sim').length);
  };

  return (
    <div className="flex flex-col items-center space-y-5 p-5">
      <InputSection
        capacity={capacity}
        setCapacity={setCapacity}
        setReferenceString={setReferenceString}
      />
      <button
        className="bg-blue-500 text-white p-2 rounded"
        onClick={runSimulation}
      >
        Executar FIFO Second Chance
      </button>
      <SimulationTable steps={simulationSteps} />
      <div className="mt-5 text-lg md:text-xl font-bold">
        <p>Falhas de Página: {pageFaults}</p>
      </div>
    </div>
  );
};

export default Simulation;
