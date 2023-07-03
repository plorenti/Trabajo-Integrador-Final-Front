const { createApp } = Vue;

createApp({
    data(){
        return {
            materiales: [],
            url:"https://plorenti.pythonanywhere.com/materiales",
            error:false,
            cargando:true,
            // Atributos
            id:0,
            material:"",
            precio:0,
            proveedor:"",
            nuevoMaterial:"",
            nuevoPrecio:0,
            nuevoProveedor:"",
            edit:false,
            materialEdit_id:0,

        };

    },
    methods: {
        fetchData(url) {
            fetch(url)
              .then((response) => response.json())
              .then((data) => {
               
                this.materiales = data;
                this.cargando = false;
              })
              .catch((err) => {
                console.error(err);
                this.error = true;
              });
          },
          GuardarMaterial(){

            let materialNuevo ={
                material:this.nuevoMaterial,
                precio:this.nuevoPrecio,
                proveedor:this.nuevoProveedor,
            }
          

            if(this.edit){
                console.log("PUT")
                let opcionesPut = {
                    body: JSON.stringify(materialNuevo), // Convertir el objeto a una cadena JSON
                    method: "PUT", // Establecer el método HTTP como POST
                    headers: { "Content-Type": "application/json" },
                    redirect: "follow",
                  };
                  console.log(opcionesPut.body)
                    //url_put= this.url + "/"+this.materialEdit_id;
                    
                  //Ejecuto el fetch de POST
                  fetch(this.url+ "/"+this.materialEdit_id, opcionesPut)
                  .then(()=> {
                   
                    $('#agregarMaterialModal').modal('hide');
                    location.reload();
                  })
                  .catch((err) => {
                    console.error(err);
                    alert("Error al Grabar.");
                  });
                  
                this.edit=false;
            }else{
                
               this.materiales.push(materialNuevo);
               let opciones = {
                body: JSON.stringify(materialNuevo), // Convertir el objeto a una cadena JSON
                method: "POST", // Establecer el método HTTP como POST
                headers: { "Content-Type": "application/json" },
                redirect: "follow",
              };
                //Ejecuto el fetch de POST
                fetch(this.url, opciones)
                .then(function () {
                 
                  $('#agregarMaterialModal').modal('hide');
                })
                .catch((err) => {
                  console.error(err);
                  alert("Error al Grabar.");
                });
                
               
                //debug para ver si capturo todo ok
                console.log(materialNuevo)
            }
            /*
            */
          },
          editarMaterial(id_material){
            this.edit=true;
            this.materialEdit_id=id_material;
            console.log(id_material)
            console.log(this.materialEdit_id)
            $('#agregarMaterialModal').modal('show');
            this.materiales.forEach(material => {
                if(material.id==id_material){
                    this.nuevoMaterial=material.material;
                    this.nuevoPrecio=material.precio;
                    this.nuevoProveedor=material.proveedor;
                }
            });
          },
          eliminarMaterial(id_material){
            var opciones ={
                method:"DELETE",
            }
            fetch(this.url+"/"+id_material, opciones)
            .then(()=>{
                location.reload()
            });
          }
    },
    created() {
        this.fetchData(this.url);
    },
}).mount("#app");