class LRU {
    constructor(capacity) {
      this.capacity = capacity;
      this.memory = [];
      this.accessOrder = new Map();
      this.faults = 0;
    }
  
    consultar(numeroPagina) {
      return this.memory.includes(numeroPagina);
    }
  
    substituir(numeroPagina) {
      if (this.consultar(numeroPagina)) {
        this.accessOrder.set(numeroPagina, Date.now());
        return;
      }
  
      this.faults++;
  
      if (this.memory.length < this.capacity) {
        this.memory.push(numeroPagina);
      } else {
        const lruPage = this.memory.reduce((leastRecentlyUsed, page) => {
          if (
            !leastRecentlyUsed ||
            this.accessOrder.get(page) < this.accessOrder.get(leastRecentlyUsed)
          ) {
            return page;
          }
          return leastRecentlyUsed;
        }, null);
  
        const index = this.memory.indexOf(lruPage);
        this.memory[index] = numeroPagina;
      }
  
      this.accessOrder.set(numeroPagina, Date.now());
    }
  
    exibirMemoria() {
      return [...this.memory];
    }
  
    exibirOrdemAcesso() {
      return this.memory.map((page) => this.accessOrder.get(page) || 0);
    }
  }
  
  export default LRU;
  