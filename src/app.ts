require('dotenv').config();

import express, { Request, Response, NextFunction } from 'express';
import userRoutes from './routes/user.route';
import productRoutes from './routes/product.route';
import { errorMiddleware } from './middlewares/error.middleware';
import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import { config } from './config/config';
import session from 'express-session';
import { loadCertificate } from './middlewares/certificat.middleware';
import fetchAPI  from './data/db.data'
import path from 'path';
import redis from "redis";
import https from 'https';

const app = express();
app.use(express.json());
fetchAPI()
// interface pour le nombre de vue d'une page
declare module 'express-session' {
    interface SessionData {
        views: number;
    }
}

// les options de sawgger
const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Inventory API',
      version: '1.0.0',
      description: 'A simple API to manage inventory',
    },
  },
  apis: ['./src/routes/*.route.ts'], // Fichier où les routes de l'API sont définies
};

// Middleware de session avec la clé secrète provenant des variables de configuration
app.use(session({
    secret: config.sessionSecret,
    resave: false,
    saveUninitialized: false,
    cookie: { secure: config.isProduction} // Utiliser des cookies sécurisés en production
  }));

// Generer la doc swagger
const swaggerDocs = swaggerJsdoc(swaggerOptions);

app.use('/v1', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

// Charger les certificats
let certificatOptions = loadCertificate();


// Route de base
app.get('/', (req, res) => {
    res.send('Hello, Express avec TypeScript et Configuration!');
  });

// view engine setup
// app.set('views', path.join(__dirname, 'views'));
// app.set('view engine', 'jade');
// app.get('/visits', (req, res) => {
//     if (req.session.views) {
//       req.session.views++;
//       console.log("Views:" + req.session.views);
//       res.send(`Nombre de visites : ${req.session.views}`);
//     } else {
//       req.session.views = 1;
//       console.log("Views:" + req.session.views); 
//       res.send('Bienvenue pour votre première visite !');
//     }
//   });

app.use('/api', userRoutes);
app.use('/api', productRoutes);

app.use(errorMiddleware);

app.get('/cause-error', (req, res) => {
    throw new Error('Erreur simulée!');
});
  

const httpApp = https.createServer(certificatOptions, app);

export default httpApp;