import { useState } from 'react'
import Features from './components/Features';
import Header from './components/Header'
import Hero from './components/Hero'
import useMediaQuery from './hooks/useMediaQuery';



function App() {
  const isDesktop = useMediaQuery('(min-width: 960px)');
  console.log(isDesktop)
  return (
    <div className="">
      <Header />
      <h1 className="text-3xl font-thin text-white bg-red-600 text-center underline">
        Home
      </h1>
      <Hero />
      <Features />
    </div>
  )
}

export default App
