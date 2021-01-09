<template>
<div class="login-form">
    <form v-on:submit.prevent="Reset">
        <h2 class="text-center">Forgot Password</h2>       
        <div class="form-group">
             <input type="email" v-model="user.email" class="form-control" placeholder="email adress" required="required">
        </div>
        <div class="form-group">
            <button type="submit" class="btn btn-primary btn-block">send email</button>
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
                email:'',
            }
        }
    },
    methods:{
        Reset:function() {
            console.log("reset password "+this.user.email);
            db.collection("users").where("email", "==",this.user.email)
            .get().then(function(querySnapshot){
                querySnapshot.forEach(function(doc) {
                    console.log(doc.id, " => ", doc.data());
                    if(doc.data().status=="inactivo"){
                        alert("active su cuenta");   
                    }
                    else{
                        var name=doc.data().name;
                        var email=doc.data().email;
                        var token=doc.data().token;
                        console.log("name "+name);
                        console.log("email "+email);
                        console.log("token "+token);
                        alert("revise su correo");
                        db.collection("history").add({
                             name:name,
                             email:email,
                             token:token,
                        }).then(function(docRef) {
                            console.log("Document written with ID: ", docRef.id);
                            router.push("/login");
                        }).catch(function(error) {
                            console.error("Error adding document: ", error);
                            alert("a ocurrido un error");
                        });
                    }
                });
            })
            .catch(function(error) {
                console.log("Error getting documents: ", error);
            }); 
        }

    }
  
 
}
</script>