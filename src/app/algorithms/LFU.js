class LFU {
    constructor(capacity) {
      this.capacity = capacity;
      this.memory = [];
      this.frequency = new Map();
      this.faults = 0;
    }
  
    consultar(numeroPagina) {
      return this.memory.includes(numeroPagina);
    }
  
    substituir(numeroPagina) {
      if (this.consultar(numeroPagina)) {
        this.frequency.set(numeroPagina, this.frequency.get(numeroPagina) + 1);
        return;
      }
  
      this.faults++;
  
      if (this.memory.length < this.capacity) {
        this.memory.push(numeroPagina);
      } else {
        const lfuPage = this.memory.reduce((leastFrequent, page) => {
          if (
            !leastFrequent ||
            this.frequency.get(page) < this.frequency.get(leastFrequent)
          ) {
            return page;
          }
          return leastFrequent;
        }, null);
  
        const index = this.memory.indexOf(lfuPage);
        this.memory[index] = numeroPagina;
      }
  
      this.frequency.set(numeroPagina, (this.frequency.get(numeroPagina) || 0) + 1);
    }
  
    exibirMemoria() {
      return [...this.memory];
    }
  
    exibirFrequencias() {
      return this.memory.map((page) => this.frequency.get(page) || 0);
    }
  }
  
  export default LFU;
  