class GameStatusController {
    constructor() {

    }

    updateElementWithGameState(currentGameState) {
        const gameStateDOMRepresentation = document.getElementById('gameStateDisplay'),
            playerDisplayName = document.createElement('strong'),
            currentPlayer = currentGameState.currentPlayer;


        gameStateDOMRepresentation.innerHTML = '';

        if (currentGameState.isRunning) {
            playerDisplayName.innerHTML = currentPlayer.name;

            gameStateDOMRepresentation.innerHTML = "Vez de: "
            gameStateDOMRepresentation.style.backgroundColor = currentPlayer.referenceColor;

            gameStateDOMRepresentation.appendChild(playerDisplayName);

        } else if (!currentGameState.hasWinner) {
            gameStateDOMRepresentation.innerHTML = 'Empate!'
            gameStateDOMRepresentation.style.backgroundColor = '#EDAF10';

        } else {
            playerDisplayName.innerHTML = currentGameState.currentPlayer.name;

            gameStateDOMRepresentation.appendChild(playerDisplayName);
            gameStateDOMRepresentation.innerHTML += ' venceu!';
            gameStateDOMRepresentation.style.backgroundColor = currentPlayer.referenceColor;
        }
    }
}