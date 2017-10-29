import jwt from "jsonwebtoken";

// Substitua este valor por sua chave segura
const SECRET_KEY = "chave secreta que assina e valida o token de autenticação";

/**
 * Middleware que verifica a validade e decodifica o token de autenticação presente no header 'x-access-token'.
 * 
 * @param {request} req
 * @param {response} res
 * @param {next} next
 */
export const checkTokenMiddleware = (req, res, next) => {
    const token = req.headers["x-access-token"] || req.cookies["x-access-token"];
    checkToken(token)
        .then(decoded => {
            req.decodedToken = decoded;
            next();
        }).catch(ex => {
            console.error('Não foi possível decodificar o token:', token, ex);
            res.status(401).send();
        });
}

/**
 * Valida a autenticidade e decodifica o token.
 * 
 * @param {string} token
 * @return {Promise} 
 */
export const checkToken = (token) => {
    return new Promise((resolve, reject) => {
        jwt.verify(token, SECRET_KEY, (err, decoded) => {
            if (err) {
                reject(err);
                return;
            }
            resolve(decoded);
        });
    })
}

/**
 * Gera o token de autenticação para o usuário.
 * 
 * @param {object} usuario objeto plano contendo os dados do usuário.
 * @return {string} Token de autenticação.
 */
export const generateToken = (usuario) => {
    delete usuario.senha;
    
    let token = jwt.sign(usuario, SECRET_KEY, { encoding: 'UTF8' });

    return token;
}
