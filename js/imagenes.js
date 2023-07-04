const { createApp } = Vue;

createApp({
    data(){
        return {
            imagenes: [],
            url:"https://plorenti.pythonanywhere.com/imagenes",
            error:false,
            cargando:true,
            // Atributos
            id:0,
            id_lanuquito:0,
            ruta:"",
            buscar:"",
            id_imagen_eliminar:0,
        };

    },
    methods: {
        fetchData(url) {
            fetch(url)
              .then((response) => response.json())
              .then((data) => {
               
                this.imagenes = data;

              })
              .catch((err) => {
                console.error(err);
                this.error = true;
              });
          },
          modalEliminar(id){
            this.id_imagen_eliminar=id;
            $('#eliminarImagenModal').modal('show');
            console.log(id)
          },
          openDeleteModal() {
            this.selectedImageId = imageId;
            
        },
          eliminarLanuquito(){
            
            var opciones ={
                method:"DELETE",
            }
            fetch(this.url+"/"+this.id_lanuquito_eliminar, opciones)
            .then(()=>{
                location.reload()
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
          busqueda(){
            if(this.buscar ===""){
              this.fetchData(this.url, this.url_categorias);
            }else{
              this.lanuquitos = this.lanuquitos.filter(lanuquito =>{
                const nombre = lanuquito.nombre.toLowerCase();
                const textoBusqueda = this.buscar.toLowerCase();

                return nombre.includes(textoBusqueda)
              });
            }
          },
          
    },
    watch:{
        buscar(newVal){
          this.busqueda()
        }
    },
    created() {
        this.fetchData(this.url,this.url_categorias);
    },
}).mount("#app");