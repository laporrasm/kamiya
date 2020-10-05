
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
  registrarUsuarios()
})


function registrarUsuarios()
{
    var email =  document.getElementById('email').value;
    var password = document.getElementById('password').value;



    firebase.auth().createUserWithEmailAndPassword(email, password).catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        // ...

        console.log(errorCode)
        console.log(errorMessage)
        addErrorMessage(errorMessage)
      });
}

let addErrorMessage = (message) => {
  message = message.toLowerCase();
  if (message.includes("email")) {
    let emailContainer = document.getElementById("user-group");
    let emailInput = document.getElementById("email");

    emailContainer.querySelector(".invalid-feedback").textContent = message;
    emailInput.classList.add("is-invalid");
  }
  else if (message.includes("password")) {
    let emailContainer = document.getElementById("contrasena-group");
    let emailInput = document.getElementById("password");

    emailContainer.querySelector(".invalid-feedback").textContent = message;
    emailInput.classList.add("is-invalid");
  }
}