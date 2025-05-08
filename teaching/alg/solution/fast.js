const partition = (items, left, right, pivot) => {
    while (true) {
        while (items[left] < pivot) {
            left += 1;
        }

        while (items[right] > pivot) {
            right -= 1;
        }

        if (left >= right) {
            return right + 1;
        }

        const temporary = items[left];
        items[left] = items[right];
        items[right] = temporary;

        left += 1;
        right -= 1;
    }
};

const sort = (items, left, right) => {
    const length = right - left + 1;

    if (length < 2) {
        return;
    }

    const pivot = items[left];

    const splitIndex = partition(items, left, right, pivot);
    sort(items, left, splitIndex - 1);
    sort(items, splitIndex, right);
};

const quickSort = (items, directionSort = "asc") => {
    if(items.length <= 1) {
        return items;
    }
    const newMass = [...items];

    sort(newMass, 0, newMass.length - 1);

    return directionSort === "asc" ? newMass : newMass.reverse();
}

const items = [10, 20, 0, -1];

console.log(quickSort(items));
console.log(quickSort([]));
console.log(quickSort(items, 'desc'));
