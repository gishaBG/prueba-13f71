import { initializeApp } from "https://www.gstatic.com/firebasejs/10.9.0/firebase-app.js";
//import { getFirestore } from "./node_modules/firebase/firebase-firestore-lite.js";

import { getFirestore,collection, getDocs,setDoc ,deleteDoc,doc, onSnapshot,query,updateDoc} from "https://www.gstatic.com/firebasejs/10.9.0/firebase-firestore.js";
// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional


  const firebaseConfig = {
    apiKey: "AIzaSyBzt-Uz7cxeupk4cayWmsQSBUDSvm2dgfU",
    authDomain: "prueba-13f71.firebaseapp.com",
    projectId: "prueba-13f71",
    storageBucket: "prueba-13f71.appspot.com",
    messagingSenderId: "220670375581",
    appId: "1:220670375581:web:176f6176d4db32c9210674"
  };  

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

let bti =  document.getElementById("inser");

let btc =  document.getElementById("consu");

let btins =  document.getElementById("inser2");

const tablaAlumnos = document.querySelector("#tbAlumnos")


//evento que almacena los datos dentro de una subcoleccion

btins.addEventListener('click', async (e) => {
    
  alert("insertando subcoleccion......")


    try {

      // donde                            coleccion          iddoc                               subcole                       iddoc
      const docRef = await setDoc(doc(db, "Alumnos",  document.getElementById("matri").value ,"Grupo", document.getElementById("id_grupo").value), 
                                
      {
        id_grupo: document.getElementById("id_grupo").value,
        nombre: document.getElementById("nombre").value,
        aula:"212",
             
      }
      
      );

      try {

        // donde                            coleccion          iddoc                               subcole                       iddoc
        const docRef = await setDoc(doc(db, "Alumnos",  document.getElementById("matri").value ,"PE", document.getElementById("id_pe").value),                                  
        {
          id_pe: document.getElementById("id_pe").value,
          nom_pe:"Ingeniero en computación",
               
        }
        
        );
        try {

          // donde                            coleccion          iddoc                               subcole                       iddoc
          const docRef = await setDoc(doc(db, "Alumnos",  document.getElementById("matri").value ,"UAP", document.getElementById("id_uap").value),                              
            
          {
            id_uap: document.getElementById("id_uap").value,
            nom_uap:"Redes",
          }
        );
          
      } catch (e) {
        console.error("Error adding document: ", e);
      }

    } catch (e) {
      console.error("Error adding document: ", e);
    }

  } catch (e) {
    console.error("Error adding document: ", e);
  }
});


bti.addEventListener('click', async (e) => {
    
  let nom = document.getElementById("nombre");
  let ap = document.getElementById("ap");

    try {
        const docRef = await setDoc(doc(db, "Alumnos", document.getElementById("matri").value ), 
                          
        {
          matri: document.getElementById("matri").value,
          nombre: nom.value,
          ap: ap.value,
               
        }
        
        );
       // console.log("Document written with ID: ", docRef.id);
      } catch (e) {
        console.error("Error adding document: ", e);
      }

})


btc.addEventListener('click', async (e)=> {

  ShowAlum()
  viewAlumnos2()
  viewAlumnosSubcoleccion()
})


async function ShowAlum() {

  tbAlumnos.innerHTML = ""
  const Allalum = await ViewAlumnos()


  Allalum.forEach((doc) => {
       //doc.data() is never undefined for query doc snapshots
        //console.log(doc.id, " => ", doc.data());
      const datos = doc.data()
    
      
      tbAlumnos.innerHTML += `<tr class = "regis" data-id="${doc.id}" data-pe="${datos.id_pe}" data-grupo="${datos.id_grupo}" data-uap="${datos.id_uap}">
      <td>${datos.matri}</td>

      <td>${datos.nombre}</td>
      <td>${datos.ap}</td>

      <td>${datos.id_pe}</td>
      <td>${datos.id_grupo}</td>
      <td>${datos.id_uap}</td>

      <td>
          <button class="btn-primary btn m-1 editar_" data-id="${doc.id}" >
           Editar 
          <span class="spinner-border spinner-border-sm" id="Edit-${doc.id}" style="display: none;"></span>
          </button> 

          <button class="btn-danger btn eliminar_"  data-id="${doc.id}|${datos.matri}|${datos.nombre}|${datos.ap}|${datos.id_pe}|${datos.id_grupo}|${datos.id_uap}" >
          Eliminar 
          <span class="spinner-border spinner-border-sm" id="elim-${doc.id}" style="display: none;"></span>
          
          </button>
      </td>
   
      </tr>`

  });


}

 async function ViewAlumnos() {
  const userRef = collection(db, "Alumnos")
  const Allalum = await getDocs(userRef)
  return Allalum
}

