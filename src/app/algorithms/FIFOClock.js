import { motion } from 'framer-motion';

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
        console.log(`Página ${numero_pagina} encontrada. Bit de referência atualizado para 1.`);
        return true; // Página encontrada, não é necessário substituir
      }
    }
    console.log(`Página ${numero_pagina} não encontrada. Falha de página.`);
    return false; // Página não encontrada, ocorre falha de página
  }

  // Função para substituir a página quando ocorrer uma falha
  substituir(numero_pagina) {
    if (!this.consultar(numero_pagina)) {
      this.faltas += 1;
      console.log(`Falha de página. Total de falhas: ${this.faltas}`);

      while (true) {
        const paginaAtual = this.fila[this.indice];

        if (!paginaAtual || paginaAtual.R === 0) {
          const replacedPage = paginaAtual ? paginaAtual.numero : null;
          this.fila[this.indice] = new Pagina(numero_pagina);
        //   console.log(`Página ${replacedPage} substituída por ${numero_pagina}.`);
          this.indice = (this.indice + 1) % this.capacidade;
          break;
        } else {
          paginaAtual.R = 0; // Reseta o bit de referência
          console.log(`Bit de referência da página ${paginaAtual.numero} resetado para 0.`);
          this.indice = (this.indice + 1) % this.capacidade;
        }
      }
    }
  }

  // Exibe o estado atual da memória (números das páginas)
  exibirMemoria() {
    const memoria = this.fila.map((pagina) => (pagina ? pagina.numero : '-'));
    // console.log(`Estado atual da memória: ${memoria.join(' ')}`);
    return memoria;
  }

  // Exibe os bits de referência das páginas
  exibirBits() {
    const bits = this.fila.map((pagina) => (pagina ? pagina.R : 0));
    console.log(`Bits de referência: ${bits.join(' ')}`);
    return bits;
  }
}
