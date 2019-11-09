class Player {
    constructor(playerName, symbol, referenceColor = '#015E8A') {
        this.name = playerName;
        this.symbol = symbol;
        this.referenceColor = referenceColor;
        this.score = 0;
        this.statistics = new PlayerStatistics(this);
    }

    increaseScore() {
        this.score += 1;
    }
}