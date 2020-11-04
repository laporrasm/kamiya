
var firebaseConfig = {
    apiKey: "AIzaSyDAWoHlWSmyLAHxCkgeYNX1NDyi4aSILaI",
    authDomain: "usuarios-6b419.firebaseapp.com",
    databaseURL: "https://usuarios-6b419.firebaseio.com",
    projectId: "usuarios-6b419",
    storageBucket: "usuarios-6b419.appspot.com",
    messagingSenderId: "763350583227",
    appId: "1:763350583227:web:4de618687bc41f02dfa69e",
    measurementId: "G-CSVYH613NR"
  };
  firebase.initializeApp(firebaseConfig);
  firebase.auth();
  
let loginButton = document.getElementById("Iniciar");
let redirigirButton = document.getElementById("Registrar");

loginButton.addEventListener("click", e => {
  e.preventDefault()
  InicioSesionUsuarios()
})

redirigirButton.addEventListener("click", f => {
  f.preventDefault()
  redirigirUsuario()
})


function InicioSesionUsuarios(){
    var email2 =  document.getElementById('email2').value;
    var password2 = document.getElementById('password2').value;

    firebase.auth().signInWithEmailAndPassword(email2, password2).catch(function(error) {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      // ...
      console.log(errorCode)
      console.log(errorMessage)
      addErrorMessage(errorMessage);
    });
}

function redirigirUsuario(){
  
  document.location.href="Login.html";
}

function observador(){
  
  

  firebase.auth().onAuthStateChanged(function(user) {
    var admin = document.getElementById('email2').value;
    if(admin == "20161489@aloe.ulima.edu.pe")
    {
      if (user) {
        // User is signed in.
        console.log("Existe usuario activo")
        
        document.location.href="pagina1.html";
        var displayName = user.displayName;
        var email = user.email;
        var emailVerified = user.emailVerified;
        var photoURL = user.photoURL;
        var isAnonymous = user.isAnonymous;
        var uid = user.uid;
        var providerData = user.providerData;
        // ...
      } else {
        console.log("no hay usuario activo")
        
        // User is signed out.
        // ...
      }

    }else{
      if (user) {
        // User is signed in.
        console.log("Existe usuario activo")
        
        document.location.href="LandingUsuario.html";
        console.log(admin)
        var displayName = user.displayName;
        var email = user.email;
        var emailVerified = user.emailVerified;
        var photoURL = user.photoURL;
        var isAnonymous = user.isAnonymous;
        var uid = user.uid;
        var providerData = user.providerData;
        // ...
      } else {
        console.log("no hay usuario activo")
        
        // User is signed out.
        // ...
      }
    }
    
  });

}

let addErrorMessage = (message) => {
  message = message.toLowerCase();
  if (message.includes("email")) {
    let emailContainer = document.getElementById("user-group");
    let emailInput = document.getElementById("email2");

    emailContainer.querySelector(".invalid-feedback").textContent = message;
    emailInput.classList.add("is-invalid");
    console.log("error1");
  }
  else {
    let emailContainer = document.getElementById("contrasena-group");
    let emailInput = document.getElementById("password2");

    emailContainer.querySelector(".invalid-feedback").textContent = message;
    emailInput.classList.add("is-invalid");
    console.log("error2");
  }
  
}

observador();