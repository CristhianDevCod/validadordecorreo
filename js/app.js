"use strict";

// Espera que los elementos del DOM carguen completamente
document.addEventListener('DOMContentLoaded', function() {

    //Objeto de los valores
    const correo = {
        email: '',
        asunto: '',
        mensaje: ''
    }

    //  Establecer referencias a los campos
    const inputCorreo = document.querySelector('#email');
    const inputAsunto = document.querySelector('#asunto');
    const inputMensaje = document.querySelector('#mensaje');
    const formulario = document.querySelector('#formulario');
    const btnSubmit = document.querySelector('#formulario button[type="submit"]');
    const btnReset = document.querySelector('#botones button[type="reset"]');
    const spinner = document.querySelector('#spinner');
    
    //  Escuchar por el evento de input
    inputCorreo.addEventListener('input', LeerEntrada);
    inputAsunto.addEventListener('input', LeerEntrada);
    inputMensaje.addEventListener('input', LeerEntrada);
    btnReset.addEventListener('click', function(e){
        e.preventDefault();
        reiniciarComprobarFormulario();
    });
    // evento que escucha el evento submit 
    formulario.addEventListener('submit', enviarCorreo);

    // Leer la entrada del usuario
    function LeerEntrada(e){
        const elementoPadre = document.querySelector(`#${e.target.id}`).parentNode;
        
        // Comprueba si el campo esta vacío
        if (e.target.value.trim() === ''){ // Se utiliza trimp() para borrar espacios en blanco
            MostrarAlerta(e.target.id, elementoPadre);
            // Reiniciar el objeto correo
            correo[e.target.id] = '';
            // Modifica el botón de submit
            comprobarCorreo(correo);
            // Si pasa la validación 
            limpiarAlerta(elementoPadre);
            return;
        }
        
        // Validar correo valido
        if (e.target.id === 'email' && !validarCorreo(e.target.value)){
            MostrarAlerta(e.target.id, elementoPadre, true);
            // Reiniciar el objeto correo
            correo[e.target.id] = '';
            // Modifica el botón de submit
            comprobarCorreo();
            // Si pasa la validación 
            limpiarAlerta(elementoPadre, 4000);
            return;
        }
        limpiarAlerta(elementoPadre);
        
        // Asignar los valores a objeto 
        correo[e.target.id] = e.target.value.trim().toLocaleLowerCase();
        // Comprobación del objeto correo
        comprobarCorreo();
    }

    // Mostrar una alerta
    function MostrarAlerta(nombre, elementoPadre, mensaje = false){
        // validar si ya se ha generado una alerta
        const alerta = elementoPadre.querySelector('.alerta');
        if(alerta){
            alerta.remove();
        }
        // Generar una alerta en HTML
        const error = document.createElement('p');
        // Configurar el elemento creado
        error.textContent = `Hubo un error en ${nombre}`;
        if (mensaje){
            error.textContent = `El correo introducido es inadecuado, introduce uno correcto`;
        }
        error.classList.add('bg-red-600', 'text-center', 'text-white', 'p-2', 'alerta');
        // Agregar el elemento creado al formulario
        elementoPadre.appendChild(error);
    }

    // Limpiar alerta
    function limpiarAlerta(elementoPadre, tiempo = 3000){
        const alerta = elementoPadre.querySelector('.alerta');
        if (alerta){
            setTimeout( () => {
                alerta.remove();
            }, tiempo);
        }
    }

    // Validación de correo
    function validarCorreo(correo){
        const regex =  /^\w+([.-_+]?\w+)*@\w+([.-]?\w+)*(\.\w{2,10})+$/ 
        const resultado = regex.test(correo);
        return resultado;
    }
    
    // Validar el OBJETO correo
    function comprobarCorreo(){
        const arregloValores = Object.values(correo);
        const resultado = arregloValores.includes('');
        // Realizar la validación 
        if(!resultado){
            btnSubmit.classList.remove('opacity-50');
            btnSubmit.disabled = false;
            return;
        }
        btnSubmit.classList.add('opacity-50');
        btnSubmit.disabled = true;
    }

    function enviarCorreo(e){
        e.preventDefault();

        spinner.classList.add('flex');
        spinner.classList.remove('hidden');

        setTimeout(function(){
            spinner.classList.remove('flex');
            spinner.classList.add('hidden');
            reiniciarComprobarFormulario();
            // Creación de una alerta
            const alertaExito = document.createElement('p');
            alertaExito.classList.add('bg-green-500', 'text-white', 'p-2', 'text-center', 'rounded-lg', 'mt-10', 'font-bold', 'text-sm', 'uppercase', 'mensaje-centrado');
            alertaExito.textContent = 'Mensaje enviado correctamente';
            formulario.appendChild(alertaExito);
            
            setTimeout(function(){
                alertaExito.remove();
            },3000);

        }, 4000);
    }

    function reiniciarComprobarFormulario(){
        formulario.reset();
        // Reiniciar el objeto 
        correo.asunto = '';
        correo.email = '';
        correo.mensaje = '';
        // Validar el correo
        comprobarCorreo();
    }
});

