import React, { useState } from 'react';
import { motion } from 'framer-motion'; // Importando framer-motion

class FIFOSecondChance {
  constructor(capacidade) {
    this.capacidade = capacidade;
    this.fila = new Array(capacidade).fill(null); // Lista circular de páginas na memória
    this.indice = 0; // Índice para o algoritmo FIFO
    this.faltas = 0; // Contador de falhas de página
  }

  // Função para verificar se a página está na memória e atualizar o bit de referência
  consultar(numero_pagina) {
    for (let i = 0; i < this.capacidade; i++) {
      const pagina = this.fila[i];
      if (pagina && pagina.numero === numero_pagina) {
        pagina.R = 1; // Atualiza o bit de referência para 1
        return true; // Página encontrada, não é necessário substituir
      }
    }
    return false; // Página não encontrada, ocorre falha de página
  }

  // Função para substituir a página quando ocorrer uma falha
  substituir(numero_pagina) {
    if (!this.consultar(numero_pagina)) {
      this.faltas += 1;

      while (true) {
        const paginaAtual = this.fila[this.indice];

        if (!paginaAtual || paginaAtual.R === 0) {
          const replacedPage = paginaAtual ? paginaAtual.numero : null;
          this.fila[this.indice] = new Pagina(numero_pagina);
          this.indice = (this.indice + 1) % this.capacidade;
          return replacedPage; // Retorna a página substituída
        } else {
          paginaAtual.R = 0; // Reseta o bit de referência
          this.indice = (this.indice + 1) % this.capacidade;
        }
      }
    }
    return null; // Nenhuma substituição realizada
  }

  // Exibe o estado atual da memória (números das páginas)
  exibirMemoria() {
    const memoria = this.fila.map((pagina) => (pagina ? pagina.numero : '-'));
    return memoria;
  }

  // Exibe os bits de referência das páginas
  exibirBits() {
    const bits = this.fila.map((pagina) => (pagina ? pagina.R : 0));
    return bits;
  }
}

class Pagina {
  constructor(numero) {
    this.numero = numero;
    this.R = 0; // Inicializa o bit de referência para 0
  }
}

const Simulation = () => {
  const [capacity, setCapacity] = useState(5); // Número de quadros na memória
  const [referenceString, setReferenceString] = useState([1, 2, 4, 6, 7, 8, 10, 11, 14]); // Sequência de páginas
  const [simulationSteps, setSimulationSteps] = useState([]);
  const [pageFaults, setPageFaults] = useState(0);

  const runSimulation = () => {
    let memory = new FIFOSecondChance(capacity);
    const steps = [];

    referenceString.forEach((page, index) => {
      const memoryBefore = memory.exibirMemoria();
      const bitsBefore = memory.exibirBits();

      // Verifique se a página já está na memória
      const isPageInMemory = memoryBefore.includes(page);

      // Se a página não estiver na memória, faça a substituição
      const replacedPage = isPageInMemory ? null : memory.substituir(page);

      const memoryAfter = memory.exibirMemoria();
      const bitsAfter = memory.exibirBits();

      // Verificar se houve falha de página
      const pageFault = !isPageInMemory; // Falha ocorre se a página não estava na memória

      steps.push({
        step: index + 1,
        page,
        replacedPage: replacedPage !== null ? replacedPage : '-',
        memoryAfter,
        bitsAfter,
        pageFault: pageFault ? 'Sim' : 'Não', // Exibe 'Sim' ou 'Não' conforme a falha de página
      });
    });

    setSimulationSteps(steps);
    setPageFaults(steps.filter((step) => step.pageFault === 'Sim').length);
  };

  return (
    <div className="flex flex-col items-center space-y-5 p-5">
      <div className="flex space-x-3">
        <button
          className="bg-blue-500 text-white p-2 rounded"
          onClick={runSimulation}
        >
          Executar FIFO Second Chance
        </button>
      </div>

      {/* Tabela Responsiva */}
      <div className="overflow-x-auto w-full">
        <table className="table-auto w-full max-w-4xl border-collapse mt-5 shadow-lg text-sm md:text-base">
          <thead className="bg-gray-800 text-white">
            <tr>
              <th className="border px-2 md:px-4 py-2">Passo</th>
              <th className="border px-2 md:px-4 py-2">Página Referenciada</th>
              <th className="border px-2 md:px-4 py-2">Memória</th>
              <th className="border px-2 md:px-4 py-2 min-w-[120px]">Bits</th>
              <th className="border px-2 md:px-4 py-2">Falta de Página</th>
            </tr>
          </thead>
          <tbody>
            {simulationSteps.map((step) => (
              <motion.tr
                key={step.step}
                className={`${step.pageFault === 'Sim' ? 'bg-red-100' : 'bg-gray-100'}`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }} // Adicionando animação de transição suave
              >
                <td className="border px-2 md:px-4 py-2 text-center font-semibold text-gray-500">{step.step}</td>
                <td className="border px-2 md:px-4 py-2 text-center font-semibold text-gray-500">{step.page}</td>
                <td className="border px-2 md:px-4 py-2 text-center font-semibold text-gray-500">
                  {step.memoryAfter.length > 0 ? step.memoryAfter.join(' ') : '-'}
                </td>
                <td className="border px-2 md:px-4 py-2 text-center font-semibold text-gray-500">
                  {step.bitsAfter.length > 0 ? step.bitsAfter.join(' ') : '-'}
                </td>
                <td
                  className={`border px-2 md:px-4 py-2 text-center font-semibold ${
                    step.pageFault === 'Sim' ? 'bg-red-200 text-white' : 'text-gray-900'
                  }`}
                >
                  {step.pageFault} {/* Mostra 'Sim' ou 'Não' conforme a falha de página */}
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-5 text-lg md:text-xl font-bold">
        <p>Falhas de Página: {pageFaults}</p>
      </div>
    </div>
  );
};

export default Simulation;
