// script.js
  // Fecha objetivo de la cuenta regresiva
  var fechaCuentaRegresiva = "2025-03-15T12:30:00";
  var countDownDate = new Date(fechaCuentaRegresiva).getTime();
  
  // Actualizar el contador cada 1 segundo
  var x = setInterval(function() {
      // Obtener la fecha y hora actual
      var now = new Date().getTime();
  
      // Calcular la distancia entre ahora y la fecha objetivo
      var distance = countDownDate - now;
  
      // Cálculos de días, horas, minutos y segundos
      var days = Math.floor(distance / (1000 * 60 * 60 * 24));
      var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      var seconds = Math.floor((distance % (1000 * 60)) / 1000);
  
      // Actualizar los elementos en el DOM
      document.querySelector("#dias .number").textContent = days;
      document.querySelector("#horas .number").textContent = hours;
      document.querySelector("#minutos .number").textContent = minutes;
      document.querySelector("#segundos .number").textContent = seconds;
  
      // Si la cuenta regresiva ha terminado
      if (distance < 0) {
          clearInterval(x);
          document.getElementById("reloj").innerHTML = '<p class="fin-cuenta">' +
              "¡La cuenta regresiva ha terminado!" + '</p>';
      }
  }, 1000);


  // Selecciona los elementos
const overlay = document.getElementById('overlay');
const closeOverlayButton = document.getElementById('closeOverlay');

// Añade un evento al botón para cerrar el overlay
closeOverlayButton.addEventListener('click', () => {
    overlay.style.display = 'none'; // Oculta el overlay
    const audio = document.getElementById('background-music');
    audio.style.display='flex';

    audio.play(); // Inicia la reproducción automáticamente
    window.addEventListener('beforeunload', () => {
      audio.pause();
    });
});



// Seleccionar todos los inputs y selects de invitados
const inputs = document.querySelectorAll('.nombreInvitados');
const selects = document.querySelectorAll('.comboTipoPersona');

// Asignar evento de escucha a cada input
inputs.forEach((input, index) => {
  input.addEventListener('input', () => {
    const select = selects[index];
    if (input.value.trim() !== '') {
      // Si el campo no está vacío, hacer el select requerido
      select.setAttribute('required', 'required');
    } else {
      // Si está vacío, quitar el atributo requerido
      select.removeAttribute('required');
    }
  });
});


document.getElementById('formularioConfirmacion').addEventListener('submit', function(e) {
    e.preventDefault();

    const loadingContainer = document.getElementById('loading-container');
    loadingContainer.style.display = 'flex';
    var formData = new FormData(this);

    fetch('https://script.google.com/macros/s/AKfycbxotpMBBY9HRyZyAqexGEJTo1t71owQ7WSl0ITerKT2X53h8Z645PWn8AiKqDMy5YPwsw/exec', {
        method: 'POST',
        body: formData
    })
    .then(response => response.json())
    .then(data => {
        if (data.status === 'success') {
            document.getElementById('seccionFormulario').style.display = 'none';
            document.getElementById('confirmacionRecibida').style.display = 'flex';
            document.getElementById('divMensajeAgradecimiento').style.display = 'flex';
            
            // Mostrar solo el mensaje en el contenedor específico
            document.getElementById('resultado').innerText = data.message;
            if(data.invitado1 && data.invitado1.trim()!=""){
              document.getElementById('confirmacion1').style.display='flex';
              document.getElementById('confirmaInvitado1').innerText = data.invitado1;
              document.getElementById('confirmaOpcion1').innerText = data.opcion1;
            }

            if(data.invitado2 && data.invitado2.trim()!=""){
              document.getElementById('confirmacion2').style.display='flex';
              document.getElementById('confirmaInvitado2').innerText = data.invitado2;
              document.getElementById('confirmaOpcion2').innerText = data.opcion2;
            }

            if(data.invitado3 && data.invitado3.trim()!=""){
              document.getElementById('confirmacion3').style.display='flex';
              document.getElementById('confirmaInvitado3').innerText = data.invitado3;
              document.getElementById('confirmaOpcion3').innerText = data.opcion3;
            }

            if(data.invitado3 && data.invitado4.trim()!=""){
              document.getElementById('confirmacion4').style.display='flex';
              document.getElementById('confirmaInvitado4').innerText = data.invitado4;
              document.getElementById('confirmaOpcion4').innerText = data.opcion4;
            }

            if(data.invitado3 && data.invitado5.trim()!=""){
              document.getElementById('confirmacion5').style.display='flex';
              document.getElementById('confirmaInvitado5').innerText = data.invitado5;
              document.getElementById('confirmaOpcion5').innerText = data.opcion5;
            }

            if(data.invitado3 && data.invitado6.trim()!=""){
              document.getElementById('confirmacion6').style.display='flex';
              document.getElementById('confirmaInvitado6').innerText = data.invitado6;
              document.getElementById('confirmaOpcion6').innerText = data.opcion6;
            }
            if(data.intolerancias && data.intolerancias.trim()!=""){
              document.getElementById('divIntolerancias').style.display='flex';
              document.getElementById('confirmaIntolerancias').innerText = data.intolerancias;
            }

            if(data.comentarios && data.comentarios.trim()!=""){
              document.getElementById('divComentarios').style.display='flex';
              document.getElementById('confirmaComentarios').innerText = data.comentarios;
            }

        } else {
            document.getElementById('seccionFormulario').style.display = 'none';
            document.getElementById('resultado').innerText = 'Ocurrió un error';
        }
        
        loadingContainer.style.display = 'none';
    })
    .catch(error => {
      console.error('Error:', error)
      loadingContainer.style.display = 'none';
    });
});

