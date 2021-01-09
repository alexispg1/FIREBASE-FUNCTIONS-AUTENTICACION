<template>
<div class="container-fluid well span6">
	<div class="row-fluid">
        <div class="span2" >
		    <img src="https://secure.gravatar.com/avatar/de9b11d0f9c0569ba917393ed5e5b3ab?s=140&r=g&d=mm" class="img-circle">
        </div>
        
        <div class="span8">
            <h3>user name : {{name}}</h3>
            <h6>email : {{email}}</h6>
            <h6>tel : {{tel}}</h6>
            <h6>two step: {{two_step}} </h6>
        </div>
        
        <div class="span2">
            <div class="btn-group">
               
              <button type="button" v-on:click="activateTwoStep" class="btn btn-primary">activar dos pasos </button> 
              <button type="button" v-on:click="deActivateTwoStep" class="btn btn-danger">desactivar dos pasos</button>
               
            </div>
        </div>
</div>
</div>
</template>


<script>
import firebase from 'firebase';
import db from '../main.ts';
import router from '../router';

export default {
    data(){
        return{
            name:'',
            email:'',
            tel:'',
            two_step:'',
        }
    },
    mounted(){
        this.start();
    },
    methods:{
        activateTwoStep:function(){
            this.two_step="si";
            db.collection("users").where("email", "==",this.email).get()
            .then(function(querySnapshot){
                querySnapshot.forEach(function(doc) {
                console.log(doc.id, " => ", doc.data());
                console.log("el id es "+doc.id+" status "+doc.data().status+" email "+doc.data().email); 
                var funciona=doc.data().token;
                console.log("hola perro "+funciona);    
                var coleccion = db.collection("users").doc(doc.id);
                coleccion.update({
                    twosstep:'si',
                    }).then(function() {
                        console.log("Document successfully updated!");
                    }).catch(function(error) {
                        console.error("Error updating document: ", error);
                        alert("a ocurrido un error ");
                    })
                });
                
            }).catch(function(error) {
                console.log("Error getting documents: ", error);
            });

        },
        deActivateTwoStep:function(){
            this.two_step="no";
            db.collection("users").where("email", "==",this.email).get()
            .then(function(querySnapshot){
                querySnapshot.forEach(function(doc) {
                console.log(doc.id, " => ", doc.data());
                console.log("el id es "+doc.id+" status "+doc.data().status+" email "+doc.data().email); 
                var funciona=doc.data().token;
                console.log("hola perro "+funciona);    
                var coleccion = db.collection("users").doc(doc.id);
                coleccion.update({
                    twosstep:'no',
                    }).then(function() {
                        console.log("Document successfully updated!");
                    }).catch(function(error) {
                        console.error("Error updating document: ", error);
                        alert("a ocurrido un error ");
                    })
                });
                
            }).catch(function(error) {
                console.log("Error getting documents: ", error);
            });

        },
        start:function(){
            this.name=JSON.parse(localStorage.getItem("name")); 
            this.email=JSON.parse(localStorage.getItem("email")); 
            this.two_step=JSON.parse(localStorage.getItem("twosstep"));
            this.tel=JSON.parse(localStorage.getItem("phone")); 
        },
       
    }
}
</script>