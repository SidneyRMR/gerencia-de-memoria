# FIFO Second Chance (FIFOClock)

Este projeto implementa o algoritmo **FIFO Second Chance** (também conhecido como FIFOClock) para gerenciamento de memória em sistemas operacionais. Esse algoritmo é uma melhoria do algoritmo FIFO, utilizando um **bit de referência (R)** para permitir que páginas acessadas recentemente tenham uma "segunda chance" antes de serem substituídas.

---

## 📋 **Descrição**

O algoritmo FIFO Second Chance funciona com as seguintes características:

1. **FIFO com Segunda Chance:**  
   - Quando uma página é acessada, o bit de referência **R** é atualizado para **1**.  
   - Caso ocorra uma falha de página, a substituição é feita com base no valor de **R**:
     - **R = 0:** Página substituída diretamente.  
     - **R = 1:** Página recebe uma "segunda chance", o bit é resetado para **0**, e o algoritmo avança para verificar a próxima página.

2. **Memória Circular:**  
   - As páginas são armazenadas em uma fila circular, e a substituição segue a ordem FIFO, garantindo simplicidade e eficiência.

3. **Falhas de Página:**  
   - O contador de falhas rastreia quantas vezes foi necessário substituir páginas por falta de espaço na memória.

---

## 🛠 **Estrutura do Código**

### Classe `FIFOSecondChance`
Gerencia as operações do algoritmo.

#### Principais Funções:
- **`consultar(numero_pagina)`**  
  Verifica se a página já está na memória:  
  - Atualiza o bit de referência para **1** se a página for encontrada.  
  - Retorna `false` em caso de falha de página.

- **`substituir(numero_pagina)`**  
  Realiza a substituição de páginas em caso de falha:  
  - Substitui a página mais antiga com **R = 0**.  
  - Reseta o bit de referência para **0** caso a página tenha **R = 1** e avança para a próxima.

- **`exibirMemoria()`**  
  Retorna o estado atual da memória, mostrando os números das páginas ou `'-'` para posições vazias.

- **`exibirBits()`**  
  Exibe os bits de referência (**R**) de cada página.

---

### Classe `Pagina`
Representa uma página armazenada na memória.

#### Atributos:
- **`numero`**  
  Número da página.

- **`R`**  
  Bit de referência, inicializado como **0**.

---

## 🧪 **Exemplo de Uso**

```javascript
// Criando uma instância do algoritmo com capacidade para 3 páginas
const fifoClock = new FIFOSecondChance(3);

// Simulando operações
fifoClock.substituir(1); // Falha, adiciona a página 1
fifoClock.substituir(2); // Falha, adiciona a página 2
fifoClock.substituir(3); // Falha, adiciona a página 3
fifoClock.substituir(1); // Não há falha, atualiza o bit de referência para 1
fifoClock.substituir(4); // Falha, substitui página com R = 0

console.log("Estado da Memória:", fifoClock.exibirMemoria());
console.log("Bits de Referência:", fifoClock.exibirBits());
console.log("Total de Falhas:", fifoClock.faltas);

## 📊 **Saída Esperada**

Após executar o código de exemplo, o resultado será semelhante ao seguinte:

Página 1 não encontrada. Falha de página.
Página 2 não encontrada. Falha de página.
Página 3 não encontrada. Falha de página.
Página 1 encontrada. Bit de referência atualizado para 1.
Página 4 não encontrada. Falha de página.

Estado da Memória: [ '4', '2', '3' ]
Bits de Referência: [ 0, 1, 0 ]
Total de Falhas: 4
```
## 📌 **Conceito Chave**

O algoritmo **FIFO Second Chance** (FIFO com Segunda Chance) é uma extensão do algoritmo FIFO clássico utilizado em gerenciamento de memória e substituição de páginas. Ele busca melhorar a taxa de acertos aproveitando um bit de referência associado a cada página. O conceito chave é simples:

- **FIFO** (First In, First Out): Substitui a página que está na memória há mais tempo.
- **Segunda Chance**: Antes de substituir a página, verifica se o bit de referência é 1:
  - **Se for 1**, o bit é resetado para 0, e a página ganha uma "segunda chance".
  - **Se for 0**, a página é substituída.

Este método equilibra a simplicidade do FIFO com uma abordagem mais adaptativa, evitando substituir páginas frequentemente acessadas recentemente.

---

## 🚀 **Melhorias Futuras**

Para aprimorar o algoritmo e a aplicação, algumas melhorias podem ser implementadas:

1. **Visualização Gráfica Avançada**  
   Integrar gráficos ou animações que mostram as substituições de páginas e alterações nos bits de referência em tempo real, tornando a aplicação mais intuitiva.

2. **Suporte a Outros Algoritmos**  
   Adicionar suporte para outros algoritmos de substituição de páginas, como LRU (Least Recently Used) e Optimal, para comparação direta com o FIFO Second Chance.

3. **Parâmetros Dinâmicos**  
   Permitir que os usuários personalizem:
   - Número de quadros na memória.
   - Sequência de referência gerada aleatoriamente ou manualmente.

4. **Métricas Detalhadas**  
   Exibir estatísticas adicionais, como:
   - Taxa de acertos (hit rate).
   - Tempo médio de busca.
   - Número de páginas acessadas.

5. **Exportação de Resultados**  
   Implementar uma funcionalidade para exportar os resultados em formatos como CSV ou PDF para análise externa.

6. **Otimização de Desempenho**  
   Melhorar a eficiência do código para lidar com sequências maiores e simulações mais complexas.


Estas melhorias podem tornar a aplicação mais robusta e educativa, beneficiando estudantes e profissionais interessados no funcionamento interno dos sistemas operacionais.

---

## Desenvolvedores
[Brenda Gaudêncio](https://github.com/brendagaudencio)
[Renan Mazzilli](https://github.com/renan-mazzilli)
[Sidney Rafael](https://github.com/SidneyRMR)
[Thaíto Batalini](https://github.com/thaitoGB)