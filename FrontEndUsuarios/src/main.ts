import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import BootstrapVue from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import firebase from 'firebase';
import 'firebase/firestore';

Vue.config.productionTip = false;


var firebaseConfig = {
  apiKey: "AIzaSyBZJ_woAqeOerPacVRd5kZbWeVx_JIU2oA",
  authDomain: "functionsfirebase-bd559.firebaseapp.com",
  databaseURL: "https://functionsfirebase-bd559.firebaseio.com",
  projectId: "functionsfirebase-bd559",
  storageBucket: "functionsfirebase-bd559.appspot.com",
  messagingSenderId: "319395003811",
  appId: "1:319395003811:web:348704cd412a69642b6e16",
  measurementId: "G-LVH8C28DMD"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();
const db = firebase.firestore();
export default db;


new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');
