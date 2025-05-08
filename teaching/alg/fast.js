let items = [4, 1, 3, 5, 6]

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
sort(items, 0, items.length - 1)
console.log(items);