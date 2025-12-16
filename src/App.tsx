import { useState, useEffect, useRef } from 'react'
import chileFlag from './assets/chile_flag.png'
import himnoChile from './assets/himno_chile.mp3'

function App() {
  const audioRef = useRef<HTMLAudioElement>(null)
  const [isMuted, setIsMuted] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [timeLeft, setTimeLeft] = useState({
    months: 0,
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  })

  const toggleMute = () => {
    if (audioRef.current) {
      audioRef.current.muted = !audioRef.current.muted
      setIsMuted(!isMuted)
    }
  }

  useEffect(() => {
    const targetDate = new Date('2030-03-11T00:00:00')

    const calculateTimeLeft = () => {
      const now = new Date()
      const difference = targetDate.getTime() - now.getTime()

      if (difference > 0) {
        const months = Math.floor(difference / (1000 * 60 * 60 * 24 * 30.44))
        const days = Math.floor((difference % (1000 * 60 * 60 * 24 * 30.44)) / (1000 * 60 * 60 * 24))
        const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
        const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60))
        const seconds = Math.floor((difference % (1000 * 60)) / 1000)

        setTimeLeft({ months, days, hours, minutes, seconds })
      }
    }

    calculateTimeLeft()
    const timer = setInterval(calculateTimeLeft, 1000)

    return () => clearInterval(timer)
  }, [])

  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return

    const timer = setTimeout(() => {
      console.log('Activando sonido...')
      audio.muted = false
      setIsMuted(false)
      setIsLoading(false)
      console.log('Audio activo - Muted:', audio.muted, 'Volume:', audio.volume, 'Playing:', !audio.paused)
    }, 1000)

    return () => {
      clearTimeout(timer)
    }
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-blue-50 to-white flex flex-col items-center justify-center p-4 md:p-8 font-sans relative overflow-hidden">
      <audio ref={audioRef} src={himnoChile} autoPlay loop muted />
      
      {isLoading && (
        <div className="fixed inset-0 bg-white z-[100] flex flex-col items-center justify-center">
          <div className="flex flex-col items-center gap-6">
            <div className="relative w-24 h-24">
              <div className="absolute inset-0 border-8 border-chile-blue/20 rounded-full"></div>
              <div className="absolute inset-0 border-8 border-transparent border-t-chile-blue rounded-full animate-spin"></div>
            </div>
            <p className="text-chile-blue text-xl font-bold animate-pulse">Cargando...</p>
          </div>
        </div>
      )}
      
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-blue-100/20 to-transparent animate-pulse"></div>
      
      {/* <button
        onClick={toggleMute}
        className="fixed top-6 right-6 z-50 bg-gradient-to-br from-chile-blue to-blue-600 hover:from-chile-blue hover:to-blue-700 text-white p-4 rounded-full shadow-2xl hover:shadow-chile-blue/50 transition-all duration-300 hover:scale-110 active:scale-95"
        aria-label={isMuted ? 'Activar audio' : 'Silenciar audio'}
      >
        {isMuted ? (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2" />
          </svg>
        ) : (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
          </svg>
        )}
      </button> */}
      
      <img 
        src={chileFlag} 
        alt="Bandera de Chile" 
        className="w-[320px] h-auto mb-12 border-4 border-gray-900 shadow-2xl rounded-lg transform hover:scale-105 transition-transform duration-500"
      />
      
      <div className="text-center bg-white/80 backdrop-blur-sm p-10 rounded-3xl shadow-2xl max-w-5xl w-full border border-gray-200 relative z-10">
        <div className="absolute inset-0 bg-gradient-to-br from-chile-blue/5 to-chile-red/5 rounded-3xl"></div>
        
        <h1 className="text-chile-blue text-6xl md:text-7xl font-black mb-4 drop-shadow-2xl relative z-10 tracking-tight">
          CUENTA REGRESIVA PARA QUE SE VAYA KAST
        </h1>
        <h2 className="text-chile-red text-4xl md:text-5xl font-bold mb-12 relative z-10 tracking-wide">
          11 DE MARZO DE 2030
        </h2>
        
        <div className="flex justify-center gap-4 md:gap-6 flex-wrap relative z-10">
          <div className="bg-gradient-to-br from-chile-blue/10 to-chile-red/10 border-2 border-chile-blue/30 rounded-2xl p-6 min-w-[120px] shadow-xl hover:shadow-2xl hover:transform hover:-translate-y-2 hover:scale-105 transition-all duration-500 group">
            <div className="bg-white/50 rounded-xl p-3 mb-3 group-hover:bg-white/80 transition-colors duration-300">
              <div className="text-chile-blue text-5xl md:text-6xl font-black drop-shadow-lg">
                {timeLeft.months}
              </div>
            </div>
            <div className="text-gray-700 text-base md:text-lg font-bold tracking-widest uppercase">
              Meses
            </div>
          </div>
          <div className="bg-gradient-to-br from-chile-blue/10 to-chile-red/10 border-2 border-chile-blue/30 rounded-2xl p-6 min-w-[120px] shadow-xl hover:shadow-2xl hover:transform hover:-translate-y-2 hover:scale-105 transition-all duration-500 group">
            <div className="bg-white/50 rounded-xl p-3 mb-3 group-hover:bg-white/80 transition-colors duration-300">
              <div className="text-chile-blue text-5xl md:text-6xl font-black drop-shadow-lg">
                {timeLeft.days}
              </div>
            </div>
            <div className="text-gray-700 text-base md:text-lg font-bold tracking-widest uppercase">
              Días
            </div>
          </div>
          <div className="bg-gradient-to-br from-chile-blue/10 to-chile-red/10 border-2 border-chile-blue/30 rounded-2xl p-6 min-w-[120px] shadow-xl hover:shadow-2xl hover:transform hover:-translate-y-2 hover:scale-105 transition-all duration-500 group">
            <div className="bg-white/50 rounded-xl p-3 mb-3 group-hover:bg-white/80 transition-colors duration-300">
              <div className="text-chile-blue text-5xl md:text-6xl font-black drop-shadow-lg">
                {timeLeft.hours}
              </div>
            </div>
            <div className="text-gray-700 text-base md:text-lg font-bold tracking-widest uppercase">
              Horas
            </div>
          </div>
          <div className="bg-gradient-to-br from-chile-blue/10 to-chile-red/10 border-2 border-chile-blue/30 rounded-2xl p-6 min-w-[120px] shadow-xl hover:shadow-2xl hover:transform hover:-translate-y-2 hover:scale-105 transition-all duration-500 group">
            <div className="bg-white/50 rounded-xl p-3 mb-3 group-hover:bg-white/80 transition-colors duration-300">
              <div className="text-chile-blue text-5xl md:text-6xl font-black drop-shadow-lg">
                {timeLeft.minutes}
              </div>
            </div>
            <div className="text-gray-700 text-base md:text-lg font-bold tracking-widest uppercase">
              Minutos
            </div>
          </div>
          <div className="bg-gradient-to-br from-chile-blue/10 to-chile-red/10 border-2 border-chile-blue/30 rounded-2xl p-6 min-w-[120px] shadow-xl hover:shadow-2xl hover:transform hover:-translate-y-2 hover:scale-105 transition-all duration-500 group">
            <div className="bg-white/50 rounded-xl p-3 mb-3 group-hover:bg-white/80 transition-colors duration-300">
              <div className="text-chile-blue text-5xl md:text-6xl font-black drop-shadow-lg animate-pulse">
                {timeLeft.seconds}
              </div>
            </div>
            <div className="text-gray-700 text-base md:text-lg font-bold tracking-widest uppercase">
              Segundos
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default App
