// [Selectors]

// Login form
const loginForm = document.querySelector('#login-form')
const loginTitle = loginForm.querySelector('#login-title')
const loginEmail = loginForm.querySelector('#login-email')
const loginPassword = loginForm.querySelector('#login-password')
const loginBtn = loginForm.querySelector('#login-button')
const loginError = loginForm.querySelector('#login-error')
const loginInputs = [loginEmail, loginPassword]

// Signup form
const signupForm = document.querySelector('#signup-form')
const signupTitle = signupForm.querySelector('#signup-title')
const signupName = signupForm.querySelector('#signup-name')
const signupEmail = signupForm.querySelector('#signup-email')
const signupPassword = signupForm.querySelector('#signup-password')
const signupBtn = signupForm.querySelector('#signup-button')
const signupError = signupForm.querySelector('#signup-error')
const signupInputs = [signupName, signupEmail, signupPassword]

// Other elements, pages, etc.
const links = document.querySelectorAll('.link')
const homePage = document.querySelector('#home-page')
const authPage = document.querySelector('#auth-page')
const logOutBtn = homePage.querySelector('a')
const homePageTitle = homePage.querySelector('h1')

// [Data]
let showLoginForm = true
const users = []

// [Functions]
const signUp = ()=> {
    signupError.innerText = ''
    if (!validateInputs(signupInputs)) {
        signupError.innerText = 'Please check inputs'
        return
    }
    const user = new User(
        signupEmail.value,
        signupPassword.value,
        signupName.value
    )
    users.push(user);
    cleanUpInputs(signupInputs)
    showLoginForm = true;
    showForm();
}

const logIn = ()=> {
    loginError.innerText = ''
    if (!validateInputs(loginInputs)) {
        loginError.innerText = 'Please check inputs'
        return;
    } 
    let loggedInUser;
    for (const user of users) {
        if (user.email === loginEmail.value && user.password === loginPassword.value) {
            loggedInUser = user;
            break;
        }
    }
    if (!loggedInUser) {
        loginError.innerText = 'Entered credentials are wrong, please check and try again'
        return;
    }
    cleanUpInputs(loginInputs)
    homePageTitle.innerText = `Hi, you are logged in as ${loggedInUser.name}`
    changeView(homePage, authPage)
}

const logOut = ()=> {
    homePageTitle.innerText = ''
    changeView(authPage, homePage)
    showLoginForm = true;
    showForm();
}

const cleanUpInputs = inputs=> {for (const input of inputs) input.value = ''}

const validateInputs =inputs=> {
    for (const input of inputs) 
        if (!input.value) return false;
        
    return true
}


const showForm = () =>{
    if (showLoginForm) changeView(loginForm, signupForm)
    else changeView(signupForm, loginForm)
}

const changeView=(show, hide)=>{
    show.style.display = 'block'
    hide.style.display = 'none'
}


// [Event Handlers]
function setLinkEventHandlers() {
    for (const link of links) {
        link.addEventListener('click', function () {
            showLoginForm = !showLoginForm
            showForm();
        })
    }
}

signupBtn.addEventListener('click', signUp)
loginBtn.addEventListener('click', logIn)
logOutBtn.addEventListener('click', logOut)

// [Models]
function User(email, password, name) {
     this.email = email
     this.password = password
     this.name = name
}

// [Initialization]

(()=>{
  showForm();
  setLinkEventHandlers();
  changeView(authPage, homePage);
})()