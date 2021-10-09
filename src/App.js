import { getAuth, signInWithPopup, GoogleAuthProvider, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";
import './App.css';
import initializeAuthentication from './Firebase/firebase.init';

initializeAuthentication();
const googleProvider = new GoogleAuthProvider();

function App() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [isLogin, setIsLogin] = useState(false);
  const auth = getAuth();

  const handleGoogleSignIn = () =>{
    signInWithPopup(auth, googleProvider)
    .then(result =>{
      const user = result.user
      console.log(user)
    })
  }

  const toggleLogIn = e =>{
    setIsLogin(e.target.checked)
  }

  const handleEmailChenge = e =>{
    setEmail(e.target.value)
  }

  const handlePasswordChenge = e =>{
    setPassword(e.target.value)
  }

  const handleRegistration = e =>{
    e.preventDefault();
    console.log(email, password)
    if(password.length < 6){
      setError('please enter must be 6 caracter')
      return;
    }
    if(!/(?=.*[A-Z].*[A-Z])/.test(password)){
      setError('You should be must use 2 uppercase')
      return;
    }
    
    // isLogin? processLogin(email, password) : registerNewUser(email, password)

    // or

    if(isLogin){
      processLogin(email, password)
    }
    else{
      registerNewUser(email, password)
    }
    
  }

  const processLogin = (email, password) =>{
    signInWithEmailAndPassword(auth, email, password)
    .then(result =>{
      const user = result.user
      console.log(user)
      setError('');
    })
    .catch(error =>{
      setError(error.message);
    })
  }

  const registerNewUser = (email, password) =>{
    createUserWithEmailAndPassword(auth, email, password)
    .then(result =>{
      const user = result.user
      console.log(user)
      setError('');
    })
    .catch(error =>{
      setError(error.message);
    })
  }
  return (
    <div className="mx-5">
      <h2 className="text-primary">Please { isLogin ? 'Login': 'register'}</h2>
      <form onSubmit={handleRegistration}>
        <div className="row mb-3">
          <label htmlFor="inputEmail3" className="col-sm-2 col-form-label">Email</label>
          <div className="col-sm-10">
            <input onBlur={handleEmailChenge} type="email" className="form-control" id="inputEmail3" required/>
          </div>
        </div>
        <div className="row mb-3">
          <label htmlFor="inputPassword3" className="col-sm-2 col-form-label">Password</label>
          <div className="col-sm-10">
            <input onBlur={handlePasswordChenge} type="password" className="form-control" id="inputPassword3" required/>
          </div>
        </div>
        <div className="row mb-3">
          <div className="col-sm-10 offset-sm-2">
            <div className="form-check">
              <input onChange={toggleLogIn} className="form-check-input" type="checkbox" id="gridCheck1"/>
              <label className="form-check-label" htmlFor="gridCheck1">
                Allready Registered?
              </label>
            </div>
          </div>
          <div className="row-mb-3 text-danger">{error}</div>
        </div>
        <button type="submit" className="btn btn-primary">
          { isLogin ? 'Login': 'register'}
          </button>
      </form>
      <br /><br /><br />
      <div>-----------------------------</div>
      <br /><br /><br />
      <button onClick={handleGoogleSignIn}>Google Sign In</button>
    </div>
  );
}

export default App;
