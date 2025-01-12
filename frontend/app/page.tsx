import Link from 'next/link'
import React from 'react';


export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 text-center">
      <h1 className="text-5xl font-bold mb-8 animate-pulse-slow">Welcome to BearTrap</h1>
      <p className="text-xl mb-8">Your advanced honeypot management system</p>
      <Link href="/dashboard" className="bg-beartrap-yellow text-beartrap-black px-6 py-3 rounded-full font-semibold text-lg hover:bg-opacity-80 transition-all duration-300 ease-in-out transform hover:scale-105">
        Login
      </Link>
    </div>
  )
}

