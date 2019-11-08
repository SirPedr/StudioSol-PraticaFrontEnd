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
                const cellDOMEl = document.createElement('span');

                cellDOMEl.innerHTML = 'X';
                cellDOMEl.dataset.rowNumber = i;
                cellDOMEl.dataset.colNumber = j;
                
                gameGrid[i][j] = new GameGridCell(cellDOMEl);
                gridDOMEl.appendChild(cellDOMEl);
                
            }
        }
    }
}

//Debug
const ttt = new TicTacToeGrid(3);
ttt.gameGrid[0][2].mark('otorrinolaringologia');
console.log(ttt.gameGrid);