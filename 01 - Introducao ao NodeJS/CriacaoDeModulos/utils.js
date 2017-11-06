
function maiusculo(texto) {
    return texto.toUpperCase();
}

function minusculo(texto) {
    return texto.toLowerCase();
}

// Utilizamos o 'module.exports' para exportar (tornar acessível externamente) as funções e objetos desejados.
module.exports = {
    maiusculo,
    minusculo
}
