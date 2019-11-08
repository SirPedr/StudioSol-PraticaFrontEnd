class GameGridCell {
    constructor(cell) {
        this.cell = cell;
        this.isFilled = false;
    }

    mark(symbol) {
        if(!this.isFilled) {
            this.cell.innerHTML = symbol;
            this.isFilled = true;

            return true;
        }

        return false;
    }
}