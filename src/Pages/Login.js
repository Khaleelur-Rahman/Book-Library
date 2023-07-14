import React, { useState , useEffect} from "react";
import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signOut, signInWithPopup} from 'firebase/auth';
import { auth, googleProvider} from '../backend/firebase-config';
import useGoBackHistory from '../components/custom-hooks/useGoBackHistory';
import { useNavigate } from "react-router-dom";

function Login () {

    
    const [loginEmail, setLoginEmail] = useState("");
    const [loginPassword, setLoginPassword] = useState("");
    const [user, setUser] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
          setUser(currentUser);
        });
    
        return () => unsubscribe();
      }, []);

    const login = async () => {
        try {
          const user = await signInWithEmailAndPassword(auth, loginEmail, loginPassword);
          // console.log(user);
          if(document.referrer.charAt(document.referrer.length-1) === '/') {
            window.location.href = "/BookForm";
          } else {
            navigate(-1);
          }
        } catch (error) {
          console.log(error.message);
        }
        // window.location.href = () => useGoBackHistory;
      }

    const LoginWithGoogle = async () => {
        try {
            const provider = googleProvider;
            const user = await signInWithPopup(auth, provider);
            // console.log(user);
            // console.log(document.referrer);
            if(document.referrer.charAt(document.referrer.length-1) === '/') {
              window.location.href = "/BookForm";
            } else {
              navigate(-1);
            }
        }   catch (error) {
            console.log(error.message);
        }
    }

    const gotoResgister = () => {
        window.location.href = "/register";
    }

    return (
        <div>
        {/* //     <h3 className="login-header">Login to access the features </h3>
        //     <div className="login-buttons">
        //       <div className="login">
        //         <input type='text' placeholder='Enter your email address' onChange={(event) => setLoginEmail(event.target.value)}></input>
        //         <input type='password' placeholder='Enter your password' onChange={(event) => setLoginPassword(event.target.value)}></input>
        //         <button onClick={login}>Login</button>
        //       </div>
        //       <div className="login-other-functions">
        //         <button onClick={LoginWithGoogle} className="login-with-google"></button>
        //         <button onClick={gotoResgister}>Register</button>
        //       </div>
        //     </div> */}

        
        <h3 class ="flex justify-center content-center  mb-8 tracking-wider text-gray-500 md:text-lg dark:text-gray-400">Login to access the features </h3>
        <div class="flex justify-center content-center mt-20">
        {/* <h3 className="login-header">Login to access the features </h3> */}
        <form class="bg-white shadow-md shadow-cyan-500/50 rounded px-8 pt-6 pb-8 mb-4">
          <div
            class="flex flex-start items-center justify-center lg:justify-center">
            <p class="mb-0 mr-4 text-lg font-semibold">Login with</p>

            <button
              type="button"
              data-te-ripple-color="light"
              class="mx-1 h-9 w-9 bg-sky-500/50 rounded-full bg-primary uppercase leading-normal shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]"
              onClick={LoginWithGoogle}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="mx-auto h-3.5 w-3.5"
                fill="currentColor"
                viewBox="0 0 24 24">
                <path
                  d="M7 11v2.4h3.97c-.16 1.029-1.2 3.02-3.97 3.02-2.39 0-4.34-1.979-4.34-4.42 0-2.44 1.95-4.42 4.34-4.42 1.36 0 2.27.58 2.79 1.08l1.9-1.83c-1.22-1.14-2.8-1.83-4.69-1.83-3.87 0-7 3.13-7 7s3.13 7 7 7c4.04 0 6.721-2.84 6.721-6.84 0-.46-.051-.81-.111-1.16h-6.61zm0 0 17 2h-3v3h-2v-3h-3v-2h3v-3h2v3h3v2z"
                  fill-rule="evenodd"
                  clip-rule="evenodd" />              
              </svg>
            </button>
          </div>

          <div
            class="my-4 flex items-center before:mt-0.5 before:flex-1 before:border-t before:border-neutral-300 after:mt-0.5 after:flex-1 after:border-t after:border-neutral-300">
            <p
              class="mx-4 mb-0 text-center font-semibold dark:text-white">
              Or
            </p>
          </div>

          <div class="relative mb-6 border-b-2 border-cyan-400" data-te-input-wrapper-init>
            <input 
            type="text" 
            id="email" 
            value={loginEmail}
            onChange={(event) => setLoginEmail(event.target.value)}
            class="block rounded-t-lg px-2.5 pb-2.5 pt-5 w-full text-sm text-gray-900 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" 
            placeholder=" " 
            />
            <label 
            for="email" 
            class="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-4 z-10 origin-[0] left-2.5 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4"
            >Email Address</label>
          </div>

          <div class="relative mb-6 border-b-2 border-cyan-400" data-te-input-wrapper-init>
            <input 
            type="password" 
            id="password" 
            value={loginPassword}
            onChange={(event) => setLoginPassword(event.target.value)}
            class="block rounded-t-lg px-2.5 pb-2.5 pt-5 w-full text-sm text-gray-900 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" 
            placeholder=" " 
            />
            <label 
            for="password" 
            class="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-4 z-10 origin-[0] left-2.5 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4"
            >Password</label>
          </div> 
          
          <div class="text-center lg:text-left">
            <div className="flex justify-end content-center">
              <button
                type="button"
                className="flex justify-center content-center text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                data-te-ripple-init
                data-te-ripple-color="light"
              >
                Login
              </button>
              </div>


            <p class="mb-0 mt-5 pt-1 text-sm font-semibold">
              Don't have an account?
              <a
                href="#!"
                class="ml-8 text-danger transition duration-150 ease-in-out hover:text-danger-600 focus:text-danger-600 active:text-danger-700"
                onClick={gotoResgister}
              >Register</a
              >
            </p>
          </div>
        </form>
        </div>
      </div>
    );
}

export default Login;