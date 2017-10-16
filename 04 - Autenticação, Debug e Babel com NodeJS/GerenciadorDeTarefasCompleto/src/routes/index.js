import fs from 'fs';
import path from 'path';
import { Application } from 'express';
const debug = require('debug')('http:routes');

const basename = path.basename(module.filename);

/**
 * Faz a leutira automática de todos os arquivos de dentro do diretório 'routes'.
 * @param {Application} app 
 */
const loadRoutes = (app) =>
    fs.readdirSync(__dirname)
        .filter((file) => {
            return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
        })
        .forEach((file) => {
            const routeFile = path.join(__dirname, file);
            const route = require(routeFile).default || require(routeFile);
            debug("Loading: " + route.path);
            app.use(route.path, route.router);
        });

export default loadRoutes;