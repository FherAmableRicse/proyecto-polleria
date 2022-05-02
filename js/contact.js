'use strict';
const documentReady = ()=>{
    const contactForm = document.getElementById('formContact');

   const enviar = e => {
     e.preventDefault();

     const formNombre =document.getElementById('name').value;
     const formApellido = document.getElementById('apellido').value;
     const formEmail = document.getElementById('email').value;
     const formCelular = parseInt(document.getElementById('celular').value);
     const formWarnings = document.getElementById('warnings');
   
     let message  = '';
     let error = false;
     let regexEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    
     formWarnings.innerHTML = '';


    if(formNombre.length < 4){
        message += `El nombre no es válido <br> `;
        error=true;
      
    }
    if(formApellido.length < 4){
        message += `El apellido no es válido <br> `;
        error=true;
    }
     console.log(regexEmail.test(formEmail));
     if(!regexEmail.test(formEmail)){
        message += `El email no es válido <br> `;
        error=true;
     }
    console.log(formCelular)
     if(isNaN(formCelular) || formCelular.toString().length<9 || formCelular.toString().length>9){
         
        message += `El celular no es válido <br> `;
        error=true;
    }
    
    if(error){
      
         formWarnings.innerHTML = message;
         setTimeout(() => {
        formWarnings.innerHTML='';
        }, 5000);
    }
    else {
        formWarnings.innerHTML = 'Datos Enviados';
        setTimeout(() => {
        formWarnings.innerHTML='';
        contactForm.reset();
        }, 2000);
    }
   };
    contactForm.addEventListener('submit', enviar);
};
window.document.addEventListener('DOMContentLoaded',documentReady);
