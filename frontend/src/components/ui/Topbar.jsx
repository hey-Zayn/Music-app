import React from 'react'
import { Link } from 'react-router-dom'
import { LayoutDashboard } from 'lucide-react'
import { SignedIn, SignedOut, SignInButton, SignOutButton, UserButton } from '@clerk/clerk-react'
import SignInOAuth from './SignInOAuth'




const Topbar = () => {
    const isAdmin = false;
    return (
        <div className='w-full flex justify-between items-center px-4 py-4 sticky top-0 bg-zinc-900/75 backdrop-blur-md z-10'>
            <div className='flex gap-2 items-center'>
                Music App
            </div>
            <div className='flex items-center gap-2'>
                {
                    isAdmin && (
                        <Link to={'/admin'}>
                            <LayoutDashboard />
                            Admin Dashboard
                        </Link>
                    )
                }
                <SignedIn>
                    <SignOutButton />
                </SignedIn>

                <SignedOut>
                    <SignInOAuth />
                </SignedOut>
            </div>
        </div>
    )
}

export default Topbar