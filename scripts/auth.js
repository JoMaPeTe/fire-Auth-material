// listen for auth status changes
auth.onAuthStateChanged(user => {
    if (user) {
        //get data
        db.collection('guides').onSnapshot(snapshot => {
            setupGuides(snapshot.docs);
            setupUI(user);
        }, err => {
            console.log(err.message);
        });
    } else {
        setupUI();
        //ponemos un array vacio como datos
        setupGuides([]);
    }
});

// create new guide
const createForm = document.querySelector('#create-form');
createForm.addEventListener('submit', (e) => {
    e.preventDefault();

    db.collection('guides').add({
        title: createForm['title'].value,
        content: createForm['content'].value
    }).then(() => {
        //close the modal and reset form
        const modal = document.querySelector('#modal-create');
        M.Modal.getInstance(modal).close();
        createForm.reset();
    }).catch(err => {
        console.log(err.message);
    })
})


//signup
const signupForm = document.querySelector('#signup-form');
signupForm.addEventListener('submit', (e) => {
    e.preventDefault();

    //get user info
    const email = signupForm['signup-email'].value;
    const password = signupForm['signup-password'].value;

    // signup with email and password
    auth.createUserWithEmailAndPassword(email, password).then(cred => {
       //creamos nueva colección users, usamos doc(en vez de add) para poder pasar user.uid de auth
       //creamos el campo bio dentro de la colección, con set
       return db.collection('users').doc(cred.user.uid).set({     
        bio: signupForm['signup-bio'].value
       });
        // console.log(cred.user)); 
    }).then(() => {
          //Cerramos el modal signup de material
          const modal = document.querySelector('#modal-signup');
          M.Modal.getInstance(modal).close();
          // Reseteamos signupForm -(referencia inicial que teniamos al formulario)
          signupForm.reset();
    });
});


//log out
const logout = document.querySelector('#logout');
logout.addEventListener('click', (e) => {
    e.preventDefault();
    auth.signOut()
    // .then(()=>{
    // console.log ('user signed out')
    // });
});

//log in
const loginForm = document.querySelector('#login-form');

loginForm.addEventListener('submit', (e) => {
    e.preventDefault();

    //get user info
    const email = loginForm['login-email'].value;
    const password = loginForm['login-password'].value;

    // login with email and password
    auth.signInWithEmailAndPassword(email, password).then(() => {
        // console.log(cred.user);
        //Cerramos el modal login de material
    const modal = document.querySelector('#modal-login');
    M.Modal.getInstance(modal).close();
    // Reseteamos loginForm -(referencia inicial que teniamos al formulario)
    loginForm.reset();
    })

    
})