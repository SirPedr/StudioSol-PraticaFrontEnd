class RandomUtil {
    static getRandomIntInRange(minValue, maxValue) {
        return Math.floor(Math.random() * (maxValue - minValue) + minValue);
    } 
}