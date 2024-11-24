class Pagina {
    constructor(numero) {
      this.numero = numero;
      this.R = 0; // Bit de referência
    }
  }
  
  class FIFOClock {
    constructor(capacidade) {
      this.capacidade = capacidade;
      this.fila = [];
      this.indice = 0;
      this.faltas = 0;
    }
  
    consultar(numero_pagina) {
      for (const pagina of this.fila) {
        if (pagina.numero === numero_pagina) {
          pagina.R = 1; // Atualiza o bit de referência
          return true;
        }
      }
      return false;
    }
  
    substituir(numero_pagina) {
      if (!this.consultar(numero_pagina)) {
        this.faltas += 1;
  
        if (this.fila.length < this.capacidade) {
          this.fila.push(new Pagina(numero_pagina));
        } else {
          while (true) {
            const paginaAtual = this.fila[this.indice];
            if (paginaAtual.R === 0) {
              this.fila[this.indice] = new Pagina(numero_pagina);
              this.indice = (this.indice + 1) % this.capacidade;
              break;
            } else {
              paginaAtual.R = 0;
              this.indice = (this.indice + 1) % this.capacidade;
            }
          }
        }
      }
    }
  
    exibirMemoria() {
      return this.fila.map((pagina) => pagina.numero || '-');
    }
  
    exibirBits() {
      return this.fila.map((pagina) => pagina.R || 0);
    }
  }
  
  export default FIFOClock;
  