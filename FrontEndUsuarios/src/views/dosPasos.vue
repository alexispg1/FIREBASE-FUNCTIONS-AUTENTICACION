<template>
<div class="login-form">
    <form v-on:submit.prevent="verificarCodigo">
        <h2 class="text-center">DOS PASOS </h2>       
        <div class="form-group">
             <input type="number" v-model="numero" class="form-control" placeholder="numero de vereficacion" required="required">
        </div>
        <div class="form-group">
            <button type="submit"  class="btn btn-primary btn-block">ingresar</button>
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
            numero:'',
            email:'',
        }
    
    },
    mounted(){
        this.start();
    },
    methods:{
        start(){
            this.email=JSON.parse(localStorage.getItem("email"));
            console.log("email perro "+this.email); 
        },
        verificarCodigo:function(){
            console.log("estoy  en el metodo verifcar codigo ");
            console.log("estoy clikiando");
            console.log("mi numero es "+this.numero);
            var number=this.numero;
            db.collection("users").where("email","==",this.email).get()
            .then(function(querySnapshot){
                querySnapshot.forEach(doc => {
                    console.log(doc.id, " => ", doc.data());
                    console.log("el id es "+doc.id+" status "+doc.data().status+" email "+doc.data().email+" numero"+
                    doc.data().numero);
                    var numerox=doc.data().numero;
                    console.log("numero XXXX "+numerox);
                    if(numerox==number){
                        console.log("encontrado numero de verificacion correcto");
                         router.push({name: 'panel'}); 
                         localStorage.setItem('email', JSON.stringify(doc.data().email)); 
                         localStorage.setItem('name', JSON.stringify(doc.data().name)); 
                         localStorage.setItem('twosstep', JSON.stringify(doc.data().twosstep)); 
                         localStorage.setItem('phone', JSON.stringify(doc.data().phone)); 
                    }
                    else{
                        console.log("nunero de verificacion incorrrecto");
                    }     
                });
            }).catch(function(error) {
                console.log("Error getting documents: ", error);
            });
        }

    }
   
}
</script>