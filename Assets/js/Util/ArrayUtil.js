class ArrayUtil {
    static areElementsIdenthical(array) {
        const baseElement = array[0];

        return array.every((element) => element === baseElement);
    }

    static getElementsAverage(array) { 
        const numbersInGivenArray = array.filter(element => !isNaN(element)),
              elementsSomatory = numbersInGivenArray                                
                                .reduce((element, somatory) => element + somatory, 0);
              

        return elementsSomatory / numbersInGivenArray.length;
    }
}