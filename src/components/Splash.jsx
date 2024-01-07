// Importing Hooks
import { useState } from "react";
import { useMutation } from "@apollo/client";

// Importing authorization stuff
import Auth from "../utils/auth";

// Importing Queries/Mutations
import { SIGNIN } from "../utils/mutations";
import { ADD_USER } from "../utils/mutations";
import logo2 from "../utils/logo2.png";


export default function Splash() {

  // Things associated with signing in
  const [signinEmail, setSigninEmail] = useState("");
  const [signinPw, setSigninPw] = useState("");

  const [login, { error, data }] = useMutation(SIGNIN);

  async function signinHandler(e) {
    e.preventDefault();
    console.log("signinEmail", signinEmail);
    console.log("signinPw", signinPw);

    try {
      const { data } = await login({
        variables: {
          email: signinEmail,
          password: signinPw
        }
      })
      console.log("data", data);
      Auth.login(data.login.token);
      console.log("SUCCESSFUL LOGIN!!");
    } catch (err) {
      console.error(err);
    }
  }

  // Things associated with creating a new account
  const [createUsername, setCreateUsername] = useState("");
  const [createEmail, setCreateEmail] = useState("");
  const [createPw, setCreatePw] = useState("");
  const [createRecon, setCreateRecon] = useState("");

  let passCheck = true;
  createPw === createRecon ? passCheck = true : passCheck = false;
  const [addUser, { bad }] = useMutation(ADD_USER);

  async function creationHandler(e) {
    e.preventDefault();

    if (createPw === createRecon) {
      try {
        const { data } = await addUser({
          variables: {
            username: createUsername,
            email: createEmail,
            password: createPw
          }
        })
      } catch (err) {
        console.error(err)
      }
    }

    setSigninEmail(createEmail);
    setSigninPw(createPw);
    setCreateEmail("");
    setCreatePw("");
    setCreateUsername("");
    setCreateRecon("");
    alert("click sign in!");
  }

  return (
    <>
      <div className="splash-container">
        {/* image stuff */}
        <div className="image-container flex justify-center">
          <div>
            <img src={logo2} alt="The Shipping Docks Logo" width="600" />
          </div>
        </div>
          <div className="flex flex-col text-center">
            <h2 className="text-2xl font-bold text-green-800 mb-2 italic">Welcome to THE 3D drop-shipping forum</h2>
            <p className="mt-2 text-base text-red-800 font-serif">The place to post advertisements, request orders or discuss 3D printing and Drop Shipping!</p>
          </div>

        {/* forms */}
        <div className="flex min-h-full flex-1 flex-col px-6 py-12 lg:px-8">
          <div className="sm:mx-auto sm:w-full sm:max-w-sm">
            <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-green-800">
              Sign in to your account
            </h2>
          </div>

          <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
            <form className="space-y-6" action="#" method="POST">
              <div>
                <label htmlFor="signin-email" className="block text-sm font-medium leading-6 text-green-800">
                  Email address
                </label>
                <div className="mt-2">
                  <input
                    id="signin-email"
                    name="signin-email"
                    value={signinEmail}
                    onChange={(event) => setSigninEmail(event.target.value)}
                    type="email"
                    autoComplete="email"
                    required
                    className="block w-full rounded-md py-1.5 px-2 border-4 border-green-800 text-green-600  bg-gray-800 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6"
                  />
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between">
                  <label htmlFor="signin-password" className="block text-sm font-medium leading-6 text-green-800">
                    Password
                  </label>
                </div>
                <div className="mt-2">
                  <input
                    id="signin-password"
                    value={signinPw}
                    onChange={(event) => setSigninPw(event.target.value)}
                    name="password"
                    type="password"
                    autoComplete="current-password"
                    required
                    className="block w-full rounded-md py-1.5 px-2 border-4 border-green-800 text-green-600 bg-gray-800  shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6"
                  />
                </div>
              </div>

              <div>
                <button
                  onClick={signinHandler}
                  type="submit"
                  className="flex w-full justify-center rounded-md border-4 border-red-800 bg-yellow-400 px-3 py-1.5 text-sm font-semibold leading-6 text-orange-600 shadow-sm hover:text-red-800 hover:bg-orange-600"
                >
                  Sign in
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* This is the code for the create new account */}

        <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
          <div className="sm:mx-auto sm:w-full sm:max-w-sm">
            <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-green-800">
              Create a New Account
            </h2>
          </div>

          <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
            <form className="space-y-6" action="#" method="POST">
              <div>
                <label htmlFor="create-email" className="block text-sm font-medium leading-6 text-green-800">
                  Email address
                </label>
                <div className="mt-2">
                  <input
                    id="create-email"
                    name="create-email"
                    value={createEmail}
                    onChange={(e) => setCreateEmail(e.target.value)}
                    type="email"
                    autoComplete="email"
                    required
                    className="block w-full rounded-md border-4 border-green-800 py-1.5 px-2 text-green-600 bg-gray-800 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="create-username" className="block text-sm font-medium leading-6 text-green-800">
                  Username
                </label>
                <div className="mt-2">
                  <input
                    id="create-username"
                    name="create-username"
                    type="username"
                    value={createUsername}
                    onChange={(e) => setCreateUsername(e.target.value)}
                    required
                    className="block w-full rounded-md border-4 border-green-800 py-1.5 px-2 text-green-600 bg-gray-800 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset  sm:text-sm sm:leading-6"
                  />
                </div>
              </div>

              <div className="bg-dark-800">
                <label htmlFor="create-password" className="block text-sm font-medium leading-6 text-green-800">
                  Password
                </label>
                <div className="mt-2">
                  <input
                    id="create-password"
                    name="create-password"
                    type="password"
                    value={createPw}
                    onChange={(e) => setCreatePw(e.target.value)}
                    required
                    className="block w-full rounded-md border-4 border-green-800 py-1.5 px-2 text-green-600 bg-gray-800 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="create-reconfirm" className="block text-sm font-medium leading-6 text-green-800">
                  Reconfirm
                </label>
                <div className="mt-2">
                  <input
                    id="create-reconfirm"
                    name="create-reconfirm"
                    type="password"
                    value={createRecon}
                    onChange={(e) => setCreateRecon(e.target.value)}
                    required
                    className="block w-full rounded-md border-4 border-green-800 py-1.5 px-2 text-green-600 bg-gray-800 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6"
                  />
                </div>
              </div>

              <div>
                <button
                  onClick={creationHandler}
                  type="submit"
                  className="flex w-full justify-center rounded-md bg-yellow-400 px-3 py-1.5 border-4 border-red-800 text-sm font-semibold leading-6 text-orange-600 shadow-sm hover:text-red-800 hover:bg-orange-600"
                >
                  Create
                </button>
              </div>
            </form>

          </div>
        </div>
        
      </div>
    </>
  )
}