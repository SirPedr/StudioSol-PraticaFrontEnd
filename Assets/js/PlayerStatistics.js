class PlayerStatistics {
    constructor(player) {
        this.player = player;
        this.timeSpentWithMoves = [];
        this.totalTimeSpent = 0;
        this.initialMoveTime = 0;
        this.finalMoveTime = 0;
        this.averageMoveTimeSpent = 0;
        this.score = 0;
    }

    increaseScore() {
        this.score += 1;
    }
    
    startMoveTimeCount() {
        this.initialMoveTime = Date.now();
    }

    stopMoveTimeCount() {
        this.finalMoveTime = Date.now();

        const timeSpentWithMove = (this.finalMoveTime - this.initialMoveTime) / 1000;

        this.timeSpentWithMoves.push(timeSpentWithMove);
        this.calculateAverageMoveTimeSpent();
        this.calculateTotalTimeSpentWithMoves();
    }

    calculateAverageMoveTimeSpent() {
        this.averageMoveTimeSpent = ArrayUtil.getElementsAverage(this.timeSpentWithMoves);
    }

    calculateTotalTimeSpentWithMoves() {
        this.totalTimeSpent = this.timeSpentWithMoves
                              .reduce((moveTime, totalTime) => moveTime + totalTime, 0);
    }
}