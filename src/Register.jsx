
import React, { useRef, useState, useEffect } from 'react';
import { faCheck, faTimes, faInfoCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const USER_REGEX = /^[A-z][A-z0-9-_]{3,23}$/;
//takes in 3 to 23 characters and accepts upper & lowercase  
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;

const Register = () => {
    const userRef = useRef();
    const errRef = useRef();      //errRef puts focus on the error 

       /* =====USER NAME INPUT ============ */

    const [ user, setUser ] = useState('');
    //user input bar is set to empty first
    const [ validName, setValidName ] = useState(false);
    //this is tied to whether the name validates or not
    const [ userFocus, setUserFocus ] = useState(false);
    //this is to indicate if there is a focus on the input field

    /* =====PASSWORD ============ */
    const [ pwd, setPwd ] = useState('');
    //password input bar is set to empty
    const [ validPwd, setValidPwd ] = useState(false);
    //checks if the password is valid
    const [ pwdFocus, setPwdFocus ] = useState(false);
    //checks if the password input bar is in focus

       /* =====SET MATCH ============ */
    const [ matchPwd, setMatchPwd ] = useState('');
    const [ validMatch, setValidMatch ] = useState(false);
    const [ matchFocus, setMatchFocus ] = useState(false);

      /* =====ERROR AND SUCCESS MESSAGE ============ */
    const [ errMsg, setErrMsg ] = useState('');
    const [ success, setSuccess ] = useState(false);

    useEffect(() => {
        userRef.current.focus() //for setting the focus onLoad
    }, [])

         /* =====Validates the username field ============ */
    useEffect(() => {
        const result = USER_REGEX.test(user);
        console.log(result);
        console.log(user);
        setValidName(result);
    }, [ user ]); //the user state is in the dependency array, so anytime it changes, we will check the validation of that field.
    
    /* =====Validates the password field ============ */
    useEffect(() => {
        const result = PWD_REGEX.test(pwd);
        console.log(result);
        console.log(pwd);
        setValidPwd(result);
        const match = pwd === matchPwd
        setValidMatch(match)
    }, [ pwd, matchPwd ])
    
    /* =====Reload Error message ============ */
    useEffect(() => {
        setErrMsg('');
    }, [ user, pwd, matchPwd ]); //This reloads the error message based on the user changes in the form.
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        //if button enabled with Js hack, this is to prevent 
        const v1 = USER_REGEX.test(user);
        const v2 = PWD_REGEX.test(pwd);
        if (!v1 || v2)
        {
            setErrMsg("Invalid Entry")
        }
        //if no backend setup
        console.log(user, pwd);
        setSuccess(true);
    }
    return (
      <>
            { success ? (
                <section>
                    <h1>
                        Success!
                    </h1>
                    <p>
                        <a href="#">Sign In </a>
                    </p>
                </section>
        ) : (
    <section>
          {/* This will hold an error if it exists */ }
          <p ref={errRef} className = {errMsg ? "errmsg" : "offscreen"} aria-live= "assertive">
              {errMsg}   {/* This holds the current error message, Assertive means it will be announced with the screen reader*/}
          </p>
          <h1> Register </h1>
          <form onSubmit = {handleSubmit}>
              
              {/* Username field */}
              <label htmlFor="username">
                  Username:
                    {/* if it is valid username*/}
                  <span className={ validName ? "valid" : "hide" }>
                      <FontAwesomeIcon icon = {faCheck} />
                  </span>

                     {/* if it is invalid username or not in focus */}
                  <span className={validName || !user ? "hide" : "invalid"}>
                      <FontAwesomeIcon icon={ faTimes } />
                  </span>
              </label>

              <input
                  type="text"
                  id="username"   
                  ref={ userRef }
                  autoComplete='off'
                  onChange={ (e) => setUser(e.target.value) }
                  required
                  aria-invalid={ validName ? "false" : "true" }
                  aria-describedby='uidnote'
                  onFocus={ () => setUserFocus(true) }
                  onBlur = {()=> setUserFocus(false)}
              />
              {/* Input : id: username  should match label: htmlFor . 
              ref: userRef lets us set focus on the input  */ }
              <p id="uidnote" className={ userFocus && user && !validName ? "instructions" : "offscreen" }>
                  <FontAwesomeIcon icon={ faInfoCircle } />
                  4 to 24 characters. <br />
                  Must begin with a letter. <br />
                  Letters, numbers, underscores, hyphens allowed.
              </p>
            
              {/*Password Field  */ }
              <label htmlFor="password">
                  Password:
                    {/* if it is valid password*/}
                  <span className={ validPwd ? "valid" : "hide" }>
                      <FontAwesomeIcon icon = {faCheck} />
                  </span>

                     {/* if it is invalid password or not in focus */}
                  <span className={validPwd || !pwd ? "hide" : "invalid"}>
                      <FontAwesomeIcon icon={ faTimes } />
                  </span>
              </label>

              <input
                  type="password"
                  id="password"   
                 onChange={ (e) => setPwd(e.target.value) }
                  required
                  aria-invalid={ validPwd ? "false" : "true" }
                  aria-describedby='pwdnote'
                  onFocus={ () => setPwdFocus(true) }
                  onBlur = {()=> setPwdFocus(false)}
              />
             
              <p id="pwdnote" className={ pwdFocus && !validPwd ? "instructions" : "offscreen" }>
                  <FontAwesomeIcon icon={ faInfoCircle } />
                  8 to 24 characters. <br />
                  Must include uppercase and lowercase letters, a number and a special character. <br />
                  Allowed special characters: <span aria-label='exclamation mark'>!</span> <span aria-label='at symbol'>@</span>
                  <span aria-label='dollar sign'>$</span> <span aria-label='percent'>%</span>
              </p>

              {/*Confirm Password Field  */ }
              
               <label htmlFor="confirm_pwd">
                  Confirm Password:
                    {/* if it is valid password*/}
                  <span className= { validMatch && matchPwd ? "valid" : "hide" }>
                      <FontAwesomeIcon icon = {faCheck} />
                  </span>

                     {/* if it is invalid password or not in focus */}
                  <span className={validMatch || !matchPwd ? "hide" : "invalid"}>
                      <FontAwesomeIcon icon={ faTimes } />
                  </span>
              </label>

              <input
                  type="password"
                  id="confirm_pwd"   
                 onChange={ (e) => setMatchPwd(e.target.value) }
                  required
                  aria-invalid={ validMatch ? "false" : "true" }
                  aria-describedby='confirmnote'
                  onFocus={ () => setMatchFocus(true) }
                  onBlur = {()=> setMatchFocus(false)}
              />

<p id="confirmnote" className={ matchFocus && !validMatch ? "instructions" : "offscreen" }>
                  <FontAwesomeIcon icon={ faInfoCircle } />
                 Must match the first password input field
              </p>
              <button disabled = { !validName || !validPwd || !validMatch ? true : false }>
                  Sign Up
              </button>
          </form>
          <p>
              Already Registered? <br/>
              <span className="line">
                  {/* Place router link here */ }
                  <a href="#"> Sign in </a>
              </span>
          </p>

                    </section>
            ) }  
            </>
  )
}

export default Register
