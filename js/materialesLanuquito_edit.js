const appMat = Vue.createApp({
    data(){
        return {
            materiales:[],
            url_materiales:"https://plorenti.pythonanywhere.com/materiales",
            id:0,
            material:"",
            precio:0,
            proveedor:"0",
      

        };
    },
    methods:{
        fetchData(url_materiales) {

            fetch(url)
              .then((response) => response.json())
              .then((data) => {
                
                this.materiales=data;

              })
              .catch((err) => {
                console.error(err);
                this.error = true;
              });
               
            },
            actualizar(){
             
            }
          },
  created() {

    this.fetchData(this.url_materiales);
   
  },


}).mount("#appMat");