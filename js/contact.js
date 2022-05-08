
export const contact = () => {
    const contacto = document.getElementById('contacto');
    const contactForm = document.getElementById('formContact');

    const enviar = e => {
        e.preventDefault();

        const formNombre = document.getElementById('name').value;
        const formApellido = document.getElementById('apellido').value;
        const formEmail = document.getElementById('email').value;
        const formCelular = parseInt(document.getElementById('celular').value);

        let message = '';
        let error = false;
        let regexEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

        if (formNombre.length < 4) {
            message += `El nombre no es válido <br> `;
            error = true;

        }
        if (formApellido.length < 4) {
            message += `El apellido no es válido <br> `;
            error = true;
        }
        console.log(regexEmail.test(formEmail));
        if (!regexEmail.test(formEmail)) {
            message += `El email no es válido <br> `;
            error = true;
        }
        console.log(formCelular)
        if (isNaN(formCelular) || formCelular.toString().length < 9 || formCelular.toString().length > 9) {

            message += `El celular no es válido <br> `;
            error = true;
        }

        if (error) {
            console.log(screen.width)
            if (screen.width > 854) {
                Swal.fire({
                    icon: 'error',
                    html: message,
                    width: '35rem',
                })
            }
            else if (screen.width < 854) {
                Swal.fire({
                    icon: 'error',
                    html: message,
                    width: '22rem',
                })
            }

        }
        else {
            if (screen.width > 854) {
                Swal.fire({
                    position: 'top-center',
                    icon: 'success',
                    title: 'Tus datos han sido enviados',
                    showConfirmButton: false,
                    timer: 2500,
                    width: '35rem',

                })
                contactForm.reset();
            }
            else if (screen.width < 854) {
                Swal.fire({
                    position: 'top-center',
                    icon: 'success',
                    title: 'Tus datos han sido enviados',
                    showConfirmButton: false,
                    timer: 2500,
                    width: '22rem'
                })
                contactForm.reset();
            }

        }
    };
    contactForm.addEventListener('submit', enviar);
};

export default contact;

