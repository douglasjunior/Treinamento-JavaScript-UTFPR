import express from 'express';
import { ValidatorFunctionRegExp } from 'express-validator';
import moment from 'moment';

/**
 * Cria um middleware para validação do conteúdo da requisição baseado em esquema.
 * 
 * @param {ValidatorFunctionRegExp} schema
 * @return {express.RequestHandler} middleware
 */
export const createValidator = (schema) => (req, res, next) => {
    req.check(schema);
    req.getValidationResult()
        .then(result => {
            if (result.isEmpty() !== true) {
                res.status(422).json(result.array());
                return;
            }
            next();
        })
        .catch(ex => {
            next(ex);
        });
}

/**
 * Define validadores customizados.
 */
export const customValidators = {
    isDate: function (strDate, format) {
        return moment(strDate, format, true).isValid();
    },
}

