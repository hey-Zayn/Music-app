import React, { useEffect } from 'react'
import Topbar from '../../components/ui/Topbar'
import { useMusicStore } from '../../store/useMusicStore'
import FeaturedSection from './components/FeaturedSection'
import { ScrollArea } from '@/components/ui/scroll-area';
import SectionGrid from './components/SectionGrid'
import { usePlayerStore } from '@/store/usePlayerStore'


const HomePage = () => {
  const { isLoading, fetchFeaturedSongs, featuredSongs, fetchMadeForYou, fetchTrendingSongs, madeForYouSongs, trendingSongs } = useMusicStore()

  useEffect(() => {
    fetchFeaturedSongs()
    fetchMadeForYou()
    fetchTrendingSongs()
    // console.log(featuredSongs)
  }, []);

  const { initializeQueue, } = usePlayerStore();




  useEffect(() => {
    if (madeForYouSongs.length > 0 && featuredSongs.length > 0 && trendingSongs.length > 0) {
      const allSongs = [...featuredSongs, ...madeForYouSongs, ...trendingSongs];
      initializeQueue(allSongs)
    }
  }, [initializeQueue, madeForYouSongs, trendingSongs, featuredSongs]);

  return (
    <main className="rounded-md overflow-hidden h-full bg-gradient-to-b from-zinc-950 to-zinc-900">
      <Topbar />

      <ScrollArea className='h-[calc(100vh-180px)]'>
        <div className='p-4 sm:p-6'>
          <h1 className='text-2xl sm:text-3xl font-bold mb-6'>Good After noon</h1>
          <FeaturedSection />


          <div className='space-y-8'>

            <SectionGrid title="Made For You" songs={madeForYouSongs} isLoading={isLoading} />
            <SectionGrid title="Trending" songs={trendingSongs} isLoading={isLoading} />

          </div>

        </div>
      </ScrollArea>
    </main>
  )
}

export default HomePage