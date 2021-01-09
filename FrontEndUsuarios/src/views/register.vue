<template>
    <div class="login-form">
    <form v-on:submit.prevent="Register">
        <h2 class="text-center">register</h2>       
        <div class="form-group">
            <label class="pull-left checkbox-inline">user name</label><br/>
            <input type="tex" v-model="user.name" class="form-control" placeholder="User name" required="required">
        </div>
        <div class="form-group">
            <label class="pull-left checkbox-inline">phone (961-152-9996)</label><br/>
            <input type="tel" v-model="user.phone" class="form-control" placeholder="number phone " pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"required>
        </div>
        <div class="form-group">
             <label class="pull-left checkbox-inline">email</label><br/>
            <input type="email" v-model="user.email" class="form-control" placeholder="email adress" required="required">
        </div>
        <div class="form-group">
            <label class="pull-left checkbox-inline">password</label><br/>
            <input type="password" v-model="user.password" class="form-control" placeholder="pass" required="required">
        </div>
        <div class="form-group">
            <button type="submit" class="btn btn-primary btn-block">register</button>
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

export default{

    data(){
        return{
            user:{
                name:'',
                phone:'',
                email:'',
                password:'',
            },
        }
    },
    methods:{
        Register:function(){
            console.log("el nombre es "+this.user.name);
            console.log("el email es "+this.user.email);
            console.log("el pasword es "+this.user.password);
            var porciones = this.user.phone.split('-');
            var tel=porciones[0]+porciones[1]+porciones[2];
            var ramdom =Math.floor(Math.random() * 1000) +3000;
            var partEmail=this.user.email.split('@');
            var str='x';
            var tamanio=partEmail[0].length;
            for(var i=0;i<6;i++){
                var letra =Math.floor(Math.random() *tamanio-1)+1;
                var caracter=partEmail[0].charAt(letra);
                str=str+caracter;
            }
            var numero=ramdom;
            var ph=tel.substring(4,7);
            var token=numero+str+ph;
            console.log("token "+token);
           
            db.collection("users").add({
                name: this.user.name,
                phone:tel,
                email:this.user.email,
                password:this.user.password,
                status:'inactivo',
                token:token,
                twosstep:'no',
                reset:'0',
                numero:'120',
            }).then(function(docRef) {
                console.log("Document written with ID: ", docRef.id);
                router.push("/login");
            }).catch(function(error) {
                console.error("Error adding document: ", error);
                alert("a ocurrido un error");
            });
        } 

        
    }
     
}

</script>

<style >
.login-form {
		width: 500px;
    	margin: 60px auto;
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
