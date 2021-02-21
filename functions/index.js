const functions = require("firebase-functions");
const admin = require('firebase-admin');
admin.initializeApp();

exports.addAdminRole = functions.https.onCall((data, context) => {
    //obtener user y añadirle custom claim (convertirlo en admin)
    //para obtener el valor se hace return de toda la promise
    return admin.auth().getUserByEmail(data.email).then(user => {
        //ya podemos sacar el user.uid correspondiente a ese email
        //con el uid le añadimos el custom claim
        return admin.auth().setCustomUserClaims(user.uid, {
            //aquí un objeto con la claim
            admin: true
        });
    }).then(() => {
        return {
            message: `Succes! ${data.email} has been made an admin`
        }
    }).catch(err => {
        return err;
    });
});