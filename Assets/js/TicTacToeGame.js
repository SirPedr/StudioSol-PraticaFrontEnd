class TicTacToeGame {
    constructor(gameGrid, firstPlayer, secondPlayer) {
        this.gameTable = gameGrid;
        this.firstPlayer = firstPlayer;
        this.secondPlayer = secondPlayer;
        this.currentPlayer = firstPlayer;

        this.gameStateObservers = [];

        this.gameTable.gameGrid
            .map(tableRow => {
                tableRow.map(tableCell => {
                    this.attachCellClickEvent(tableCell);
                })
            })

        this.updateGameState(true, false, this.currentPlayer);

    }

    attachCellClickEvent(gridCell) {
        gridCell.cell.addEventListener('click', () => {
            this.handleCellClick(gridCell);
        })
    }

    handleCellClick(clickedCell) {
        const wasCellMarked = clickedCell.mark(this.currentPlayer);

        if (wasCellMarked) {
            this.switchCurrentPlayer();
            this.updateGameState(true, false, this.currentPlayer);
        }
    }

    switchCurrentPlayer() {
        if (this.currentPlayer.symbol === this.firstPlayer.symbol) {
            this.currentPlayer = this.secondPlayer;
        } else {
            this.currentPlayer = this.firstPlayer;
        }


    }

    updateGameState(isGameRunning, gameHasWinner, currentPlayer) {
        this.currentGameState = {
            isRunning: isGameRunning,
            hasWinner: gameHasWinner,
            currentPlayer: currentPlayer
        }

        this.gameStateObservers
            .map(observerNotifyMethod => observerNotifyMethod(this.currentGameState));

        return this.currentGameState;
    }
}