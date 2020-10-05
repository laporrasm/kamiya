
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
  
let loginButton = document.querySelector(".login-btn")

loginButton.addEventListener("click", e => {
  e.preventDefault()
  InicioSesionUsuarios()
})


function InicioSesionUsuarios(){
    var email2 =  document.getElementById('email2').value;
    var password2 = document.getElementById('password2').value;

    firebase.auth().signInWithEmailAndPassword(email2, password2).catch(function(error) {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      // ...
    });
}

function observador(){
  firebase.auth().onAuthStateChanged(function(user) {
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
  });

}
observador();