// Dentre as principais características da função de flecha em relação às funções
// tradicionais, está o escopo da variável 'this'.
// Na função de felecha o 'this' aponta para o escopo onde a função foi declarada.
// Enquanto na função tradicionais, apontada para a o objetivo que chamou a função.

function Matematica() {

    this.somar = (num1, num2) => {
        return num1 + num2;
    }

    // Para 'this.somar' funcionar, a função 'calcular' precisa ser de flecha.
    this.calcular = (num1, num2) => {
        return this.somar(num1, num2);
    }

}

function Controller() {
    this.executar = function (funcao) {
        return funcao(1, 3);
    }
}

const controller = new Controller();
const matematica = new Matematica();
const resultado = controller.executar(matematica.calcular);

console.log(resultado);
