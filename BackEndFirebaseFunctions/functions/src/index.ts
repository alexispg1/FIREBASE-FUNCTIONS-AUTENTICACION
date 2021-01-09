const functions = require('firebase-functions');
const nodemailer = require('nodemailer'); 

const accountSid = 'AC306b55b6d8abab1f13d7fb25dcf1443d';
const authToken = 'bcbc1e37d75690bf8d8ec97661c199c8';
const client = require('twilio')(accountSid, authToken);


var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: '153224@ids.upchiapas.edu.mx',
    pass: 'leon1994'
  }
});
// cuando me registro envia correo para activar la cuenta 
exports.createUser = functions.firestore
    .document('users/{userId}')
    .onCreate((snap:any, context:any) => {
      const email = snap.data().email;
      const name=snap.data().name;
      const token=snap.data().token;
      console.log("email "+email);
      console.log("token "+token);
      console.log("name "+name);

      var mailOptions = {
       from: '153224@ids.upchiapas.edu.mx',
       to: email,
       subject: 'gracias por registrarse',
       text: 'confirme su cuenta',
       html: `<h1> confirma tu cuenta </h1>
       <p>link</p>
       <a href="http://localhost:8080/activateAccount/${token}">http://confirmar/cuenta</a>`,
      }; 
      transporter.sendMail(mailOptions, function(error: any, info: { response: any; }){
        if (error) {
          console.log(error);
        } else {
          console.log('Email sent: ' + info.response);
        }
      });
     
      
    });
 
 //metodo cuando actualizo el status de inactivo a activo   
exports.updateUser = functions.firestore
    .document('users/{userId}')
    .onUpdate((change:any, context:any) => {
      const previousValue = change.before.data();
      const newValue = change.after.data();
      const name = newValue.name;
      const email=newValue.email;
      console.log("nombre del usuario "+name);
      console.log("email del usuario  "+email);
      var statusAnterior=previousValue.status;
      var statusDespues=newValue.status;
      var numero1=previousValue.numero;
      var numero2=newValue.numero;
      var phone=newValue.phone
      if(numero1!=numero2){
        console.log("codigo de verificacion anterior "+numero1);
        console.log("codigo de verificacion ahora "+numero2);
        console.log("phone "+phone);
        //sendMessage(numero2,phone);
        var emailx=newValue.email;
        var token=newValue.token;
        sendEmailTwoPath(emailx,token,numero2);
      }
      if(statusAnterior=="inactivo"&&statusDespues=="activo"){
        console.log("status anterior "+statusAnterior);
        console.log("status depues "+statusDespues);
        sendEmail(email);
      }
      var reset=newValue.reset;
      if(reset=="1"){
        console.log("reset "+reset);
        var afterPassword=previousValue.password;
        var passNew=newValue.password;
        console.log("password anterior "+afterPassword);
        console.log("password new "+passNew);
      }
      
    });  
// metodo cuando actualizo el status de inactivo a activo 
function sendEmail(email:string){
  var mailOptions = {
    from: '153224@ids.upchiapas.edu.mx',
    to:email,
    subject: 'Su cuenta ha sido confirmado ',
    text: 'cuenta confirmada',
   }; 
   transporter.sendMail(mailOptions, function(error: any, info: { response: any; }){
     if (error) {
       console.log(error);
     } else {
       console.log('Email sent: ' + info.response);
     }
   });
      
} 

// Cuando se me olvida la contrasenia creo un history
exports.createHistory= functions.firestore
    .document('history/{historyId}')
    .onCreate((snap:any, context:any) => {
      const name=snap.data().name;
      const email = snap.data().email;
      const token=snap.data().token;
      console.log("name "+name);
      console.log("email "+email);
      console.log("token "+token);
      sendEmailHistory(email,token);
    });

// Cuando se me olvida la contrasenia creo un history
function sendEmailHistory(email:string,token:string){
  console.log("email "+email);
  console.log("token "+token);
  var mailOptions = {
    from: '153224@ids.upchiapas.edu.mx',
    to: email,
    subject: 'has olvidado tu contrasenia',
    text: 'cambiar contrasenia',
    html: `<h1> cambia tu contrasenia </h1>
    <p>link</p>
    <a href="http://localhost:8080/resetPassword/${token}">http://resetPassword/</a>`,
  }; 
  transporter.sendMail(mailOptions, function(error: any, info: { response: any; }){
     if (error) {
       console.log(error);
     } else {
       console.log('Email sent: ' + info.response);
     }
  });
      
} 

/*function sendMessage(numero:string,phone:string){ 
  console.log("numero denro del metodo msg "+numero+" phone dentro del metodo "+phone);
  var tel="+52 1 "+phone;
  console.log("telefono al que enviara el mensaje "+tel);
  client.messages
  .create({
     body: 'This is the ship that made the Kessel Run in fourteen parsecs?',
     from: '+12015845779',
     to: '+52 1 9614465502',
  
   })
  .then((message: { sid: any; }) => console.log(message.sid));
}*/

function sendEmailTwoPath(email:string,token:string,numero:string){
  console.log("email two paht  "+email);
  console.log("token two path  "+token);
  console.log("numero two path "+numero);
  var mailOptions = {
    from: '153224@ids.upchiapas.edu.mx',
    to: email,
    subject: 'codigo de verificacion ',
    text: 'tu codigo de verificacion',
    html: `<h1> ${numero} </h1>`,
  }; 
  transporter.sendMail(mailOptions, function(error: any, info: { response: any; }){
     if (error) {
       console.log(error);
     } else {
       console.log('Email sent: ' + info.response);
     }
  });
      
} 

     
  