/**
 * Jogo da Velha
 * Prova de Front-End da Studio Sol (2019) - desenvolvido por Pedro Paulo de Aguiar Gama Barbosa
 * 
 * Toda a aplicação foi construída usando o paradigma de Orientação a Objetos com as tecnologia
 * ES6 (EcmaScript 6), CSS3 e HTML5.
 * 
 * A lógica do programa se baseia na manipulação de uma matriz, controlada pela classe TicTacToeGrid. Assim que
 * a página carrega, essa matriz é desenhada no DOM e cada célula é um objeto do tipo GameGridCell, que contém 
 * informações sobre ela, como o fato de estar preenchida ou não. 
 * 
 * Essa matriz gerada é manipulada na classe TicTacToeGame, que acessa ela através de uma composição. É essa classe
 * que cuida da troca de turnos e das condições de vitória. Dessa forma, é adicionado um evento de clique para cada 
 * célula da tabela, que verifica se é possível marcar a célula clicada (uma célula só pode ser marcada se o jogo 
 * ainda estiver acontecendo e se ela estiver vazia). Em caso positivo, o símbolo do jogador daquele turno é marcado
 * na célula, o jogador da vez é alterado e, em seguida, através do padrão de projeto Observer, o código notifica o 
 * display de estado corrente do jogo (que exibe informações como de quem é a vez, se há ganhador ou se houve
 * empate), representado por uma classe Controller, passando um objeto JSON que contém todas as informações sobre o 
 * jogo corrente, e então ele atualiza de acordo.
 * 
 * Além disso, toda vez que uma célula é marcada há a checagem por parte da TicTacToeGame das condições de vitória.
 * Para tal, a classe analisa a matriz de jogo, verificando as linhas, colunas e diagonais válidos (ou seja, cujas 
 * células estão marcadas) por símbolos que sejam iguais, utilizando métodos da TicTacToeGrid que fornecem essas
 * informações, e caso haja sucesso nessa checagem há a atualização do estado de jogo, que elege o vencedor e impede
 * que uma nova célula seja marcada até que outro jogo comece.
 * 
 * Em paralelo, os jogadores, se desejarem, podem alterar o nome que lhes é dado pelo jogo clicando no botão correspondente.
 * Para isso, são disponibilizados 2 inputs, um para cada nome, que devem ter seus valores alterados pelos usuários para que
 * seu nome mude. Assim que o botão "Salvar" é clicado, os jogadores têm seus nomes atualizados e a janela modal é fechada, 
 * permitindo que o jogo possa continuar seguindo seu fluxo.
 * 
 * Além disso, há um sistema de estatísticas que os jogadores podem acessar para consultar informações como o tempo médio de jogada, 
 * tempo total que um jogador ficou jogando, placar, tempo total de jogo etc, armazenadas em formato JSON. Para realizar esses cálculos,
 * há uma classe dedicada chamada PlayerStatistics, que por composição está configurada para ser um atributo de um jogador. O tempo de 
 * jogo começa a contar assim que a página é carregada. Quando algum jogador clica em uma célula, o seu tempo de jogada é encerrado e, 
 * por consequência, o tempo de jogada do jogador adversário é inicializado. Sendo assim, sempre que há um encerramento desse tempo, a 
 * classe de estatísticas o adiciona em um array e calcula média correspondente. Por fim, o tempo total de jogo é calculado a partir da 
 * soma do tempo total de jogo de cada jogador. Por fim, sempre que o jogador requisita pelas estatísticas, é aberta outra janela  modal, 
 * cujo Controller obtém as estatísticas do jogo através de um método da TicTacToeGame, e, através de atributos data configurados nos
 * campos HTML que compõem essa janela, o código consegue saber em qual campo do JSON procurar uma determinada informação, bem como 
 * identificar a qual jogador ela se refere e finalmente deixá-la visível no DOM. No entanto, no caso de informações que envolvem tempo,
 * essas passam por um processo de formatação (já que esse tempo é armazenado em milisegundos) para que se transformem em strings legíveis
 * para o usuário.
 * 
 * O projeto foi desenvolvido usando o controle de versão GIT para garantir maior organização.
 */

const cssVariables = getComputedStyle(document.body);

const ticTacToeGrid = new TicTacToeGrid(3),
      gameStateController = new GameStatusController(),
      firstPlayer = new Player("Jogador 1", "X", cssVariables.getPropertyValue("--firstPlayerMainColor")),
      secondPlayer = new Player("Jogador 2", "O", cssVariables.getPropertyValue("--secondPlayerMainColor")),
      ticTacToeGame = new TicTacToeGame(ticTacToeGrid, firstPlayer, secondPlayer);

ticTacToeGame.gameStateObservers.push(gameStateController.updateElementWithGameState);

const resetGameBtn = document.getElementById('resetGameBtn');

resetGameBtn.addEventListener('click', () => {
    ticTacToeGame.resetGame();
})

const changePlayerNamesModal = document.getElementById('changePlayerNamesModal'),
      openPlayerNameInputsBtn = document.getElementById('openPlayerNameInputsBtn'),
      closePlayerNameInputsBtn = document.getElementById('closePlayerNamesModal'),
      changeNameModalController = new UIModalOpenController(changePlayerNamesModal, true);

openPlayerNameInputsBtn.addEventListener('click', () => {
   changeNameModalController.openModal();
})

closePlayerNameInputsBtn.addEventListener('click', () => {
    changeNameModalController.closeModal();
})

const playerNameInputs = document.querySelectorAll('.playerNameInput'),
      firstPlayerNameInputController = new PlayerNameInputController(firstPlayer, playerNameInputs[0]),
      secondPlayerNameInputController = new PlayerNameInputController(secondPlayer, playerNameInputs[1]),
      savePlayerNamesBtn = document.getElementById('savePlayerNamesBtn');

savePlayerNamesBtn.addEventListener('click', () => {
    firstPlayerNameInputController.updatePlayerName();
    secondPlayerNameInputController.updatePlayerName(); 
    changeNameModalController.closeModal();
})

const openStatisticsModalBtn = document.getElementById('showStatisticsModalBtn'),
      closeStatisticsModalBtn = document.getElementById('closeStatisticsModalBtn'),
      statisticModal = document.getElementById('statisticsModal'),
      statisticsValuesController = new StatisticsValueController(),
      statisticsModalOpenController = new UIModalOpenController(statisticModal, true);

openStatisticsModalBtn.addEventListener('click', () => {
    statisticsModalOpenController.openModal();
    statisticsValuesController.updateGameStatistics(ticTacToeGame.getStatistics());
})

closeStatisticsModalBtn.addEventListener('click', () => {
    statisticsModalOpenController.closeModal();
})