import InputForm from '../components/InputForm';

export const validateEmail = (value) => {
    const emailRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return emailRegex.test(value);
}

export const validateSenha = (value) => {
    return !!value && value.length >= 6 && value.length <= 8;
}

export const checkFormIsValid = (refs) => {
    return Object.keys(refs)
        .map(ref => refs[ref])
        .filter(element => element instanceof InputForm)
        .reduce(((previousValid, input) => {
            return input.isValid() && previousValid;
        }), true)
}