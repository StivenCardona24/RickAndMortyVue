var app = new Vue({
  el: "#app",
  data: {
    users: [
      {id: 1, name: 'test1', username: 'user1', pin: '1234', rmp: 1000, characters:[]},
      {id: 2, name: 'test2', username: 'user2', pin: '1234', rmp: 3000, Characters:[]},
      {id: 3, name: 'test3', username: 'user3', pin: '1234', rmp: 5000, Characters:[]},
  ],
  
  option: 1,
  newArrUsers: [],
  username:"",
  pin:"",
  user:"",

  
  person:{
    name:"",
    username: "",
    pin: '', 
    pin2: '', 
    rmp: 0,
  },
},




  methods: {
    login(){
      if(this.username == "" || this.PIN == ""){ 
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Ingresa correctamente los datos del formulario',
          
         
        });
        this.email = '';
          this.password = '';
        return
      }else{
        this.users.forEach(persona => {   // recorrer todos los objetos
           if(this.username == persona.username && this.PIN == persona.PIN){
            const Toast = Swal.mixin({
              toast: true,
              position: 'top-end',
              showConfirmButton: false,
              timer: 3000,
              timerProgressBar: true,
              didOpen: (toast) => {
                toast.addEventListener('mouseenter', Swal.stopTimer)
                toast.addEventListener('mouseleave', Swal.resumeTimer)
              }
            })
            
            Toast.fire({
              icon: 'success',
              title: 'Has iniciado sesión correctamente'
            })
  
              this.user = persona;
              this.saveUser();
              //direccionamiento
            }
        });

        this.email = '';
        this.password = '';
        if(this.user==""){
          alert("Los datos son incorrectos");
        }
        if(this.user == null){
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'El email y/o contraseña son incorrectos',
           
          });
          this.email = '';
          this.password = '';
          return
        }
        else{
          this.email = '';
          this.password = '';
          setTimeout(function(){     
            window.location.href = "Web/Index.html";
      
          
        }.bind(this), 3000);
  
        }
      }
    },

    openForm(){
      this.option = 2;
    },
    openLogin(){
      this.option = 1;
    },

    registerUser(){

      if(this.person.name == '' ||  this.person.username == '' || this.person.pin == '' || this.person.pin2 == '' ){
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Ingresa correctamente los datos del formulario',
          
         
        });
        return
      }

      else if(this.person.pin !=  this.person.pin2  ){
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'El pin debe coincidir con el otro',
          
         
        });
        return

      }
      else{

        this.users.push(
          {
            id: this.users.length + 1,
            name: this.person.name,
            username: this.person.username,
            pin: this.person.pin,
            rmp: 0,
            characters: [],
          } 
        );

        Swal.fire(
          'Te has registrado correctamente',
          'Presiona el botón e Inicia sesión',
          'success'
        );

        this.updateLocalStorage();
        
        this.person.name = ''
        this.person.username = ''
        this.person.pin = ''
        this.person.pin2 =''
        this.option = 1;

      }



    },
  
  
  updateLocalStorage() {// actualizar
    localStorage.setItem('users', JSON.stringify(this.users));
  },
  saveUser(){
    localStorage.setItem('user', JSON.stringify(this.user));
  }

},

created() {
  if (localStorage.getItem('users') !== null) {
      this.users = JSON.parse(localStorage.getItem('users'))
  }
 
},
});

  //v-for="i in array" es una directiva de bue que permite recorrer un arreglo
