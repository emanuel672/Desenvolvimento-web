const { fromEvent } = rxjs; // Importa a função fromEvent de rxjs, que cria um observable a partir de eventos DOM.
const { map, startWith } = rxjs.operators; // Importa os operadores map e startWith de rxjs/operators.

const house = document.querySelector('#house'); // Seleciona o elemento HTML com o ID 'house'.
const range = document.querySelector('#range'); // Seleciona o elemento HTML com o ID 'range'.
const label = document.querySelector('#label'); // Seleciona o elemento HTML com o ID 'label'.

const f = new Flipping(); // Instancia um objeto Flipping (presumivelmente definido em algum lugar não mostrado no código).

// Define uma função de atualização que envolve a lógica de atualização dos elementos DOM.
const update = f.wrap(rooms => {
  const prevRooms = house.getAttribute('data-rooms'); // Obtém o número de quartos anterior do atributo 'data-rooms' do elemento house.
  house.setAttribute('data-prev-rooms', prevRooms); // Define o número de quartos anterior no atributo 'data-prev-rooms' do elemento house.
  house.setAttribute('data-rooms', rooms); // Define o número de quartos atual no atributo 'data-rooms' do elemento house.

  label.setAttribute('data-prev-rooms', prevRooms); // Define o número de quartos anterior no atributo 'data-prev-rooms' do elemento label.
  label.setAttribute('data-rooms', rooms); // Define o número de quartos atual no atributo 'data-rooms' do elemento label.
  label.setAttribute('data-rooms-delta', rooms - prevRooms); // Define a diferença entre os quartos atual e anterior no atributo 'data-rooms-delta' do elemento label.
});

// Cria um observable a partir do evento 'input' do elemento range, que emite valores sempre que o valor do range muda.
const range$ = fromEvent(range, 'input')
  .pipe(
    map(e => e.target.value), // Mapeia o evento para obter o valor do alvo do evento, que é o valor do range.
    startWith(6) // Começa o fluxo de dados com o valor inicial 6 se não houver eventos.
  );

// Inscreve-se no observable range$ e chama a função de atualização quando novos valores são emitidos.
range$.subscribe(update);