<template>
    <div class="login-form">
        <form v-on:submit.prevent>
            <div class="form-group">
                <button type="submit" v-on:click="findUser" class="btn btn-primary btn-block">confirm account</button>
            </div>
            <div class="clearfix">
                <a href="/login" class="pull-right">Go Back</a>
            </div>        
        </form>
    </div>
</template>


<script>
import firebase from 'firebase';
import db from '../main.ts';
import router from '../router';
export default {
    data(){
        return{
            token:'',
            id:'',
        }
      
    },
    mounted(){
        this.start();
    },
    methods:{
        start(){
            console.log("estoy en el metodo activar tu cuenta perro");
            this.token=this.$route.params.token;
            console.log("eltoken del usuario es "+this.token);
            var number =this.token.substring(this.token.length-10,this.token.length);
            console.log("numero telefonico "+number);
            //3268alexisperezgomez29611529961
            //encryptando Datos
            //var l1=this.CryptoJS.AES.encrypt(this.token,this.token);
            //console.log("encriptado perro "+" l1 "+l1);
            /*desencryptando data
            var bytes  =this.CryptoJS.AES.decrypt(this.token.toString(),this.token);
            var plaintext = bytes.toString(this.CryptoJS.enc.Utf8);
            console.log("palintext "+plaintext);*/
           //this.findUser();
        },
        findUser:function(){
            console.log("estoy clikiando")
            db.collection("users").where("token", "==",this.token).get()
            .then(function(querySnapshot){
                querySnapshot.forEach(function(doc) {
                console.log(doc.id, " => ", doc.data());
                console.log("el id es "+doc.id+" status "+doc.data().status+" email "+doc.data().email);     
                var coleccion = db.collection("users").doc(doc.id);
                coleccion.update({
                    status:'activo',
                    }).then(function() {
                        console.log("Document successfully updated!");
                        router.push("/login");
                    }).catch(function(error) {
                        console.error("Error updating document: ", error);
                        alert("a ocurrido un error ");
                    })
                });
                
            }).catch(function(error) {
                console.log("Error getting documents: ", error);
            });
        },

    }
    
}

</script>

