class GameGridCell {
    constructor(cell) {
        this.cell = cell;
        this.isFilled = false;
    }

    mark(player) {
        if (!this.isFilled) {
            this.cell.innerHTML = player.symbol;
            this.cell.style.color = player.referenceColor;
            this.isFilled = true;

            return true;
        }

        return false;
    }

    clearCell() {
        this.cell.innerHTML = '';
        this.isFilled = false;
    }

    static getValidCellsValues(gridCells) {
        return gridCells
            .filter(gridCell => gridCell.isFilled)
            .map(filledCell => filledCell.cell.innerHTML);
    }
}