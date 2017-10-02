const animais = [{
    especie: 'cachorro',
    raca: 'labrador'
}, {
    especie: 'cachorro',
    raca: 'pastor alemão'
}, {
    especie: 'gato',
    raca: 'siames'
}, {
    especie: 'gato',
    raca: 'persia'
}];

const isCachorro = animal =>
    animal.especie === 'cachorro';

const cachorros = animais.filter(isCachorro);

// const cachorros = [];
// for (let i = 0; i < animais.length; i++) {
//     if (animais[i].especie === 'cachorro')
//         cachorros.push(animais[i]);
// }

console.log('Cachorros:', cachorros);

const somenteRacap = animal => animal.raca;

const racas = animais.map(somenteRacap);

// const racas = [];
// for (let i = 0; i < animais.length; i++) {
//     racas.push(animais[i].raca);
// }

console.log('Raças:', racas);

const racasCachorro = animais
    .filter(isCachorro)
    .map(somenteRacap);

console.log('Raças de cachorros:', racasCachorro);
