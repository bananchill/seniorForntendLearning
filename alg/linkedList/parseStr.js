const parseStr = (str) => {
    let newStrArr = []

    const lengthStr = str.length

    for (let i = 0; i < lengthStr; i++) {
        if (str[i] === '#') {
            newStrArr.pop()
        } else {
            newStrArr.push(str[i]);
        }
    }

    return newStrArr.join('');
}

function solution(firstStr, secondStr) {

    const firstParseStr = parseStr(firstStr)
    const secondParseStr = parseStr(secondStr)

    return firstParseStr === secondParseStr
}

console.log(solution('ab#c', 'ab#c')); // true
// обе строки в итоге преобразуются в 'ac'

console.log(solution('ab##', 'c#d#')); // true
// обе строки преобразуются в пустую строку ''

console.log(solution('a#c', 'b')); // false
// первая строка будет равна 'c', а вторая 'b'