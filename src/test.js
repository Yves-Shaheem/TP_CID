require('dotenv').config();

import mongoose from 'mongoose';


const uri = config.databaseUrl;
export function connection() {
    try {
      mongoose.connect(uri, {
        useNewUrlParser: true,
        useUnifiedTopology: true
      });
      const db = mongoose.connection;
      db.on('error', console.error.bind(console, 'Erreur de connexion à MongoDB:'));
      db.once('open', () => {
        console.log('Connexion à MongoDB réussie');
      });
    } catch(error){
        console.log(error);
    }
  }
  connection() 