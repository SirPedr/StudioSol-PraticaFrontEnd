const ticTacToeGrid = new TicTacToeGrid(3),
      gameStateController = new GameStatusController(),
      firstPlayer = new Player("Jogador 1", "X", "#FF3266"),
      secondPlayer = new Player("Jogador 2", "O", "#30CB76"),
      ticTacToeGame = new TicTacToeGame(ticTacToeGrid, firstPlayer, secondPlayer);

ticTacToeGame.gameStateObservers.push(gameStateController.updateElementWithGameState);

const resetGameBtn = document.getElementById('resetGameBtn');

resetGameBtn.addEventListener('click', () => {
    ticTacToeGame.resetGame();
})


const openPlayerNameInputsBtn = document.getElementById('openPlayerNameInputsBtn'),
      closePlayerNameInputsBtn = document.getElementById('closePlayerNamesModal'),
      changePlayerNamesModal = document.getElementById('changePlayerNamesModal');

openPlayerNameInputsBtn.addEventListener('click', () => {
    changePlayerNamesModal.style.display = 'inline';
})

closePlayerNameInputsBtn.addEventListener('click', () => {
    changePlayerNamesModal.style.display = 'none';
})

const playerNameInputs = document.querySelectorAll('.playerNameInput'),
      firstPlayerNameInputController = new PlayerNameInputController(firstPlayer, playerNameInputs[0]),
      secondPlayerNameInputController = new PlayerNameInputController(secondPlayer, playerNameInputs[1]),
      savePlayerNamesBtn = document.getElementById('savePlayerNamesBtn');

savePlayerNamesBtn.addEventListener('click', () => {
    firstPlayerNameInputController.updatePlayerName();
    secondPlayerNameInputController.updatePlayerName(); 
})

const showStatisticsModalBtn = document.getElementById('showStatisticsModalBtn'),
      statisticsModalController = new StatisticsModalController(),
      closeStatisticsModalBtn = document.getElementById('closeStatisticsModalBtn');

showStatisticsModalBtn.addEventListener('click', () => {
    statisticsModalController.openStatisticsModal();
    statisticsModalController.updateGameStatistics(ticTacToeGame.getStatistics());
})

closeStatisticsModalBtn.addEventListener('click', () => {
    statisticsModalController.closeStatisticsModal();
})