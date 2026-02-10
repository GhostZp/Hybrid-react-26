import {useEffect, useState} from 'react';
import {useUser} from '../hooks/apiHooks';
import useForm from '../hooks/formHooks';
import type {RegisterCredentials} from '../types/LocalTypes';

const RegisterForm = () => {
  const {postRegister, getUsernameAvailable, getEmailAvailable} = useUser();
  const [usernameAvailable, setUsernameAvailable] = useState<boolean>(true);
  const [emailAvailable, setEmailAvailable] = useState<boolean>(true);
  const [registerError, setRegisterError] = useState<string>('');

  const initValues: RegisterCredentials = {
    username: '',
    password: '',
    email: '',
  };
  const doRegister = async () => {
    try {
      // eslint-disable-next-line react-hooks/immutability
      const userResponse = await getUsernameAvailable(inputs.username);
      setUsernameAvailable(userResponse.available);
      const emailResponse = await getEmailAvailable(inputs.email);
      setEmailAvailable(emailResponse.available);
      if (userResponse.available && emailResponse.available) {
        const result = await postRegister(inputs as RegisterCredentials);
        console.log('post registration result', result);
      }
    } catch (error) {
      console.log((error as Error).message);
      setRegisterError((error as Error).message);
    }
  };

  const {inputs, handleInputChange, handleSubmit} = useForm(
    doRegister,
    initValues,
  );

  useEffect(() => {
    const checkUsername = async () => {
      if (inputs.username.length > 2) {
        try {
          const userResponse = await getUsernameAvailable(inputs.username);
          setUsernameAvailable(userResponse.available);
        } catch (error) {
          console.log((error as Error).message);
        }
      }
    };
    checkUsername();
  }, [inputs.username, getUsernameAvailable]);

  useEffect(() => {
    const checkEmail = async () => {
      if (inputs.email.length > 4) {
        try {
          const response = await getEmailAvailable(inputs.email);
          setEmailAvailable(response.available);
        } catch (error) {
          console.log((error as Error).message);
        }
      }
    };
    checkEmail();
  }, [inputs.email, getEmailAvailable]);

  return (
    <>
      <h2>Register</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="loginusername">Username</label>
          <input
            name="username"
            type="text"
            id="loginusername"
            onChange={handleInputChange}
            autoComplete="username"
          />
          {!usernameAvailable && <p>Username is already taken</p>}
        </div>
        <div>
          <label htmlFor="email">Email</label>
          <input
            name="email"
            type="text"
            id="email"
            onChange={handleInputChange}
            autoComplete="email"
          />
          {!emailAvailable && <p>Email address not available</p>}
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input
            name="password"
            type="password"
            id="password"
            onChange={handleInputChange}
          />
          {registerError && <p>{registerError}</p>}
        </div>
        <button
          type="submit"
          // TODO: disable when form is not valid
        >
          Register
        </button>
      </form>
    </>
  );
};

export default RegisterForm;
