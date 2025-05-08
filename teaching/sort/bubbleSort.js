const sort = (arr) => {
    if (arr.length <= 1) {
        return arr;
    }


    for (let i = 0; i < arr.length; i++) {
        let currentSortValue = arr[i]
        for (let j = i + 1; j < arr.length; j++) {
            const valJ = arr[j]
            if (currentSortValue > valJ) {
                arr[j] = currentSortValue
                arr[i] = valJ
                currentSortValue = valJ
            }
        }
    }

    return arr
}

console.log(sort([3,1,2,6,5,4]))