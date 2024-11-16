const mongoose = require('mongoose');
export function DB_connection(uri:String) {
    try {
      mongoose.connect(uri);
      const db = mongoose.connection;
      db.on('error', console.error.bind(console, 'Erreur de connexion à MongoDB:'));
      db.once('open', () => {
        console.log('Connexion à MongoDB réussie');
      });
    } catch(error){
        console.log(error);
    }
  }