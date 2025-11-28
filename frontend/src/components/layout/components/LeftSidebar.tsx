import { buttonVariants } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { SignedIn } from '@clerk/clerk-react'
import { HomeIcon, Library, MessageCircle } from 'lucide-react'
import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { ScrollArea } from "@/components/ui/scroll-area"
import PlaylistSkeleton from '../../skeletons/PlaylistSkeleton.jsx'


const LeftSidebar = () => {
    const isLoading = false;
    const [playlists, SetPlaylists] = useState([]);

    return (
        <div className='h-full flex flex-col gap-2'>
            <div className='rounded-lg bg-zinc-900 p-4'>
                <div className='space-y-2'>
                    <Link to={'/'} className={cn(buttonVariants({
                        variant: "ghost",
                        className: "w-full justify-start text-white hover:bg-zinc-800 "
                    }))}>
                        <HomeIcon className='hidden md:inline' />
                        <span>Home</span>
                    </Link>

                    <SignedIn>
                        <Link to={'/chat'} className={cn(buttonVariants({
                            variant: "ghost",
                            className: "w-full justify-start text-white hover:bg-zinc-800 "
                        }))}>
                            <MessageCircle className='hidden md:inline' />
                            <span>Home</span>
                        </Link>
                    </SignedIn>
                </div>
            </div>


            <div className='flex-1 rounded-lg bg-zinc-900 p-4'>
                <div className='flex items-center justify-between mb-4'>
                    <div className='flex items-center text-white'>
                        <Library className='size-5 mr-2'/>
                        <span className='hidden md:inline'>Playlists</span>
                    </div>
                </div>

                <ScrollArea className='h-[calc(100vh-300px)]'>
                        <div className='space-y-2'>
                            {
                                isLoading ?  <PlaylistSkeleton /> : <h1>Hello</h1>
                            }
                        </div>
                </ScrollArea>
            </div>
        </div>
    )
}

export default LeftSidebar