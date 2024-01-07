import { useState } from 'react'
import { Disclosure } from '@headlessui/react'
import User from './User';
import Sub0 from './Sub0';
import Sub1 from "./Sub1";
import Sub2 from "./Sub2";
import logo from "../utils/logo.png"


const navigation = [
  { name: "Buy", href: "#", current: false },
  { name: "Advertise", href: "#", current: false },
  { name: "Discuss", href: "#", current: false },
  { name: "Your Profile", href: "#", current: false },
]

// For populating class names from TailwindsCSS
function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function Taskbar() {

  const [dashboard, setDashboard] = useState("Your Profile");

  function styleHandler(e) {
    e.preventDefault();
    setDashboard(e.target.text);
  }

  function renderHandler() {
    if (dashboard === "Your Profile") { return <User />};
    if (dashboard === "Buy") { return <Sub0 currentPage={dashboard} />};
    if (dashboard === "Advertise") { return <Sub1 currentPage={dashboard} /> };
    if (dashboard === "Discuss") { return <Sub2 currentPage={dashboard} /> };
  }

  function signOutHandler() {
    delete localStorage.id_token;
    console.log(localStorage);
    window.location.reload(true);
  }

  return (
    <>
      <div className="min-h-full">
        <Disclosure as="nav" className="bg-green-900">
          {({ open }) => (
            <>
              <div className="max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="flex h-16 items-center justify-between">
                  <div className="flex items-center">
                    <div className="flex-shrink-0">
                      <img src={logo} alt="company logo" />
                    </div>
                    <div className="md:block">
                      <div className="ml-10 flex items-baseline space-x-4">
                        {navigation.map((item) => (
                          <a
                            key={item.name}
                            href={item.href}
                            onClick={styleHandler}
                            className={classNames(
                              item.current
                                ? 'bg-orange-700 text-black'
                                : 'text-black hover:bg-orange-600 hover:text-black',
                              'rounded-md px-3 py-2 text-sm font-medium'
                            )}
                            aria-current={item.current ? 'page' : undefined}
                          >
                            {item.name}
                          </a>
                        ))}
                        <a
                          key="sign-out"
                          href="#"
                          onClick={signOutHandler}
                          className="text-red-800 hover:bg-orange-600  hover:text-black rounded-md px-3 py-2 text-sm font-medium"
                        >
                          Sign Out
                        </a>
                      </div>
                    </div>
                  </div>
                  <div>
                    <p id="site-name" className='text-xl text-yellow-300 font-serif font-bold italic'>The Shipping Docks</p>
                  </div>
                </div>
              </div>
            </>
          )}
        </Disclosure>

        <header className="bg-white shadow">
          <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
            <h1 className="text-3xl font-bold tracking-tight text-green-800">{dashboard}</h1>
          </div>
        </header>
        <main>
          <div className="mx-auto max-w-7xl py-6 sm:px-6 lg:px-8">{/* Your content */}</div>
        </main>
      </div>
      <div>
        {renderHandler()}
      </div>
    </>
  )
}