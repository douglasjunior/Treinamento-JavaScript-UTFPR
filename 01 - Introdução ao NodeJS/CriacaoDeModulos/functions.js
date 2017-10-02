// Em JavaScript, funções são valores, assim como os tipos primitivos, ou qualquer outro objeto.

function somar(num1, num2) {
    return num1 + num2;
}

function multiplicar(num1, num2) {
    return num1 * num2;
}

function calcular(operacao, num1, num2) {
    return operacao(num1, num2);
}

console.log(calcular(somar, 5, 6));
console.log(calcular(multiplicar, 5, 6));