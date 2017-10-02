const moment = require('moment');

const dataAtual = new Date();

const dataFormatada = moment(dataAtual).format('DD/MM/YYYY HH:mm:ss');

console.log('Data atual:', dataFormatada);