<template>
<div class="login-form">
    <form v-on:submit.prevent>
        <h2 class="text-center">Log in</h2>       
        <div class="form-group">
             <input type="email" v-model="user.email" class="form-control" placeholder="email adress" required="required">
        </div>
        <div class="form-group">
            <input type="password" v-model="user.password" class="form-control" placeholder="Password" required="required">
        </div>
        <div class="form-group">
            <button type="submit" v-on:click="login" class="btn btn-primary btn-block">Log in</button>
        </div>
        <div class="clearfix">
            <label class="pull-left checkbox-inline"></label><br/>
            <a href="/forgotPassword" class="pull-right">Forgot Password?</a>
        </div>        
    </form>
    <p class="text-center"><a href="/register">Create an Account</a></p>
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
                email:'',
                password:'',
            }          
        }
    },
    /*mounted(){
        console.log("el email es "+this.user.email);
    },*/
    methods:{
        login:function(){
            //console.log("email "+this.user.email);
            //console.log("password "+this.user.password);
            //console.log("estoy clickiando")
            var ema=this.user.email;
            var pass=this.user.password;
            db.collection("users").get().
            then(function(querySnapshot) {
                querySnapshot.forEach(function(doc) {
                    console.log(doc.id, " => ", doc.data());
                    if(doc.data().status=="activo"){
                        if(doc.data().email==ema&&doc.data().password==pass){  
                            if(doc.data().twosstep=="no"){
                                router.push({name: 'panel'}); 
                                localStorage.setItem('email', JSON.stringify(doc.data().email)); 
                                localStorage.setItem('name', JSON.stringify(doc.data().name)); 
                                localStorage.setItem('twosstep', JSON.stringify(doc.data().twosstep)); 
                                localStorage.setItem('phone', JSON.stringify(doc.data().phone)); 
                            }
                            if(doc.data().twosstep=="si"){
                                console.log("ir a dos pasos ");
                                var ramdom =Math.floor(Math.random() * 1000) +3000;
                                var coleccion = db.collection("users").doc(doc.id);
                                coleccion.update({
                                    numero:ramdom,
                                }).then(function() {
                                    console.log("Document successfully updated!");
                                    localStorage.setItem('email', JSON.stringify(doc.data().email));
                                    router.push({name: 'dosPasos'});
                                    alert("verificacion en su correo ");
                                }).catch(function(error) {
                                    console.error("Error updating document: ", error);
                                })                                
                            }
                        }else{
                            alert("contraseña o password incorrectos");
                        }  
                    }else{
                      console.log("datos no encotrados ");
                    }
                });
            });

        },
    }   
}
</script>

<style >
.login-form {
		width: 500px;
    	margin: 100px auto;
	}
    .login-form form {
    	margin-bottom: 15px;
        background: #f7f7f7;
        box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.3);
        padding: 30px;
    }
    .login-form h2 {
        margin: 0 0 15px;
    }
    .form-control, .btn {
        min-height: 38px;
        border-radius: 2px;
    }
    .btn {        
        font-size: 15px;
        font-weight: bold;
    }

</style>