import { useState, useEffect } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import foodAd1 from '../assets/food-ad-1.jpg'
import foodAd2 from '../assets/food-ad-2.jpg'
import foodAd3 from '../assets/food-ad-3.jpg'

const Banners = [foodAd1, foodAd2, foodAd3]

export default function BannerCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0)

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev === 0 ? Banners.length - 1 : prev - 1))
  }

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev === Banners.length - 1 ? 0 : prev + 1))
  }

  useEffect(() => {
    const timer = setInterval(() => {
      nextSlide();
    }, 4000)
    return () => clearInterval(timer)
  }, [currentIndex])

  return (
    <div className='relative w-full h-64 rounded-2xl overflow-hidden group shadow-xl bg-slate-900'>
      <img
        src={Banners[currentIndex]}
        alt={`Ad Banner ${currentIndex}`}
        className='w-full h-full object-cover transition-all duration-500 ease-in-out'
      />

      <button
        onClick={prevSlide}
        className='absolute top-1/2 left-4 -translate-y-1/2 bg-black/40 hover:bg-black/70 text-white p-2 rounded-full cursor-pointer opacity-0 group-hover:opacity-100 transition-all duration-300 backdrop-blur-xs'
      >
        <ChevronLeft className='w-6 h-6' />
      </button>


      <button
        onClick={nextSlide}
        className='absolute top-1/2 right-4 -translate-y-1/2 bg-black/40 hover:bg-black/70 text-white p-2 rounded-full cursor-pointer opacity-0 group-hover:opacity-100 transition-all duration-300 backdrop-blur-xs'
      >
        <ChevronRight className='w-6 h-6' />
      </button>

      <div className='absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-10'>
        {Banners.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`h-2.5 rounded-full transition-all duration-300 cursor-pointer ${currentIndex === index ? "w-6 bg-purple-300" : "w-2.5 bg-white/50 hover:bg-white"}`}
          />
        ))}
      </div>
    </div>
  )



}
