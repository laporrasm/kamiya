// Your web app's Firebase configuration
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
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  firebase.analytics();
  firebase.auth();
  const db = firebase.database();
  coleccionDoctores = db.ref().child('doctores');
  coleccionClinicas = db.ref().child('clinicas');
  bodyDoctores = $('#bodyDoctores').val();

  let clinicas = [];

  db.ref('/clinicas').once('value').then(snapshot => {
    Object.entries(snapshot.val()).forEach(element => {
      clinicas.push({ id: element[0], ...element[1] })
    });
    console.log(clinicas);
  });

  //console.log(bodyDoctores);
  $('form').submit(function(e){
    e.preventDefault();
    let id = $('#id').val();
    let codigo = $('#codigo').val();
    let nombre = $('#nombre').val();
    let apellido = $('#apellido').val();
    let especialidad = $('#especialidad').val();
    let clinica = { id: $( "#clinica" ).val(), nombre: $( "#clinica option:selected" ).text() };
    let idFirebase = id;
    if(idFirebase == ''){
     idFirebase = coleccionDoctores.push().key;
    };
    data = { codigo, nombre, apellido, especialidad, clinica };
    actualizacionData = {};
    actualizacionData[`/${idFirebase}`] = data;
    coleccionDoctores.update(actualizacionData);
    id = '';
    $('form').trigger('reset');
    $('#modalAltaEdicion').modal('hide');
  });
  const iconoEditar = '<svg class="bi bi-pencil-square" width="1em" height="1em" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456l-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/><path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"/></svg>';
  const iconoBorrar = '<svg class="bi bi-trash" width="1em" height="1em" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"/><path fill-rule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4L4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"/></svg>';
  function mostrarDoctores({codigo, nombre, apellido, especialidad, clinica}){
    return `
    <td>${codigo}</td>
    <td>${nombre}</td>
    <td>${apellido}</td>
    <td>${especialidad}</td>
    <td>${(clinica) ? clinica.nombre : ''}</td>
    <td><button class="btnEditar btn btn-secondary" data-toggle="tooltip" title="Editar">${iconoEditar}</button><button class="btnBorrar btn btn-danger" data-toggle="tooltip" title="Borrar">${iconoBorrar}</button></td>
    `
  };
  //CHILD_ADDED
  coleccionDoctores.on('child_added', data =>{
    let tr = document.createElement('tr')
    tr.id = data.key
    tr.innerHTML = mostrarDoctores(data.val())
    document.getElementById('bodyDoctores').appendChild(tr)
  });
  //CHILD_CHANGED
  coleccionDoctores.on('child_changed', data =>{
    let nodoEditado = document.getElementById(data.key)
    nodoEditado.innerHTML = mostrarDoctores(data.val())
  });
  //CHILD_REMOVED
  coleccionDoctores.on('child_removed', data =>{
    let nodoEditado = document.getElementById(data.key)
    document.getElementById('bodyDoctores').removeChild(nodoEditado)
  });
  //Programación de los botones
  $('#btnNuevo').click(function(){
    $('#id').val('');
    $('#codigo').val('');
    $('#nombre').val('');
    $('#apellido').val('');
    $('#especialidad').val('');
    document.getElementById('clinica').innerHTML = '';
    clinicas.forEach(element => { 
      $('#clinica').append(`<option value="${element.id}">${element.nombre}</option>`)
    })
    $('form').trigger('reset');
    $('#modalAltaEdicion').modal('show');
  });
  $('#tablaProductos').on('click', '.btnEditar', function(){
    let id = $(this).closest('tr').attr('id');
    let codigo = $(this).closest('tr').find('td:eq(0)').text();
    let nombre = $(this).closest('tr').find('td:eq(1)').text();
    let apellido = $(this).closest('tr').find('td:eq(2)').text();
    let especialidad = $(this).closest('tr').find('td:eq(3)').text();
    let clinica = $(this).closest('tr').find('td:eq(4)').text();
    $('#id').val(id);
    $('#codigo').val(codigo);
    $('#nombre').val(nombre);
    $('#apellido').val(apellido);
    $('#especialidad').val(especialidad);
    document.getElementById('clinica').innerHTML = '';
    clinicas.forEach(element => {
      if (clinica == element.nombre) $('#clinica').append(`<option selected value="${element.id}">${element.nombre}</option>`);
      else $('#clinica').append(`<option value="${element.id}">${element.nombre}</option>`)
    })
    $('#modalAltaEdicion').modal('show');
  });
  $('#tablaProductos').on('click', '.btnBorrar', function(){
      Swal.fire({
        title: '¿Está seguro de eliminar el doctor?',
        text: "¡Está operación no se puede revertir!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#d33',
        cancelButtonColor: '#3085d6',
        confirmButtonText: 'Borrar'
        }).then((result) => {
        if (result.value) {
            let id = $(this).closest('tr').attr('id'); //capturamos el atributo ID de la fila  
            db.ref(`doctores/${id}`).remove() //eliminamos el producto de firebase      
            Swal.fire('¡Eliminado!', 'El producto ha sido eliminado.','success')
        }
        })        
  });

const signOutBtn = document.querySelector('#cerrar');

signOutBtn.addEventListener("click", () => {
  firebase.auth().signOut().then(() => document.location.href= "iniciar_Sesion.html");
  localStorage.removeItem('userEmail');
});