
// import { Button } from "@/components/ui/button"
// import { SignedIn, SignedOut, SignInButton, UserButton } from '@clerk/clerk-react'
import { Route, Routes } from 'react-router-dom'
import HomePage from './pages/home/HomePage.jsx'
import ChatPage from './pages/chat/ChatPage.jsx'
import AuthCallbackPage from './pages/auth-callback/AuthCallbackPage.jsx'
import { axiosInstance } from './lib/axios.js'
import { AuthenticateWithRedirectCallback } from '@clerk/clerk-react'
import MainLayout from "../src/components/layout/MainLayout.jsx"

const App = () => {

  return (
    <>
      {/* <header>
        <SignedOut>
          <SignInButton >
            <Button>Sign In</Button>
          </SignInButton>
        </SignedOut>
        <SignedIn>
          <UserButton />
        </SignedIn>
      </header> */}

      <Routes>
        <Route path='/sso-callback' element={<AuthenticateWithRedirectCallback signUpForceRedirectUrl={"/auth-callback"} />} />
        <Route path='/auth-callback' element={<AuthCallbackPage />} />
        <Route  element={<MainLayout />} >
        <Route path='/' element={<HomePage />} />
        <Route path='/chat' element={<ChatPage />} />

        </Route>
      </Routes>
    </>
  )
}

export default App