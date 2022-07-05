var app = new Vue({
  el: "#app",
  data: {
    users: [
      {id: 1, name: 'test1', username: 'user1', PIN: '1234', token: false, status: 'user'},
      {id: 2, name: 'test2', username: 'user2', PIN: '1234', token: false, status: 'user'}
      {id: 3, name: 'test3', username: 'user3', PIN: '1234', token: false, status: 'user'},
  ],
  newArrUsers: [],
  username:"",
  PIN:"",
  user:"",
},




  methods: {
  login(){
    if(this.username == "" || this.PIN == ""){ 
        alert("Ingresa los datos");

        return
    }else{

      
 this.users.forEach(persona => {   // recorrer todos los objetos
    if(this.username == persona && this.PIN == persona){
        alert("¡Bienvenido!");
        this.user = persona;
        this.saveUser();
        window.location.href="/RickAndMortyVue/Web/index.html" //direccionamiento
    }

 });
 if(this.users==""){
    alert("Los datos son incorrectos");
 }
}
 },
  
  created() {
    if (localStorage.getItem('users') !== null) {
        this.users = JSON.parse(localStorage.getItem('users'))
    } else {
        this.login();
    }
   
},
updateLocalStorage() {// actualizar
  localStorage.setItem('users', JSON.stringify(this.users));
},
saveUser(){
  localStorage.setItem('users', JSON.stringify(this.users));
}
}
});

  //v-for="i in array" es una directiva de bue que permite recorrer un arreglo
