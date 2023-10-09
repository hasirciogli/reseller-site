import { useEffect, useState } from 'react'

import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { ValidateToken } from './api/TokenApi';
import { LoginPage } from './pages/auth/LoginPage';
import { RegisterPage } from './pages/auth/RegisterPage';
import { UiLayout } from './pages/ui/UiLayout';
import { NotFoundPage } from './pages/error/NotFoundPage';

function App() {
  const [baseloading, setBaseLoading] = useState(true);
  const [userLoading, setUserLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    async function initex() {
      const accountToken = await localStorage.getItem("accountToken");
      if (accountToken) {
        const validateResponse = await ValidateToken(accountToken);
        if (validateResponse.status) {
          setIsLoggedIn(true);
        }

        setUserLoading(false);
        setBaseLoading(false);
      } else {
        setUserLoading(false);
        setBaseLoading(false);
      }
    }
    initex();
  }, []);

  return (
    <div className='bg-noxy-primary w-full h-screen text-noxy-primary'>
      {baseloading || userLoading ?

        <>
          <div className="flex w-full h-screen items-center justify-center z-[1]">
            <div className="animate-spin w-20 h-20 rounded-full border-2 border-t-transparent border-[#E7E7E7]"></div>
          </div>

          <div className="flex w-full h-full absolute top-0 left-0 z-[0]">
            <div className="flex w-full mt-10 px-4 sm:px-20 lg:px-10">
              <svg viewBox="0 0 800 600" fill="#151617" strokeWidth={0} strokeLinecap="round"
                strokeLinejoin="round">
                <path d="M 0 400 L 400 600 L 400 500 L 0 300 Z" />
                <path d="M 700 250 L 400 600 L 400 500 L 600 250 Z" />
                <path d="M 700 0 L 700 250 L 600 305 L 600 0 Z" />
              </svg>
            </div>
          </div>
        </>

        :

        <>
          <BrowserRouter>
            <Routes>
              {isLoggedIn ?
                <>
                  <Route path="/">
                    <Route index element={<UiLayout page="/" />} />
                    <Route path='/deposit' element={<UiLayout page="/deposit"/> } />
                    <Route path='/earn' element={<UiLayout page="/earn"/> } />
                  </Route>
                </> :
                <>

                  <Route path="/">
                    <Route index element={<LoginPage />} />
                    <Route path="register" element={<RegisterPage />} />
                    <Route path="*" element={<>ee</>} />
                  </Route>

                </>
              }

              <Route path="*" element={<NotFoundPage />} />

            </Routes>
          </BrowserRouter>
        </>
      }

    </div>
  )
}

export default App
