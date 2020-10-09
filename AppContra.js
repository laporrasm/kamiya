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



function resetearPassword()
{
    var auth = firebase.auth();
    var emailPassword = document.getElementById('email').value;
    
    if(emailPassword != "")
    {
        
        auth.sendPasswordResetEmail(emailPassword).then(function()
        {
            console.log("El email a sido enviado. Por favor verifica");
        })
        .catch(function(error)
        {
            var errorCode = error.code;
            var errorMessage = error.message;
        

            console.log(errorCode)
            console.log(errorMessage)

        });
    }
    else
    {
        window.alert("porfavor ingrese primero su correo");
    }
}
