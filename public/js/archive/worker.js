const sploom = require('./splom.js')

self.onmessage = function(e) {
   console.log('Message reçu:' + e.data[3]); //Affiche param1
   //Traitement lourd nécessitant l'appel à thread

   let resultat = sploom.createSplom(JSON.parse(e.data[0]),JSON.parse(e.data[1]), JSON.parse(e.data[2]) ); //Resultat de notre calcul coûteux
   postMessage(resultat); //Envoie la réponse à notre thread principal
   if(e.data[3] == 'stop'){ 
      /*
       * Termine le worker, il ne traitera plus de nouveaux messages. 
       * Si le worker a pour but d'être utilisé plusieurs fois, il vaut mieux le garder ouvert.
       */
      close();
   }
}