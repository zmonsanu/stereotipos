

var JSONexp = [
   {
      "Descripcion": "Cambio Aceite y filtros",
      "Fecha": "5/2/2018",
      "Id": 1,
      "Kilometros": 250000,
      "ProximaRevison": {
         "Descripcion": "Cambio aceite",
         "FechaAprox": "5/5/2018",
         "KilometrosAprox": 275000
      },
      "Taller": "Inyeauto",
      "Vehiculo": "Volkswagen Golf IV"
   },
   {
      "Descripcion": "Cambio ruedas y pastillas de frenos",
      "Fecha": "1/2/2018",
      "Id": 2,
      "Kilometros": 99000,
      "ProximaRevison": {
         "Descripcion": "Revisión general.",
         "FechaAprox": "1/6/2018",
         "KilometrosAprox": 275000
      },
      "Taller": "RCP",
      "Vehiculo": "Harley Davidson"
   },
   {
      "Descripcion": "Cambio ruedas y pastillas de frenos",
      "Fecha": "3/2/2018",
      "Id": 3,
      "Kilometros": 35000,
      "ProximaRevison": {
         "Descripcion": "Revisión general.",
         "FechaAprox": "3/7/2018",
         "KilometrosAprox": 40000
      },
      "Taller": "Centro BWM",
      "Vehiculo": "BMW"
   }
];
//---------------------------------------INICIO  scripts conversión JSON to HTML
// This function creates a standard table with column/rows
// Parameter Information
// objArray = Anytype of object array, like JSON results
// theme (optional) = A css class to add to the table (e.g. <table class="<theme>">
// enableHeader (optional) = Controls if you want to hide/show, default is show
function CreateTableView(objArray, theme, enableHeader) {
    // set optional theme parameter
    if (theme === undefined) {
        theme = 'lightPro'; //default theme
    }

    if (enableHeader === undefined) {
        enableHeader = true; //default enable headers
    }

    // If the returned data is an object do nothing, else try to parse
    var array = typeof objArray != 'object' ? JSON.parse(objArray) : new Array(objArray);
    var keys = Object.keys(array[0]);

    var str = '<table class="' + theme + '">';

    // table head
    if (enableHeader) {
        str += '<thead><tr>';
        for (var index in keys) {
            str += '<th scope="col">' + keys[index] + '</th>';
        }
        str += '</tr></thead>';
    }

    // table body
    str += '<tbody>';
    for (var i = 0; i < array.length; i++) {
        str += (i % 2 == 0) ? '<tr class="alt">' : '<tr>';
        for (var index in keys) {
            var objValue = array[i][keys[index]];

            // Support for Nested Tables
            if (typeof objValue === 'object' && objValue !== null) {
                if (Array.isArray(objValue)) {
                    str += '<td>';
                    for (var aindex in objValue) {
                        str += CreateTableView(objValue[aindex], theme, true);
                    }
                    str += '</td>';
                } else {
                    str += '<td>' + CreateTableView(objValue, theme, true) + '</td>';
                }
            } else {
                str += '<td>' + objValue + '</td>';
            }

        }
        str += '</tr>';
    }
    str += '</tbody>'
    str += '</table>';

    return str;
}

// This function creates a details view table with column 1 as the header and column 2 as the details
// Parameter Information
// objArray = Anytype of object array, like JSON results
// theme (optional) = A css class to add to the table (e.g. <table class="<theme>">
// enableHeader (optional) = Controls if you want to hide/show, default is show
function CreateDetailView(objArray, theme, enableHeader) {
    // set optional theme parameter
    if (theme === undefined) {
        theme = 'lightPro';  //default theme
    }

    if (enableHeader === undefined) {
        enableHeader = true; //default enable headers
    }

    // If the returned data is an object do nothing, else try to parse
    var array = typeof objArray != 'object' ? JSON.parse(objArray) : new Array(objArray);
    var keys = Object.keys(array[0]);

    var str = '<table class="' + theme + '">';
    str += '<tbody>';


    for (var i = 0; i < array.length; i++) {
        var row = 0;
        for (var index in keys) {
            var objValue = array[i][keys[index]]

            str += (row % 2 == 0) ? '<tr class="alt">' : '<tr>';

            if (enableHeader) {
                str += '<th scope="row">' + keys[index] + '</th>';
            }

            // Support for Nested Tables
            if (typeof objValue === 'object' && objValue !== null) {
                if (Array.isArray(objValue)) {
                    str += '<td>';
                    for (var aindex in objValue) {
                        str += CreateDetailView(objValue[aindex], theme, true);
                    }
                    str += '</td>';
                } else {
                    str += '<td>' + CreateDetailView(objValue, theme, true) + '</td>';
                }
            } else {
                str += '<td>' + objValue + '</td>';
            }

            str += '</tr>';
            row++;
        }
    }
    str += '</tbody>'
    str += '</table>';
    return str;
};

