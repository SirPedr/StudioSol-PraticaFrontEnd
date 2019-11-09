class DateFormatUtil {
    static secondsToDateString(seconds) {

        if (isNaN(seconds) || seconds < 0) {
            return "0s";
        }

        let minutes = Math.floor(seconds / 60),
            hours = Math.floor(minutes / 60);

        seconds -= Math.floor(minutes * 60);
        minutes -= Math.floor(hours * 60);

        return (hours > 0 ? hours + "h" : '')
            + (minutes > 0 ? minutes + "m" : '')
            + seconds + "s";
    }
}