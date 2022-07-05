var main = new Vue({
    el: "#main",
    data: {
        characters: [],
    },
    methods: {

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
                
            });
      
            this.updateLocalStorage();
             
              
              

          },

          updateLocalStorage(){
            localStorage.setItem('characters', JSON.stringify(this.characters));
            
        
          },


        
    },

    
  created() {

    if(localStorage.getItem('characters') != null){
        this.characters = JSON.parse(localStorage.getItem('characters'));
    }
    else{
        this.listCharacters();
    }
  },
  });