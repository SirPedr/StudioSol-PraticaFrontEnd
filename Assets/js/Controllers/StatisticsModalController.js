class StatisticsModalController {
    constructor() {
        this.statisticModal = document.getElementById('statisticsModal');
        this.statisticDOMElements = document.querySelectorAll('.statistics');
        this.timeStatistics = ["averageMoveTimeSpent", "totalTimeSpent", "totalGameTime"]
    }

    updateGameStatistics(newStatistics) {
        this.statisticDOMElements.forEach(statisticItem => {
            const referencedPlayer = statisticItem.dataset.referencedPlayer,
                  playerAttribute = statisticItem.dataset.statisticProperty;

            let statisticValue;

            if(referencedPlayer) {
                statisticValue = newStatistics[referencedPlayer][playerAttribute]  
                                || newStatistics[referencedPlayer].statistics[playerAttribute];
                statisticItem.style.color = newStatistics[referencedPlayer].referenceColor;
            } else {
                statisticValue = newStatistics[playerAttribute];
            }

            if(this.timeStatistics.includes(playerAttribute)) {
                statisticValue = DateFormatUtil.secondsToDateString(statisticValue);
            }

            statisticItem.innerHTML = statisticValue;
        })
    }

    openStatisticsModal() {
        this.statisticModal.style.display = 'inline';
    }

    closeStatisticsModal() {
        this.statisticModal.style.display = 'none';
    }
}