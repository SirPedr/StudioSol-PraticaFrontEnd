class TicTacToeGame {
    constructor(gameGrid, firstPlayer, secondPlayer) {
        this.gameTable = gameGrid;
        this.firstPlayer = firstPlayer;
        this.secondPlayer = secondPlayer;
        this.currentPlayer = firstPlayer; 

        this.gameTable.gameGrid
        .map(tableRow => {
            tableRow.map(tableCell => {
                this.attachCellClickEvent(tableCell);
            })
        })
    }

    attachCellClickEvent(gridCell) {
        gridCell.cell.addEventListener('click', () => {
            this.handleCellClick(gridCell);
        })
    }

    handleCellClick(clickedCell) {
        clickedCell.mark(this.currentPlayer.symbol);
        this.alternateTurn();
    }

    alternateTurn() {
        if(this.currentPlayer.symbol === this.firstPlayer.symbol) {
            this.currentPlayer = this.secondPlayer;
        } else {
            this.currentPlayer = this.firstPlayer;
        }
    }
}