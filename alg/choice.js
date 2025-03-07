const selectionSort = (items) => {
    for (let i = 0; i < items.length - 1; i += 1) {
        let indexMin = i;
        for (let j = i + 1; j < items.length; j += 1) {
            if (items[j] < items[indexMin]) {
                indexMin = j;
            }
        }

        const temporary = items[i];
        items[i] = items[indexMin];
        items[indexMin] = temporary;
    }
};