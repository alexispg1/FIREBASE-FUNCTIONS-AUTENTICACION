<template>
<div class="login-form">
    <form v-on:submit.prevent="resetPassword">
        <h2 class="text-center">Reset Password</h2>       
        <div class="form-group">
            <label class="pull-left checkbox-inline">new password</label><br/>
            <input type="password" v-model="user.password" class="form-control" placeholder="Password" required="required">
        </div>
        <div class="form-group">
            <label class="pull-left checkbox-inline">confirm password</label><br/>
            <input type="password" v-model="user.newPassword" class="form-control" placeholder="Password" required="required">
        </div>
        <div class="form-group">
            <button type="submit" class="btn btn-primary btn-block">reset password</button>
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
            user:{
                password:'',
                newPassword:'',
            },
            token:'',

        }
    },
    mounted(){
        this.start();
    },
    methods:{
        start:function(){
            console.log("estoy en el metodo areset your  password perro ");
            this.token=this.$route.params.token;
            console.log("el token del usuario es "+this.token);
        },
        resetPassword:function(){
            console.log("estoy en  reset password ");
            if(this.user.password==this.user.newPassword){
                var nuevoPass=this.user.newPassword;
                console.log("contrasenia correcta ");
                db.collection("users").where("token", "==",this.token).get()
                .then(function(querySnapshot){
                    querySnapshot.forEach(function(doc) {
                        console.log(doc.id, " => ", doc.data());
                        console.log("el id es "+doc.id+" status "+doc.data().status+" email "+doc.data().email);     
                        var coleccion = db.collection("users").doc(doc.id);
                        coleccion.update({
                            reset:'1',
                            password:nuevoPass,
                        })
                        .then(function() {
                            alert("contrsenia cambiada correctamente");
                            console.log("Document successfully updated!");
                            router.push("/login");
                        })
                        .catch(function(error){
                            console.error("Error updating document: ", error);
                        })
                    });
                }).catch(function(error) {
                    console.log("Error getting documents: ", error);
                });

            }else{
                console.log("las contrasenias no coinciden ");
                alert("las contrasenias no coinciden");
            }
        },

    }  
}
</script>