async function viewAlumnos2(){

  const q = query(collection(db, "Alumnos"));
const unsubscribe = onSnapshot(q, (querySnapshot) => {
  const cities = [];

  querySnapshot.forEach((doc) => {

    
      cities.push(doc.data().nombre);      
      
      
      const datos = doc.data()
     tbAlumnos.innerHTML += `<tr class = "regis" data-id="${doc.id}" data-pe="${datos.id_pe}" data-grupo="${datos.id_grupo}" data-uap="${datos.id_uap}">
      <td>${datos.matri}</td>

      <td>${datos.nombre}</td>
      <td>${datos.ap}</td>

      <td>${datos.id_pe}</td>
      <td>${datos.id_grupo}</td>
      <td>${datos.id_uap}</td>

      <td>
          <button class="btn-primary btn m-1 editar_" data-id="${doc.id}" >
           Editar 
          <span class="spinner-border spinner-border-sm" id="Edit-${doc.id}" style="display: none;"></span>
          </button> 

          <button class="btn-danger btn eliminar_"  data-id="${doc.id}|${datos.matri}|${datos.nombre}|${datos.ap}|${datos.id_pe}|${datos.id_grupo}|${datos.id_uap}" >
          Eliminar 
          <span class="spinner-border spinner-border-sm" id="elim-${doc.id}" style="display: none;"></span>
          
          </button>
      </td>
   
      </tr>` 

  });
  console.log("Cambios en la base de datos", cities.join(", "));
 
});
}


//Mostrar subcolecciones
async function viewAlumnosSubcoleccion(){

  const Allalum= await ViewAlumnos()

  Allalum.forEach((doc) => {     
    
      const datos = doc.data()


      console.log("id coleccion ..." + doc.data().matri);     
                    //      coleccion principal, iddocumento, subcoleccion
      const qPE = query(collection(db, "Alumnos", doc.data().matri ,"PE" ));
      const unsubscribePE = onSnapshot(qPE, (querySnapshotPE) => {
       
        querySnapshotPE.forEach((docPE) => {
          
          console.log("subcoleccion PE..." + docPE.data().id_pe);   
    
    });  

  });

const qGrupo = query(collection(db, "Alumnos", doc.data().matri ,"Grupo" ));
const unsubscribeGrupo = onSnapshot(qGrupo, (querySnapshotGrupo) => {

  querySnapshotGrupo.forEach((docGrupo) => {
   
    console.log("subcoleccion Grupo..." + docGrupo.data().id_grupo);   
    
    
  });

});

  const qUAP = query(collection(db, "Alumnos", doc.data().matri ,"UAP" ));
  const unsubscribeUAP = onSnapshot(qUAP, (querySnapshotUAP) => {

    querySnapshotUAP.forEach((docUAP) => {
     
      console.log("subcoleccion UAP..." + docUAP.data().id_uap);   
      
      
    });

  }); 


});
}

$("#tbAlumnos").on("click", ".eliminar_", async function () {

  const producto_id = $(this).data("id")
  console.log("click en " + producto_id)
 let datox = producto_id.split('|')
 console.log("datos  " + datox[1])
  try {
     
    await deleteDoc(doc(db, "Alumnos", datox[0]));

  } catch (error) {
      console.log("error", error)

  }

})


$("#tbAlumnos").on("click", ".editar_", async function () {

  const producto_id = $(this).data("id")
  console.log("click en editar" + producto_id)

  try {
     
    const washingtonRef = doc(db, "Alumnos", producto_id.toString());

    await updateDoc(washingtonRef, {
      matri: document.getElementById("matri").value,
      nombre: document.getElementById("nombre").value,
      ap: document.getElementById("ap").value,
      id_pe: document.getElementById("id_pe").value,
      id_grupo: document.getElementById("id_grupo").value,
      id_uap: document.getElementById("id_uap").value,
    });

  } catch (error) {
      console.log("error", error)

  }

})


$("#tbUsuarios").on("click",".regis", async function () {

  const producto_id = $(this).data("id")
  console.log("click en " + producto_id)

  try {
  
     
  } catch (error) {
      console.log("error", error)

  }

})
