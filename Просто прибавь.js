function justAddOne(array, number) {
    if (!Array.isArray(array) || !Number.isInteger(number) || number <= 0) {
        return null;
    }

    let acc = number;
    for (let i = 0; i < array.length; i++) {
        const item = array[i];
        if (!Number.isInteger(item) || item < 0 || item > 9) {
            return null;
        }
        acc += item * Math.pow(10, array.length - i - 1);
    }

    return String(acc).split('');
}
