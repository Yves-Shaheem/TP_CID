require('dotenv').config();

import express from 'express';
import userRoutes from './routes/v1/user.route';
import productRoutes from './routes/v1/product.route';
import authRoutes from './routes/v1/auth.route';
import userRoutesV2 from './routes/v2/user.route';
import productRoutesV2 from './routes/v2/product.route';
import authRoutesV2 from './routes/v2/auth.route';
import { errorMiddleware } from './middlewares/error.middleware';
import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import { config } from './config/config';
import session from 'express-session';
import { loadCertificate } from './middlewares/certificat.middleware';
import {DB_connection, fetchDATA}  from './data/db.data'
import https from 'https';


const app = express();
app.use(express.json());

// ICI que je fetch les données
fetchDATA()
// ICI que je fais la connexion a la base de donné
console.log(config.databaseUrl)
DB_connection(config.databaseUrl);

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
  apis: ['./src/routes/v1/*.route.ts','./src/routes/v2/*.route.ts'], // Fichier où les routes de l'API sont définies
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

app.use('/api', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

// Charger les certificats
let certificatOptions = loadCertificate();


// Route de base
app.get('/', (req, res) => {
    res.redirect('/api');
});

app.use('/v1', userRoutes);
app.use('/v1', productRoutes);
app.use('/v1', authRoutes);

app.use('/v2', userRoutesV2);
app.use('/v2', productRoutesV2);
app.use('/v2', authRoutesV2);

app.use(errorMiddleware);

const httpApp = https.createServer(certificatOptions, app);

export default httpApp;