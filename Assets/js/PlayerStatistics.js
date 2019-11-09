class PlayerStatistics {
    constructor(player) {
        this.player = player;
        this.totalMovesAmount = 0;
        this.timeSpentWithMoves = [];
        this.initialMoveTime = 0;
        this.finalMoveTime = 0;
    }

    increaseMovesAmount() {
        this.totalMovesAmount += 1;
    }

    startMoveTimeCount() {
        this.initialMoveTime = Date.now();
    }

    stopMoveTimeCount() {
        this.finalMoveTime = Date.now();
        
        const timeSpentWithMove = (this.finalMoveTime - this.initialMoveTime) / 1000;

        this.timeSpentWithMoves.push(timeSpentWithMove);
        this.increaseMovesAmount();
    }
}