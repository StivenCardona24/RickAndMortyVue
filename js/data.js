var main = new Vue({
    el: "#main",
    data: {
        characters: [],
        newCharacters: [],
        users: [],
        user: "",
        option: 1,
        venta: [
            {
              Cant: 500,
              price: 10.0,
            },
            {
              Cant: 1000,
              price: 20.0,
            },
            {
              Cant: 1500,
              price: 30.0,
            },
            {
              Cant: 2000,
              price: 35.0,
            },
          ],

          pago: '',
          rmp: 0,
          bid: 0

    },
    methods: {


        loadRmp(){
            let x = document.getElementById("option1");
            let y = document.getElementById("option2");
            let z = document.getElementById("option3");
            x.classList.add('active');
            y.classList.remove('active');
            z.classList.remove('active');
            this.option = 1;

        },

        loadBuy(){
            let x = document.getElementById("option1");
            let y = document.getElementById("option2");
            let z = document.getElementById("option3");
            y.classList.add('active');
            x.classList.remove('active');
            z.classList.remove('active');
            this.option = 2;
        },

        loadHistory(){
            let x = document.getElementById("option1");
            let y = document.getElementById("option2");
            let z = document.getElementById("option3");
            z.classList.add('active');
            y.classList.remove('active');
            x.classList.remove('active');
            this.option = 3;
        },

        getRmp(item){
            this.rmp = item.Cant;
        },
        buyRmp(){
            if(this.pago == ''){
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'Selecciona un metodo de pago',
                    
                   
                  });

                  return;
            }
            else{

               this.user.rmp += this.rmp;
               Swal.fire(
                'Has realizado tu compra correctamente',
                'Presiona el botón',
                'success'
              );
              let btn = document.getElementById('closeRmp');
              btn.click();
              this.updateLocalStorage();
              
            }
        },

        offer(person){
            let offer = document.getElementById(person.id).value;
            offer = Number(offer);
            
            console.log(offer);
            if(offer == 0){
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'Debes ofertar un valor',
                    
                   
                  });

                  return;
            }
            

            if(offer > this.user.rmp){
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'No tienes la cantidad suficiente de rmp, debes comprar más',
                    
                   
                  });

                  return;
            }
            let y = offer - person.rmp
            if(y < 0){
                let x = person.rmp ;
                x = x.toFixed(2);
                person.rmp = x;
                person.bit -= 1;
            }
            else if( y >= 100 && y <= 500 ){
                let x = person.rmp * 1.1;
                x = x.toFixed(2);
                person.rmp = x;
                person.bit -= 1;
            }
            else if(y >= 500 && y <= 1000 ){
                let x = person.rmp * 1.2;
                x = x.toFixed(2);
                person.rmp = x;
                person.bit -= 1;

            }
            else{
                let x = person.rmp * 1.3;
                x = x.toFixed(2);
                person.rmp = x;
                person.bit -= 1;
            }
        },

        buyCharacter(item){
            if(item.rmp > this.user.rmp){
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'No tienes la cantidad suficiente de rmp, debes comprar más',
                    
                   
                  });
                  this.loadRmp();
                  return;
                  

            }
            else{
                Swal.fire({
                    title: `¿Estas seguro de comprar a ${item.name}?`,
                    showDenyButton: true,
                    showCancelButton: true,
                    confirmButtonText: 'Save',
                    denyButtonText: `Don't save`,
                  }).then((result) => {
                    /* Read more about isConfirmed, isDenied below */
                    if (result.isConfirmed) {
                      this.user.characters.push(item);
                      item.ward = false;
                      Swal.fire(`Felicitaciones! Has comprado a ${item.name}`, '', 'success')
                      this.user.rmp -= item.rmp;
                      this.updateLocalStorage();
                     
                    } else if (result.isDenied) {
                      Swal.fire('Compra otros personajes', '', 'info')
                    }
                  })
            }

        },

        async listCharacters(){
            
            let ids = []

            for (let i = 0; i < 12; i++) {

                let x  = 0;
                 

                do {
                     x = Math.floor(Math.random()* 826)
                } while (ids.indexOf(x) != -1);


                const url = `https://rickandmortyapi.com/api/character/${x}`;

                await fetch(url)
                    .then((response) => response.json())
                    .then((data) => this.characters.push(data));
    
            }

            this.characters.forEach(p => {

                if(p.species == "Mythological Creature"){
                    p.rmp = Math.floor(Math.random()* (4000 - 3000) + 3000);
                    p.bit = Math.floor(Math.random()* (3 - 4) + 4);;
                }
                else if (p.species == "Alien"){
                    p.rmp = Math.floor(Math.random()* (3000 - 1500) + 1500);
                    p.bit = Math.floor(Math.random()* (3 - 2) + 2);

                }
                else{
                    p.rmp = Math.floor(Math.random()* (1500 - 500) + 500);
                    p.bit = Math.floor(Math.random()* (2 - 1) + 1);
                }
                p.ward = true;
                
            });

            this.newCharacters = this.characters.filter(u => u.ward == true) ;
            this.updateLocalStorage();  

          },

          updateLocalStorage(){
            localStorage.setItem('characters', JSON.stringify(this.characters));
            localStorage.setItem('users', JSON.stringify(this.users));
            this.newCharacters = this.characters.filter(u => u.ward == true) ;
            
        
          },


        
    },

    
  created() {

    if(localStorage.getItem('characters') != null){
        this.characters = JSON.parse(localStorage.getItem('characters'));
    }
    else{
        this.listCharacters();
    }

    if(localStorage.getItem('users') != null){
        this.users = JSON.parse(localStorage.getItem('users'))
    }

    if(localStorage.getItem('user') != null){
        this.user =  JSON.parse(localStorage.getItem('user'));

        this.users.forEach(element => {
          if(element.id == this.user.id){
            this.user = element;
            console.log("hola");
            this.newCharacters = this.characters.filter(u => u.ward == true) ;
          }
        

          
        });    
    }
    else{

        
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'No has iniciado sesión',
       
      });

        window.location.href = "../Login.html";
    }
  },
  });