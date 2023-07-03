const { createApp } = Vue;

createApp({
    data(){
        return {
            lanuquitos: [],
            categorias:[],
            url:"https://plorenti.pythonanywhere.com/lanuquitos",
            url_categorias:"https://plorenti.pythonanywhere.com/categorias",
            error:false,
            cargando:true,
            // Atributos
            id:0,
            nombre:"",
            precio:0,
            categoria:0,
            id_categoria:0,
            nuevaCategoria:"",
        };

    },
    methods: {
        fetchData(url,url_categorias) {
            fetch(url)
              .then((response) => response.json())
              .then((data) => {
               
                this.lanuquitos = data;
                this.cargando = false;
              })
              .catch((err) => {
                console.error(err);
                this.error = true;
              });
              //CARGO CATEGORIAS
              fetch(url_categorias)
              .then((response) => response.json())
              .then((data) => {
                this.categorias = data;
              })
              .catch((err) => {
                console.error(err);
                this.error = true;
              });
          },
          guardar(){
            //Crear objeto y capturar datos
            let lanuquito ={
              nombre: this.nombre,
              id_categoria: this.id_categoria,
              precio: this.precio,
            }
            //Configurar fetch
            let opciones = {
              body: JSON.stringify(lanuquito), // Convertir el objeto a una cadena JSON
              method: "POST", // Establecer el método HTTP como POST
              headers: { "Content-Type": "application/json" },
              redirect: "follow",
            };  
            //debug
            //console.log(this.nombre)  
            //console.log(this.id_categoria)        
            //Ejecutar
            fetch(this.url, opciones)
            .then(function () {
              alert("Registro grabado!");
              window.location.href = "./index.html"; // Redirigir a la página de productos
            })
            .catch((err) => {
              console.error(err);
              alert("Error al Grabar.");
            });
            
          },
          agregarCategoria(){
            //Crear objeto y capturar datos
            let categoria ={
              nombre : this.nuevaCategoria,
            }
            //Configurar fetch
            let opciones = {
              body: JSON.stringify(categoria), // Convertir el objeto a una cadena JSON
              method: "POST", // Establecer el método HTTP como POST
              headers: { "Content-Type": "application/json" },
              redirect: "follow",
            };  
            //debug
            //console.log(categoria)  
            //console.log(this.nuevaCategoria)        
            //Ejecutar
            fetch(this.url_categorias, opciones)
            .then(() =>{
              alert("Categoria Agregada!");
              this.fetchData(this.url,this.url_categorias);
              $('#agregarCategoriaModal').modal('hide');
            })
            .catch((err) => {
              console.error(err);
              alert("Error al Grabar.");
            });
          },
    },
    created() {
        this.fetchData(this.url,this.url_categorias);
    },
}).mount("#app");