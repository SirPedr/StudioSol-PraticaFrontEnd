class TicTacToeGrid {
    constructor(gridSize = 3) {
        this.gameGrid = [];
        this.gridSize = gridSize;

        for(let i = 0; i < gridSize; i++) {
            this.gameGrid[i] = [];
        }

        this.drawTableInDOM(this.gameGrid);
    }

    drawTableInDOM(gameGrid) {
        const gridDOMEl = document.querySelector('main');

        for(let i = 0; i < this.gridSize; i++) {
            for(let j = 0; j < this.gridSize; j++) {
                const gameGridCell = this.createGridCell(i, j);

                gameGrid[i][j] = gameGridCell;
                gridDOMEl.appendChild(gameGridCell.cell);
            }
        }
    }

    createGridCell(rowPosition, colPosition) {
        const cellDOMEl = document.createElement('span');
        
        cellDOMEl.innerHTML = '';
        cellDOMEl.dataset.rowNumber = rowPosition;
        cellDOMEl.dataset.colNumber = colPosition;
        
        return new GameGridCell(cellDOMEl);
    }
}
