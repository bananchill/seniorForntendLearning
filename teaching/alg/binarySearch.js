const solution = (phoneBook, name) => {
    if (phoneBook.length === 0) {
        return 'Phonebook is empty!'
    }

    let start = 0;
    let length = phoneBook.length - 1;


    while (start <= length) {
        const middle = Math.floor((start + length) / 2)
        const user = phoneBook[middle]


        if (name === user.name) {
            return user.number;
        }

        if(name > user.name) {
            start = middle + 1;
        } else {
            length = middle - 1;
        }
    }

    return 'Name not found!'
}

const phonebook = [
    {name: 'Alex Bowman', number: '48-2002'},
    {name: 'Aric Almirola', number: '10-1001'},
    {name: 'Bubba Wallace', number: '23-1111'},
];

console.log(solution(phonebook, 'Alex Bowman')); // '48-2002'
console.log(solution(phonebook, 'None'))
console.log(solution([], 'Alex Bowman')) // 'Phonebook is empty!'

