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