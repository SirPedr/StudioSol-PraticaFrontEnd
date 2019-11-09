class ArrayUtil {
    static areElementsIdenthical(array) {
        const baseElement = array[0];

        return array.every((element) => element === baseElement);
    }
}