/**
 * Реализуйте функцию, которая вычисляет наибольший общий делитель двух чисел (greatest common divisor). Наибольшим общим делителем двух чисел называется наибольшее число, на которое оба числа делятся без остатка. Для этой задачи подойдет алгоритм Евклида.
 *
 * Алгоритм Евклида
 * Пусть (a, b) — функция вычисления наибольшего общего делителя чисел a и b. Для неё верны утверждения:
 *
 * (a, a) = a - НОД числа а равен самому числу a
 * (a, b) = (a - b, b), при условии a > b - НОД чисел a и b равен НОДУ их разницы (a - b) и меньшего из них (b)
 * Функция должна остановиться, когда оба её параметра равны. Если они не равны, значит, один из них гарантированно больше другого. Для определённости пусть a > b, тогда функция рекурсивно вызывает себя с параметрами a - b и b.
 *
 * */

const algEvk = (a, b) => {
    if (a === b) {
        return a
    }
    if (a < b) {
        return algEvk(b, a)
    }

    return algEvk(a - b, b);
}

function solution(a, b) {
    return algEvk(Math.abs(a), Math.abs(b));
}

console.log(solution(38, 28)) // => 2
console.log(solution(129, 90)) // => 3
console.log(solution(-12, -6)) // => 3