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

const signOutBtn = document.querySelector('#cerrar');

signOutBtn.addEventListener("click", () => {
  firebase.auth().signOut().then(() => document.location.href= "iniciar_Sesion.html");
});
