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

//log out
const logout = document.querySelector('#logout');
logout.addEventListener ('click', (e) => {
    e.preventDefault();
    auth.signOut().then(()=>{
        console.log ('user signed out')
    });
});

//log in
const loginForm = document.querySelector('#login-form');

loginForm.addEventListener('submit', (e) => {
    e.preventDefault();

    //get user info
    const email = loginForm['login-email'].value;
    const password = loginForm['login-password'].value;

    // login with email and password
    auth.signInWithEmailAndPassword(email, password).then (cred => {
        console.log(cred.user);
    })
    
    //Cerramos el modal login de material
    const modal = document.querySelector('#modal-login');
    M.Modal.getInstance(modal).close();
    // Reseteamos loginForm -(referencia inicial que teniamos al formulario)
    loginForm.reset();
})