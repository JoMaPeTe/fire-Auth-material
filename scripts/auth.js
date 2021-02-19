//signup
const signupForm = document.querySelector('#signup-form');
signupForm.addEventListener('submit', (e) => {
    e.preventDefault();

    //get user info
    const email = signupForm['signup-email'].value;
    const password = signupForm['signup-password'].value;

    // signup with email and password
    auth.createUserWithEmailAndPassword(email, password).then( cred => 
        console.log(cred.user));
        //Cerramos el modal signup de material
        const modal = document.querySelector('#modal-signup');
        M.Modal.getInstance(modal).close();
        // Reseteamos signupForm -(referencia inicial que teniamos al formulario)
        signupForm.reset();
})