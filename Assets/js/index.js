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