//---------------------------------------Fin scripts conversión JSON to HTML







(function () {

  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyDBDav_7PBwRbE0QTCTidMDZL4bMe87Gqs",
    authDomain: "mecanicapp-9caec.firebaseapp.com",
    databaseURL: "https://mecanicapp-9caec.firebaseio.com",
    projectId: "mecanicapp-9caec",
    storageBucket: "mecanicapp-9caec.appspot.com",
    messagingSenderId: "723241712931"
  };
  firebase.initializeApp(config);


//AUTENTIFICACION:
//Devuelve los metodos de autentificación de firebase
const auth =firebase.auth();
//Se va a trabajar con autentificación de email y password
const email="zmonsanu@gmail.com";
const pass="b77a5c561934e089"
auth.createUserWithEmailAndPassword(email,pass);
auth.signInWithEmailAndPassword(email,pass);//logea un usuario ya existente

auth.onAuthStateChanged(firebaseUser =>{});//CUando el usuario se logea

  //----------Sincronizar objetos en Tiempo Real-------------------
  var strJSON ;
  //Obtener elementos
  var preObject =document.getElementById('hist');
  var ulListProxRev =document.getElementById('proxRev');
  var br = document.createElement("br");
  //var ulListReg2 =document.getElementById('reg2');
  var card = document.createElement("div");
  card.className ="card";
  card.style.width = "18rem";

  var card2 = document.createElement("div");
  card2.className ="card";
  card2.style.width = "18rem";

  var ulListReg2 = document.createElement("ul");
  ulListReg2.className ="list-group list-group-flush";

  var ulListReg1 = document.createElement("ul");
  ulListReg1.className ="list-group list-group-flush";

  var div = document.createElement("div");
  div.className="card-header";

  var div2 = document.createElement("div");
  div2.className="card-header";
  //Crear referencias
const dbRefObject = firebase.database().ref();
const dbRefHistorico = dbRefObject.child('Historico');

//Elementos de la pantalla Login
const txtEmail = document.getElementById('txtEmail');
const txtPassword =  document.getElementById('txtPassword');

const btnLogout = document.getElementById('btnLogout');
btnLogout.style.display='none';

const btnLogin = document.getElementById('btnLogin');
//se añade evento Login
btnLogin.addEventListener('click',e => {
  //Obtener email y password
  const email = txtEmail.value;
  const pass=txtPassword.value;
  const auth = firebase.auth();

  //Sign in
  const promise = auth.signInWithEmailAndPassword(email,pass);
  //promise.catch(e => console.log(e.message));
    promise.catch(e => {
      self.location ="Home.html";
      btnLogout.style.display='inline';}
  );
});


//se añade evento Registrarse

const btnSignUp = document.getElementById('btnSignUp');
btnSignUp.addEventListener('click',e => {
  //Obtener email y password
  const email = txtEmail.value;
  const pass=txtPassword.value;
   //$("#centralModalSuccess").modal('show');
   console.log("Registrando..");
   /*
  const auth = firebase.auth();
  //registrar
  const promise = auth.createUserWithEmailAndPassword(email,pass);
  promise.catch(e =>  $("#centralModalSuccess").modal('show'));
  // self.location ="Home.html"
*/
});



btnLogout.addEventListener('click',e => {
firebase.auth().signOut();
self.location ="Login.html"
});

//Detecta cada vez que hay un cambio en el usuario
firebase.auth().onAuthStateChanged( firebaseUser =>{
  if(firebaseUser){
    console.log(firebaseUser);
    //btnLogout.classList.remove('hide');
    document.getElementById('btnLogout').style.display='inline';

  }else {
    console.log('Usuario no logeado');
    //btnLogout.classList.add('hide');
    document.getElementById('btnLogout').style.display='hide';
  }
});


//Sincronizar cambios objetos
/* dbRefObject.on('value', snap => console.log (snap.val()));//esto muestra en consola el objeto*/
 /*dbRefHistorico.on('value', snap => {
preObject.innerText = JSON.stringify(snap.val(),null,3);
}) ;*/

/* OTRO METODO DE CREAR UNA TABLA HTML A PARTIR DE UN JSON
var table = document.querySelector('#table1 tbody');
function refreshData()
{
	while(table.hasChildNodes()) {
		table.removeChild(table.firstChild);
	}
	//dbRefObject = firebase.database().ref().child('ShotList15' );
	dbRefHistorico.on('value', snap => {
		data = snap.val();
		for(var r in data) {
			var row = table.insertRow(-1);
			for(var c in data[r]) {
				cell = row.insertCell(-1);
				cell.innerHTML = data[r][c];
			}
		}
	});
};
refreshData();
*/

$(function () {
  dbRefHistorico.on('value', snap => {
	//mydata = snap.val();
  mydata = JSON.stringify(snap.val(),null,3);
 //preObject.appendChild(CreateDetailView(snap.val()));
   $('#tablaJSON').append(CreateDetailView(snap.val(),"table table-hover")).fadeIn();
//   preObject.innerText =  JSON.stringify(snap.val(),null,3);
//mydata  = "[" + mydata.substring(mydata.indexOf("null,")+5, mydata.length);
 //mydata = $.parseJSON('[' + mydata + ']');


 //CreateTableFromJSON(mydata);
  //  console.log(mydata);
  /*  $('#table').bootstrapTable({
        data: mydata
    });*/
  });
});




//Sincronizar cambios en la lista de AnteriorRevision
div.innerText="Registro Nº 2";
  card.appendChild(div);
 const dbRefReg2= dbRefHistorico.child('2');
dbRefReg2.on('child_added', snap =>{
const li1 = document.createElement('li');
li1.className = "list-group-item";
if( snap.key !="ProximaRevison"){
  li1.innerText = snap.key + ': ' + snap.val();
  li1.id = snap.key;
  ulListReg2.appendChild(li1);
}
card.appendChild(ulListReg2);

});
document.getElementById("bloqueListas").appendChild(card);
document.getElementById("bloqueListas").appendChild(br);

// child_added y child_changed detectan cualquier cambio en la bbdd
div2.innerText="Próxima Revisión del Registro Nº 1";
  card2.appendChild(div2);
const dbRefProxRev = dbRefHistorico.child('1/ProximaRevison');
dbRefProxRev.on('child_added', snap =>{
  const li = document.createElement('li');
  li.className = "list-group-item";
  li.innerText = snap.key + ': ' + snap.val();
  li.id = snap.key;
  ulListReg1.appendChild(li);

  card2.appendChild(ulListReg1);

});
document.getElementById("bloqueListas2").appendChild(card2);

//Sincronizar cambios en la lista de AnteriorRevision
/* const dbRefProxRev = dbRefHistorico.child('1');
dbRefAntRev.on('value', snap =>{
const li1 = document.createElement('li');
li1.className = "list-group-item";
li1.innerText = snap.key + ': ' + snap.val();
li1.id = snap.key;
ulListReg2.appendChild(li1);
});*/
/*
//Sincronizar cambios en la lista de ProximaRevision
const dbRefAntRev = dbRefHistorico.child('ProximaRevision');
dbRefProxRev.on('value', snap =>{
const li = document.createElement('li');
li.className = "list-group-item";
li.innerText = snap.key + ': ' + snap.val();
li.id = snap.key;
ulListProxRev.appendChild(li);
});*/

}());
