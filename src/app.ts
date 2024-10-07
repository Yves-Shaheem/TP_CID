require('dotenv').config();

import express, { Request, Response, NextFunction } from 'express';
import userRoutes from './routes/user.route';
import productRoutes from './routes/product.route';
import authRoutes from './routes/auth.route';
import { errorMiddleware } from './middlewares/error.middleware';
import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import { config } from './config/config';
import session from 'express-session';
import { loadCertificate } from './middlewares/certificat.middleware';
import fetchDATA  from './data/db.data'
import https from 'https';
import { verifyToken } from './middlewares/auth.middleware';

const app = express();
app.use(express.json());
// ICI que je fetch les données
fetchDATA()
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
      version: '1.1.0',
      description: 'A simple API to manage inventory',
    },
    components: {
        securitySchemes:{
            BearerAuth:{
                type: 'http',
                scheme: 'bearer',
                bearerFormat: 'JWT'
            }
        }
    },
    security: [{
        BearerAuth: []
    }]
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
    res.redirect('/v1');
  });
app.get('/admin', verifyToken, (req, res) => {
    res.send('Bienvenue, administrateur !');
});


app.use('/api', userRoutes);
app.use('/api', productRoutes);
app.use('/api', authRoutes);

app.use(errorMiddleware);

const httpApp = https.createServer(certificatOptions, app);

export default httpApp;