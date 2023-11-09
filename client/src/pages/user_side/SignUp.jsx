import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "../../axios/axios_instance";

const SignUp = ({to}) => {
  const navigate = useNavigate();

  const initialState = {
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    usernameError: false,
    emailError: false,
    passwordError: false,
    confirmPasswordError: false,
  }
  const [formdata, setFormdata] = useState(initialState);
  
  const handleSignUp = (e) => {
    e.preventDefault()
    if (formdata.username.trim().length < 6) {
      setFormdata({ ...formdata, usernameError: true });
      return
    }
    const emailRegex = /^[A-Za-z0-9._%-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$/;
    if (!emailRegex.test(formdata.email)) {
      setFormdata({ ...formdata, emailError: true });
      return
    }
    if (formdata.password.trim().length < 6) {
      return setFormdata({ ...formdata, passwordError: true });
    }

    axios.post('/signup', {
      username: formdata.username,
      email: formdata.email,
      password: formdata.password,
      confirmPassword: formdata.confirmPassword,
    })
    .then(function (response) {
      console.log(response);
      navigate(to);
    })
    .catch(function (error) {
      console.log(error);
    });
  }

useEffect(() => {
  if(formdata.password !== formdata.confirmPassword)
    setFormdata({...formdata, confirmPasswordError: true})
  else
    setFormdata({...formdata, confirmPasswordError: false})
},[ formdata.password, formdata.confirmPassword])

const handleChange = (e) => {
  setFormdata({...formdata, [e.target.id]: e.target.value });
}

  return (
    <div>
      <section className="bg-gray-50 dark:bg-gray-900">
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
          <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
            <div className=" p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 className="text-center first-letter: text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                Create account
              </h1>
              <form className="space-y-4 md:space-y-6" onSubmit={handleSignUp}>
                <div>
                  <label
                    htmlFor="email"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Username
                  </label>
                  <input
                    type="text"
                    id="username"
                    value={formdata.username}
                    onChange={handleChange}
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="username"
                    required
                  />
                  {formdata.usernameError && (
                    <label
                    className="block mb-2 text-sm from-neutral-50 text-red-800"
                  >
                    Username must be at least 6 characters
                  </label>
                  )}
                </div>
                <div>
                  <label
                    htmlFor="email"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Your email
                  </label>
                  <input
                    type="email"
                    id="email"
                    value={formdata.email}
                    onChange={handleChange}
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="name@company.com"
                    required
                  />
                  {formdata.emailError && (
                    <label
                    className="block mb-2 text-sm from-neutral-50 text-red-800"
                  >
                    Enter a valid email address
                  </label>
                  )}
                </div>
                <div>
                  <label
                    htmlFor="password"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Password
                  </label>
                  <input
                    type="password"
                    name="password"
                    id="password"
                    value={formdata.password}
                    onChange={handleChange}
                    placeholder="••••••••"
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    required
                  />
                  { formdata.passwordError && (
                    <label
                    htmlFor="confirm-password"
                    className="block mb-2 text-sm from-neutral-50 text-red-800"
                  >
                    Password must be at least 6 letters and use characters and numbers for strong passwords.
                  </label>
                  )}
                </div>
                <div>
                  <label
                    htmlFor="confirm-password"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Confirm password
                  </label>
                  <input
                    type="password"
                    name="confirmPassword"
                    id="confirmPassword"
                    value={formdata.confirmPassword}
                    onChange={handleChange}
                    placeholder="••••••••"
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    required
                  />
                  {formdata.confirmPasswordError && (
                    <label
                    htmlFor="confirm-password"
                    className="block mb-2 text-sm from-neutral-50 text-red-800"
                  >
                    Passwords do not match
                  </label>
                  )}
                </div>
                
                
                <button
                  type="submit"
                  className="w-full text-white bg-purple-800 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                >
                  Create an account
                </button>
                <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                  Already have an account?{" "}
                  <Link to='/login' >
                  <span
                    className="font-medium text-primary-600 hover:underline dark:text-primary-500"
                  >
                    Login here
                  </span>
                  </Link>
                </p>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default SignUp;
