const mergeSortImpl = (arr, buffer, startInd, length) => {
    if (startInd < length) {
        const mediana = Math.floor((startInd + length) / 2);
        mergeSortImpl(arr, buffer, startInd, mediana);
        mergeSortImpl(arr, buffer, mediana + 1, length);

        let k = startInd;
        for (let i = startInd, j = mediana + 1; i <= mediana || j <= length;) {
            if (j > length || (i <= mediana && arr[i] < arr[j])) {
                buffer[k] = arr[i];
                ++i;
            } else {
                buffer[k] = arr[j];
                ++j;
            }
            ++k;
        }
        for (let i = startInd; i <= length; ++i) {
            console.log(i, buffer[i])
                arr[i] = buffer[i];
        }
    }

    return arr;
}

const sort = (arr) => {
    if (arr.length <= 1) {
        return arr;
    }

    return mergeSortImpl(arr, [], 0, arr.length - 1);
}

console.log(sort([3, 1, 2, 6, 5, 4]))