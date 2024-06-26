import Image from 'next/image'
import './globals.css'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
  <div className="w-full h-screen flex flex-col lg:flex-row items-center justify-center space-y-16 lg:space-y-0 space-x-8 2xl:space-x-0">
      <div className="w-full lg:w-1/2 flex flex-col items-center justify-center lg:px-2 xl:px-0 text-center relative flex place-items-center before:absolute before:h-[300px] before:w-[480px] before:-translate-x-1/2 before:rounded-full before:bg-gradient-radial before:from-white before:to-transparent before:blur-2xl before:content-[''] after:absolute after:-z-20 after:h-[180px] after:w-[240px] after:translate-x-1/3 after:bg-gradient-conic after:from-sky-200 after:via-blue-200 after:blur-2xl after:content-[''] before:dark:bg-gradient-to-br before:dark:from-transparent before:dark:to-blue-700/10 after:dark:from-sky-900 after:dark:via-[#0141ff]/40 before:lg:h-[360px]">
          <p className="text-7xl md:text-8xl lg:text-9xl font-bold tracking-wider text-gray-300">0001001</p>
          <p className="italic text-7xl flex content-center justify-items-center mt-40 text-4xl md:text-5xl lg:text-6xl font-bold tracking-wider text-gray-300 mt-2">Soccer Crawler</p>
          <p className="text-lg md:text-xl lg:text-2xl text-gray-500 my-12">...</p>
          <a href="http://localhost:3000/aplicacion" className="flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 text-gray-100 px-4 py-2 rounded transition duration-150" title="Return Home">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5">
                  <path d="M9.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L7.414 9H15a1 1 0 110 2H7.414l2.293 2.293a1 1 0 010 1.414z"></path>
              </svg>
              <span>Web-Crawler</span>
          </a>
      </div>
      <div className="absolute inset-x-0 top-0 h-16">
        <img src="https://cdn-icons-png.flaticon.com/256/8149/8149271.png" />
      </div>
  </div>
  )
}
