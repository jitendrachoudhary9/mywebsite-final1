import  { useState, useEffect, useRef } from 'react';
import { BrowserRouter as Router, Routes, Route, Link,  useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from "framer-motion";
import { Heart,  Pause, Play, Calendar, Camera, BookOpen, Gift, ChevronRight, X, Home as HomeIcon,  } from 'lucide-react';
import confetti from 'canvas-confetti';

// --- Shared Components ---

const FloatingHearts = () => {
  const [hearts, setHearts] = useState<{ id: number; left: string; size: number; duration: number; delay: number }[]>([]);

  useEffect(() => {
    const newHearts = Array.from({ length: 20 }).map((_, i) => ({
      id: i,
      left: `${Math.random() * 100}%`,
      size: Math.random() * 20 + 10,
      duration: Math.random() * 5 + 5,
      delay: Math.random() * 5,
    }));
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setHearts(newHearts);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {hearts.map((heart) => (
        <div
          key={heart.id}
          className="absolute bottom-[-50px] animate-float text-rose-300/30"
          style={{
            left: heart.left,
            animationDuration: `${heart.duration}s`,
            animationDelay: `${heart.delay}s`,
          }}
        >
          <Heart size={heart.size} fill="currentColor" />
        </div>
      ))}
    </div>
  );
};

const Typewriter = ({ text, delay = 100 }: { text: string; delay?: number }) => {
  const [displayedText, setDisplayedText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (currentIndex < text.length) {
      const timeout = setTimeout(() => {
        setDisplayedText((prev) => prev + text[currentIndex]);
        setCurrentIndex((prev) => prev + 1);
      }, delay);
      return () => clearTimeout(timeout);
    }
  }, [currentIndex, text, delay]);

  return <span>{displayedText}</span>;
};

const MusicPlayer = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play().catch(e => console.log("Audio play failed:", e));
      }
      setIsPlaying(!isPlaying);
    }
  };

  return (
    <div className="fixed bottom-8 left-8 z-50">
      <button
        onClick={togglePlay}
        className="glass p-4 rounded-full text-rose-600 hover:scale-110 transition-transform shadow-lg"
      >
        {isPlaying ? <Pause size={24} /> : <Play size={24} />}
      </button>
      <audio
        ref={audioRef}
        src="https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3"
        loop
      />
    </div>
  );
};

const Navbar = () => {
  const location = useLocation();
  if (location.pathname === '/') return null;

  return (
    <nav className="fixed top-6 left-1/2 -translate-x-1/2 z-50">
      <div className="glass px-6 py-3 rounded-full flex items-center gap-6 shadow-lg border border-rose-200">
        <Link to="/" className="text-rose-500 hover:scale-110 transition-transform flex items-center gap-2 font-medium">
          <HomeIcon size={20} /> Home
        </Link>
        <div className="w-px h-4 bg-rose-200" />
        <Link to="/story" className="text-rose-400 hover:text-rose-600 transition-colors">Story</Link>
        <Link to="/gallery" className="text-rose-400 hover:text-rose-600 transition-colors">Gallery</Link>
        <Link to="/letter" className="text-rose-400 hover:text-rose-600 transition-colors">Letter</Link>
        <Link to="/special-date" className="text-rose-400 hover:text-rose-600 transition-colors">Special Date</Link>
      </div>
    </nav>
  );
};

// --- Pages ---


const HomePage = () => {
  return (
    <section className="relative min-h-screen overflow-hidden flex items-center justify-center px-5 py-12">

      {/* Background */}
      <div className="absolute inset-0">
        <img
          src="https://picsum.photos/seed/romantic/1920/1080?blur=2"
          alt="Romantic Background"
          className="w-full h-full object-cover"
          referrerPolicy="no-referrer"
        />

        {/* Professional Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/65 via-rose-950/55 to-black/75" />

        {/* Soft Light */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-rose-500/15 rounded-full blur-[120px]" />
      </div>


      {/* Main Content */}
      <motion.div
        initial={{ opacity: 0, y: 25 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="relative z-10 w-full max-w-6xl text-center"
      >

        {/* Top Label */}
        <div className="flex items-center justify-center gap-3 mb-7">

          <span className="h-px w-12 md:w-20 bg-rose-300/50" />

          <span className="text-rose-200/80 text-xs md:text-sm
                           uppercase tracking-[0.4em]">
            Our Love Story
          </span>

          <span className="h-px w-12 md:w-20 bg-rose-300/50" />

        </div>


        {/* Heart */}
        <motion.div
          initial={{ scale: 0.7, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="mx-auto mb-7 w-20 h-20
                     rounded-full
                     flex items-center justify-center
                     bg-white/10 backdrop-blur-md
                     border border-white/20
                     shadow-[0_0_40px_rgba(244,63,94,0.35)]"
        >
          <Heart
            size={38}
            fill="currentColor"
            className="text-rose-400"
          />
        </motion.div>


        {/* Names */}
        <h1 className="text-5xl sm:text-6xl md:text-8xl
                       font-semibold tracking-tight
                       text-white
                       drop-shadow-2xl">

          Jitendra

          <span className="mx-3 text-rose-400">
            💝
          </span>

          <span className="text-rose-300">
            Santosh
          </span>

        </h1>


        {/* Subtitle */}
        <div className="mt-6 mb-12">

          <p className="text-lg md:text-xl
                        text-rose-100/80
                        font-light
                        tracking-[0.12em]">

            <Typewriter
              text="Forever Together, Always & Forever..."
              delay={120}
            />

          </p>

        </div>


        {/* Navigation */}
        <div className="grid grid-cols-2 lg:grid-cols-4
                        gap-4 md:gap-5
                        max-w-5xl mx-auto">


          {/* Story */}
          <Link
            to="/story"
            className="group relative rounded-2xl
                       p-6 md:p-7
                       bg-white/[0.08]
                       backdrop-blur-xl
                       border border-white/15
                       hover:border-rose-300/50
                       hover:bg-white/[0.14]
                       transition-all duration-300
                       hover:-translate-y-1"
          >

            <BookOpen
              size={30}
              className="mx-auto mb-4
                         text-rose-300
                         group-hover:scale-110
                         transition-transform duration-300"
            />

            <h3 className="text-white font-semibold text-lg">
              Our Story
            </h3>

            <p className="text-rose-100/50 text-xs mt-2">
              How our journey began
            </p>

          </Link>


          {/* Gallery */}
          <Link
            to="/gallery"
            className="group relative rounded-2xl
                       p-6 md:p-7
                       bg-white/[0.08]
                       backdrop-blur-xl
                       border border-white/15
                       hover:border-rose-300/50
                       hover:bg-white/[0.14]
                       transition-all duration-300
                       hover:-translate-y-1"
          >

            <Camera
              size={30}
              className="mx-auto mb-4
                         text-rose-300
                         group-hover:scale-110
                         transition-transform duration-300"
            />

            <h3 className="text-white font-semibold text-lg">
              Gallery
            </h3>

            <p className="text-rose-100/50 text-xs mt-2">
              Our favorite memories
            </p>

          </Link>


          {/* Letter */}
          <Link
            to="/letter"
            className="group relative rounded-2xl
                       p-6 md:p-7
                       bg-white/[0.08]
                       backdrop-blur-xl
                       border border-white/15
                       hover:border-rose-300/50
                       hover:bg-white/[0.14]
                       transition-all duration-300
                       hover:-translate-y-1"
          >

            <Gift
              size={30}
              className="mx-auto mb-4
                         text-rose-300
                         group-hover:scale-110
                         transition-transform duration-300"
            />

            <h3 className="text-white font-semibold text-lg">
              Love Letter
            </h3>

            <p className="text-rose-100/50 text-xs mt-2">
              A message from my heart
            </p>

          </Link>


          {/* Special Date */}
          <Link
            to="/special-date"
            className="group relative rounded-2xl
                       p-6 md:p-7
                       bg-white/[0.08]
                       backdrop-blur-xl
                       border border-white/15
                       hover:border-rose-300/50
                       hover:bg-white/[0.14]
                       transition-all duration-300
                       hover:-translate-y-1"
          >

            <Calendar
              size={30}
              className="mx-auto mb-4
                         text-rose-300
                         group-hover:scale-110
                         transition-transform duration-300"
            />

            <h3 className="text-white font-semibold text-lg">
              Special Date
            </h3>

            <p className="text-rose-100/50 text-xs mt-2">
              The day it all began
            </p>

          </Link>

        </div>



      </motion.div>


      {/* Bottom Shadow */}
      <div className="absolute bottom-0 left-0 right-0 h-24
                      bg-gradient-to-t from-black/40 to-transparent
                      pointer-events-none" />

    </section>
  );
};




const StoryPage = () => {
  const storyTimeline = [
    {
      date: '29 JUNE 2022',
      number: '01',
      title: 'The First Conversation',
      desc: 'Hours of talking that somehow felt like minutes. A simple conversation became the beginning of something beautiful.',
      icon: <BookOpen size={22} />,
      image: 'https://picsum.photos/seed/lovestory01/1200/800',
    },
    {
      date: '01 JULY 2022',
      number: '02',
      title: 'The First "I Love You"',
      desc: 'Some moments are impossible to forget. This was one of those moments — the first time we said what our hearts were feeling.',
      icon: <Heart size={22} fill="currentColor" />,
      image: 'https://picsum.photos/seed/lovestory02/1200/800',
    },
    {
      date: 'OUR FIRST DATE',
      number: '03',
      title: 'First Date & First Kiss',
      desc: 'A day filled with nervous smiles, beautiful memories and a moment that made everything feel a little more special.',
      icon: <Camera size={22} />,
      image: 'https://picsum.photos/seed/lovestory03/1200/800',
    },
    {
      date: 'A SPECIAL MOMENT',
      number: '04',
      title: 'When We Knew',
      desc: 'Somewhere along the way, we realized that this was more than just a beautiful moment. We had found something worth holding onto.',
      icon: <Gift size={22} />,
      image: 'https://picsum.photos/seed/lovestory04/1200/800',
    },
  ];

  return (
    <section className="relative min-h-screen overflow-hidden bg-[#090407] text-white">

      {/* =========================================================
          BACKGROUND
      ========================================================= */}
      <div className="fixed inset-0 pointer-events-none">

        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_10%,rgba(190,24,93,0.20),transparent_35%),radial-gradient(circle_at_10%_60%,rgba(244,63,94,0.10),transparent_30%),radial-gradient(circle_at_90%_80%,rgba(168,85,247,0.08),transparent_30%)]" />

        <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/40 to-[#090407]" />

      </div>


      {/* =========================================================
          HERO
      ========================================================= */}
      <div className="relative z-10 pt-32 pb-24 px-5">

        <motion.div
          initial={{ opacity: 0, y: 35 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="max-w-6xl mx-auto text-center"
        >

          {/* Small Label */}
          <div className="flex items-center justify-center gap-4 mb-7">

            <span className="w-16 h-px bg-gradient-to-r from-transparent to-rose-400/60" />

            <span className="text-[10px] md:text-xs
                             tracking-[0.5em]
                             text-rose-300/70
                             uppercase">
              A Journey Of Two Hearts
            </span>

            <span className="w-16 h-px bg-gradient-to-l from-transparent to-rose-400/60" />

          </div>


          {/* Main Icon */}
          <motion.div
            initial={{ scale: 0, rotate: -20 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ duration: 0.8, type: 'spring' }}
            className="mx-auto mb-8
                       w-20 h-20
                       rounded-full
                       flex items-center justify-center
                       bg-gradient-to-br from-rose-500/20 to-pink-500/5
                       border border-rose-300/20
                       shadow-[0_0_70px_rgba(244,63,94,0.20)]"
          >

            <Heart
              size={38}
              fill="currentColor"
              className="text-rose-400"
            />

          </motion.div>


          {/* Heading */}
          <h1 className="text-5xl md:text-7xl lg:text-8xl
                         font-semibold
                         tracking-tight
                         leading-none">

            <span className="text-white">
              Our
            </span>

            <span className="text-rose-400 italic font-light ml-4">
              Story
            </span>

          </h1>


          <p className="max-w-xl mx-auto mt-7
                        text-sm md:text-base
                        leading-7
                        text-white/45">

            From a simple conversation to a beautiful journey,
            these are the moments that became
            <span className="text-rose-300/80"> our forever.</span>

          </p>


          {/* Date Badge */}
          <div className="mt-10 inline-flex items-center gap-3
                          rounded-full
                          px-5 py-2.5
                          bg-white/[0.04]
                          border border-white/10
                          backdrop-blur-xl">

            <Calendar
              size={15}
              className="text-rose-400"
            />

            <span className="text-xs tracking-[0.2em] text-white/50">
              SINCE 29 JUNE 2022
            </span>

          </div>

        </motion.div>

      </div>


      {/* =========================================================
          STORY TIMELINE
      ========================================================= */}
      <div className="relative z-10 max-w-6xl mx-auto px-5 pb-32">

        {/* Center Line */}
        <div className="hidden md:block absolute
                        left-1/2 top-0 bottom-0
                        w-px
                        bg-gradient-to-b
                        from-transparent
                        via-rose-400/30
                        to-transparent" />


        <div className="space-y-28 md:space-y-36">

          {storyTimeline.map((item, index) => {

            const isReverse = index % 2 !== 0;

            return (
              <motion.div
                key={index}
                initial={{
                  opacity: 0,
                  y: 60,
                }}
                whileInView={{
                  opacity: 1,
                  y: 0,
                }}
                viewport={{
                  once: true,
                  amount: 0.15,
                }}
                transition={{
                  duration: 0.8,
                  ease: 'easeOut',
                }}
                className="relative"
              >

                {/* Desktop Layout */}
                <div
                  className={`flex flex-col md:flex-row
                              items-center gap-8 md:gap-14
                              ${isReverse ? 'md:flex-row-reverse' : ''}`}
                >

                  {/* ================================
                      IMAGE
                  ================================= */}
                  <div className="w-full md:w-[47%]">

                    <div className="group relative">

                      {/* Glow behind image */}
                      <div className="absolute
                                      -inset-3
                                      bg-rose-500/10
                                      blur-2xl
                                      rounded-[2rem]
                                      opacity-0
                                      group-hover:opacity-100
                                      transition-opacity duration-700" />


                      <div className="relative overflow-hidden
                                      rounded-[2rem]
                                      border border-white/10
                                      bg-white/[0.03]
                                      shadow-2xl">

                        <img
                          src={item.image}
                          alt={item.title}
                          className="w-full
                                     h-[300px]
                                     md:h-[390px]
                                     object-cover
                                     transition-transform
                                     duration-1000
                                     group-hover:scale-105"
                          referrerPolicy="no-referrer"
                        />


                        {/* Image Overlay */}
                        <div className="absolute inset-0
                                        bg-gradient-to-t
                                        from-black/70
                                        via-transparent
                                        to-transparent" />


                        {/* Number */}
                        <div className="absolute
                                        top-5 left-5
                                        w-11 h-11
                                        rounded-full
                                        bg-black/30
                                        backdrop-blur-md
                                        border border-white/20
                                        flex items-center justify-center">

                          <span className="text-xs
                                           tracking-widest
                                           text-white/80">
                            {item.number}
                          </span>

                        </div>


                        {/* Bottom Image Text */}
                        <div className="absolute bottom-6 left-6 right-6">

                          <p className="text-[10px]
                                        tracking-[0.35em]
                                        text-rose-300/80
                                        uppercase">
                            {item.date}
                          </p>

                        </div>

                      </div>

                    </div>

                  </div>


                  {/* ================================
                      CENTER POINT
                  ================================= */}
                  <div className="hidden md:flex
                                  absolute left-1/2
                                  -translate-x-1/2
                                  w-14 h-14
                                  rounded-full
                                  items-center justify-center
                                  bg-[#10070b]
                                  border border-rose-400/40
                                  shadow-[0_0_35px_rgba(244,63,94,0.25)]
                                  z-20">

                    <div className="w-10 h-10
                                    rounded-full
                                    flex items-center justify-center
                                    bg-gradient-to-br
                                    from-rose-500
                                    to-pink-600
                                    text-white">

                      {item.icon}

                    </div>

                  </div>


                  {/* ================================
                      CONTENT
                  ================================= */}
                  <div className="w-full md:w-[47%]">

                    <div className="relative
                                    p-7 md:p-9
                                    rounded-[2rem]
                                    bg-white/[0.045]
                                    backdrop-blur-xl
                                    border border-white/[0.10]
                                    hover:border-rose-400/25
                                    transition-all duration-500">

                      {/* Mobile Icon */}
                      <div className="md:hidden
                                      w-11 h-11
                                      rounded-full
                                      flex items-center justify-center
                                      mb-6
                                      bg-rose-500/15
                                      border border-rose-400/20
                                      text-rose-300">

                        {item.icon}

                      </div>


                      {/* Date */}
                      <p className="text-[10px]
                                    md:text-xs
                                    tracking-[0.35em]
                                    text-rose-400
                                    uppercase
                                    mb-4">
                        {item.date}
                      </p>


                      {/* Title */}
                      <h2 className="text-3xl md:text-4xl
                                     font-semibold
                                     leading-tight
                                     text-white
                                     mb-5">

                        {item.title}

                      </h2>


                      {/* Divider */}
                      <div className="w-12 h-px
                                      bg-rose-400/50
                                      mb-5" />


                      {/* Description */}
                      <p className="text-sm md:text-base
                                    leading-7
                                    text-white/45">
                        {item.desc}
                      </p>


                      {/* Bottom Number */}
                      <div className="mt-8
                                      flex items-center justify-between">

                        <span className="text-[10px]
                                         tracking-[0.3em]
                                         uppercase
                                         text-white/20">
                          Our Memory
                        </span>

                        <span className="text-3xl
                                         font-light
                                         text-rose-400/20">
                          {item.number}
                        </span>

                      </div>

                    </div>

                  </div>

                </div>

              </motion.div>
            );
          })}

        </div>

      </div>


      {/* =========================================================
          ENDING
      ========================================================= */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 1 }}
        className="relative z-10
                   text-center
                   px-5
                   pb-32"
      >

        <div className="max-w-2xl mx-auto">

          <div className="flex items-center justify-center gap-4 mb-8">

            <span className="w-20 h-px
                             bg-gradient-to-r
                             from-transparent
                             to-rose-400/30" />

            <Heart
              size={17}
              fill="currentColor"
              className="text-rose-400"
            />

            <span className="w-20 h-px
                             bg-gradient-to-l
                             from-transparent
                             to-rose-400/30" />

          </div>


          <p className="text-2xl md:text-4xl
                        font-light
                        italic
                        text-white/80
                        leading-relaxed">

            "The best part of our story
            <span className="text-rose-400">
              {' '}is that it is still being written.
            </span>"

          </p>


          <p className="mt-7
                        text-[10px]
                        tracking-[0.4em]
                        uppercase
                        text-white/25">
            Jitendra & Santosh
          </p>

        </div>

      </motion.div>

    </section>
  );
};



const GalleryPage = () => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const galleryImages = [
    'https://picsum.photos/seed/love1/1200/900',
    'https://picsum.photos/seed/love2/900/1200',
    'https://picsum.photos/seed/love3/1200/900',
    'https://picsum.photos/seed/love4/900/1200',
    'https://picsum.photos/seed/love5/1200/900',
    'https://picsum.photos/seed/love6/1200/900',
  ];

  return (
    <section className="relative min-h-screen overflow-hidden bg-[#090407] text-white px-5 pt-32 pb-32">

      {/* =====================================================
          BACKGROUND
      ===================================================== */}
      <div className="fixed inset-0 pointer-events-none">

        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_10%,rgba(190,24,93,0.18),transparent_35%),radial-gradient(circle_at_10%_70%,rgba(244,63,94,0.08),transparent_30%),radial-gradient(circle_at_90%_60%,rgba(168,85,247,0.07),transparent_30%)]" />

        <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-black/40 to-[#090407]" />

      </div>


      {/* =====================================================
          HERO
      ===================================================== */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9 }}
        className="relative z-10 max-w-6xl mx-auto text-center mb-20"
      >

        <div className="flex items-center justify-center gap-4 mb-7">

          <span className="w-16 h-px bg-gradient-to-r from-transparent to-rose-400/60" />

          <span className="text-[10px] md:text-xs
                           uppercase
                           tracking-[0.5em]
                           text-rose-300/70">
            Beautiful Memories
          </span>

          <span className="w-16 h-px bg-gradient-to-l from-transparent to-rose-400/60" />

        </div>


        {/* Camera Circle */}
        <div className="mx-auto mb-7
                        w-20 h-20
                        rounded-full
                        flex items-center justify-center
                        bg-white/[0.05]
                        backdrop-blur-xl
                        border border-white/10
                        shadow-[0_0_60px_rgba(244,63,94,0.18)]">

          <Camera
            size={34}
            className="text-rose-400"
          />

        </div>


        <h1 className="text-5xl md:text-7xl lg:text-8xl
                       font-semibold
                       tracking-tight">

          Our

          <span className="text-rose-400 italic font-light ml-4">
            Moments
          </span>

        </h1>


        <p className="max-w-xl mx-auto
                      mt-6
                      text-sm md:text-base
                      leading-7
                      text-white/40">

          A collection of little moments,
          beautiful memories and memories
          that will always stay close to our hearts.

        </p>

      </motion.div>


      {/* =====================================================
          GALLERY
      ===================================================== */}
      <div className="relative z-10 max-w-6xl mx-auto">

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">

          {galleryImages.map((img, i) => (

            <motion.div
              key={i}
              initial={{
                opacity: 0,
                y: 40,
              }}
              whileInView={{
                opacity: 1,
                y: 0,
              }}
              viewport={{
                once: true,
                amount: 0.15,
              }}
              transition={{
                duration: 0.6,
                delay: i * 0.08,
              }}
              whileHover={{
                y: -6,
              }}
              onClick={() => setSelectedImage(img)}
              className={`
                group relative overflow-hidden
                rounded-[2rem]
                border border-white/[0.10]
                bg-white/[0.04]
                cursor-zoom-in
                shadow-2xl
                ${i === 0 || i === 5
                  ? 'md:col-span-2 lg:col-span-2'
                  : ''}
              `}
            >

              {/* Image */}
              <img
                src={img}
                alt={`Memory ${i + 1}`}
                className={`
                  w-full
                  object-cover
                  transition-transform duration-1000
                  group-hover:scale-105
                  ${i === 0 || i === 5
                    ? 'h-[360px] md:h-[420px]'
                    : 'h-[360px]'}
                `}
                referrerPolicy="no-referrer"
              />


              {/* Dark Overlay */}
              <div className="absolute inset-0
                              bg-gradient-to-t
                              from-black/75
                              via-black/5
                              to-transparent
                              opacity-80
                              group-hover:opacity-100
                              transition-opacity duration-500" />


              {/* Top Number */}
              <div className="absolute top-5 left-5
                              w-10 h-10
                              rounded-full
                              bg-black/25
                              backdrop-blur-md
                              border border-white/20
                              flex items-center justify-center">

                <span className="text-xs text-white/80">
                  {String(i + 1).padStart(2, '0')}
                </span>

              </div>


              {/* Hover Heart */}
              <motion.div
                initial={{ opacity: 0, scale: 0.7 }}
                whileHover={{ opacity: 1, scale: 1 }}
                className="absolute inset-0
                           flex items-center justify-center
                           pointer-events-none"
              >

                <div className="w-16 h-16
                                rounded-full
                                bg-white/10
                                backdrop-blur-md
                                border border-white/20
                                flex items-center justify-center
                                shadow-[0_0_40px_rgba(244,63,94,0.3)]">

                  <Heart
                    size={25}
                    fill="currentColor"
                    className="text-rose-300"
                  />

                </div>

              </motion.div>


              {/* Bottom Text */}
              <div className="absolute bottom-6 left-6 right-6
                              flex items-end justify-between">

                <div>

                  <p className="text-[9px]
                                uppercase
                                tracking-[0.35em]
                                text-rose-300/80
                                mb-1">
                    Our Memory
                  </p>

                  <p className="text-white/90
                                font-medium">
                    Moment {String(i + 1).padStart(2, '0')}
                  </p>

                </div>


                <div className="w-9 h-9
                                rounded-full
                                bg-white/10
                                backdrop-blur-md
                                border border-white/10
                                flex items-center justify-center">

                  <span className="text-white/70 text-sm">
                    ↗
                  </span>

                </div>

              </div>

            </motion.div>

          ))}

        </div>

      </div>


      {/* =====================================================
          GALLERY FOOTER
      ===================================================== */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="relative z-10 text-center mt-24"
      >

        <div className="flex items-center justify-center gap-4">

          <span className="w-16 h-px bg-white/10" />

          <Heart
            size={15}
            fill="currentColor"
            className="text-rose-400"
          />

          <span className="w-16 h-px bg-white/10" />

        </div>


        <p className="mt-6
                      text-xs
                      uppercase
                      tracking-[0.35em]
                      text-white/25">
          Memories we will keep forever
        </p>

      </motion.div>


      {/* =====================================================
          FULLSCREEN IMAGE VIEWER
      ===================================================== */}
      <AnimatePresence>

        {selectedImage && (

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0
                       z-[100]
                       bg-black/95
                       backdrop-blur-xl
                       flex items-center justify-center
                       p-5 md:p-10"
            onClick={() => setSelectedImage(null)}
          >

            {/* Close Button */}
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute
                         top-6 right-6 md:top-8 md:right-8
                         w-12 h-12
                         rounded-full
                         bg-white/10
                         backdrop-blur-md
                         border border-white/10
                         flex items-center justify-center
                         text-white
                         hover:bg-rose-500/30
                         hover:border-rose-400/30
                         transition-all
                         z-20"
            >

              <X size={24} />

            </button>


            {/* Large Image */}
            <motion.img
              initial={{
                opacity: 0,
                scale: 0.85,
              }}
              animate={{
                opacity: 1,
                scale: 1,
              }}
              exit={{
                opacity: 0,
                scale: 0.85,
              }}
              transition={{
                duration: 0.4,
              }}
              src={selectedImage}
              alt="Selected Memory"
              className="max-w-full
                         max-h-[88vh]
                         object-contain
                         rounded-2xl
                         shadow-[0_0_80px_rgba(244,63,94,0.15)]"
              referrerPolicy="no-referrer"
              onClick={(e) => e.stopPropagation()}
            />

          </motion.div>

        )}

      </AnimatePresence>

    </section>
  );
};



const LetterPage = () => {
  const [showProposal, setShowProposal] = useState(false);
  const [letterOpened, setLetterOpened] = useState(false);

  const handleSurprise = () => {
    confetti({
      particleCount: 180,
      spread: 90,
      origin: { y: 0.65 },
      colors: ['#fb7185', '#f43f5e', '#fda4af', '#fecdd3'],
    });

    alert("You are the best thing that ever happened to me! ❤️");
  };

  return (
    <section className="relative min-h-screen overflow-hidden bg-[#090407] text-white px-5 pt-32 pb-32">

      {/* =====================================================
          BACKGROUND
      ===================================================== */}
      <div className="fixed inset-0 pointer-events-none">

        <div className="absolute inset-0
                        bg-[radial-gradient(circle_at_50%_15%,rgba(190,24,93,0.20),transparent_35%),radial-gradient(circle_at_15%_70%,rgba(244,63,94,0.08),transparent_30%),radial-gradient(circle_at_90%_80%,rgba(168,85,247,0.07),transparent_30%)]" />

        <div className="absolute inset-0
                        bg-gradient-to-b
                        from-black/10
                        via-black/40
                        to-[#090407]" />

      </div>


      {/* =====================================================
          HEADER
      ===================================================== */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9 }}
        className="relative z-10 text-center mb-16"
      >

        <div className="flex items-center justify-center gap-4 mb-7">

          <span className="w-16 h-px
                           bg-gradient-to-r
                           from-transparent
                           to-rose-400/60" />

          <span className="text-[10px] md:text-xs
                           uppercase
                           tracking-[0.5em]
                           text-rose-300/70">
            Words From My Heart
          </span>

          <span className="w-16 h-px
                           bg-gradient-to-l
                           from-transparent
                           to-rose-400/60" />

        </div>


        <div className="mx-auto mb-7
                        w-20 h-20
                        rounded-full
                        flex items-center justify-center
                        bg-white/[0.05]
                        backdrop-blur-xl
                        border border-white/10
                        shadow-[0_0_60px_rgba(244,63,94,0.18)]">

          <Heart
            size={36}
            fill="currentColor"
            className="text-rose-400"
          />

        </div>


        <h1 className="text-5xl md:text-7xl
                       font-semibold
                       tracking-tight">

          A Letter

          <span className="text-rose-400
                           italic
                           font-light
                           ml-4">
            To You
          </span>

        </h1>

        <p className="mt-5 text-sm
                      text-white/35
                      tracking-wide">
          Something I have always wanted to say...
        </p>

      </motion.div>


      {/* =====================================================
          LETTER
      ===================================================== */}
      <div className="relative z-10 max-w-4xl mx-auto">

        <motion.div
          initial={{ opacity: 0, y: 50, rotateX: 8 }}
          animate={{ opacity: 1, y: 0, rotateX: 0 }}
          transition={{ duration: 1 }}
          className="relative"
        >

          {/* Outer Glow */}
          <div className="absolute -inset-5
                          rounded-[3rem]
                          bg-rose-500/[0.06]
                          blur-3xl" />


          {/* Letter Container */}
          <div className="relative
                          rounded-[2.5rem]
                          p-2
                          bg-gradient-to-br
                          from-white/15
                          via-white/5
                          to-rose-500/10
                          border border-white/10">

            <div className="relative
                            overflow-hidden
                            rounded-[2.2rem]
                            bg-[#fdf8f8]
                            text-[#4a1f2a]
                            shadow-2xl">


              {/* Paper Top */}
              <div className="relative
                              px-7 md:px-16
                              pt-12 md:pt-16
                              pb-10">

                {/* Decorative corner */}
                <div className="absolute top-0 right-0
                                w-32 h-32
                                bg-rose-100/60
                                rounded-bl-full" />


                {/* Letter Header */}
                <div className="relative
                                flex items-center
                                justify-between
                                mb-12">

                  <div>

                    <p className="text-[9px]
                                  uppercase
                                  tracking-[0.35em]
                                  text-rose-400
                                  mb-2">
                      From My Heart
                    </p>

                    <p className="font-serif
                                  text-2xl
                                  text-rose-900">
                      Dear Bichi,
                    </p>

                  </div>


                  {/* Heart Seal */}
                  <div className="w-14 h-14
                                  rounded-full
                                  flex items-center justify-center
                                  bg-rose-500
                                  text-white
                                  shadow-lg
                                  shadow-rose-500/20">

                    <Heart
                      size={25}
                      fill="currentColor"
                    />

                  </div>

                </div>


                {/* Letter Text */}
                <div className="relative
                                min-h-[300px]
                                font-serif
                                text-lg md:text-xl
                                leading-[2]
                                text-rose-950/75">

                  {!letterOpened ? (

                    <div className="flex flex-col
                                    items-center
                                    justify-center
                                    min-h-[280px]
                                    text-center">

                      <div className="w-16 h-16
                                      rounded-full
                                      bg-rose-100
                                      flex items-center
                                      justify-center
                                      mb-6">

                        <Heart
                          size={28}
                          className="text-rose-500"
                          fill="currentColor"
                        />

                      </div>

                      <p className="text-rose-900/60
                                    text-base
                                    mb-6">
                        A little message,
                        just for you...
                      </p>

                      <button
                        onClick={() => setLetterOpened(true)}
                        className="px-7 py-3
                                   rounded-full
                                   bg-rose-500
                                   text-white
                                   font-sans
                                   text-sm
                                   font-medium
                                   shadow-lg
                                   shadow-rose-500/20
                                   hover:bg-rose-600
                                   hover:-translate-y-0.5
                                   transition-all"
                      >
                        Open My Letter
                      </button>

                    </div>

                  ) : (

                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.8 }}
                    >

                      <Typewriter
                        text="My dearest Bichi, from the moment I met you, my life changed forever. You are the light in my darkness, the smile on my face, and the beat in my heart. Every second spent with you is a treasure I'll hold onto for eternity. I love you more than words can ever express."
                        delay={50}
                      />

                    </motion.div>

                  )}

                </div>


                {/* Signature */}
                {letterOpened && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 2 }}
                    className="mt-12 pt-8
                               border-t
                               border-rose-200"
                  >

                    <p className="font-serif
                                  italic
                                  text-xl
                                  text-rose-800">
                      Forever yours,
                    </p>

                    <p className="mt-2
                                  text-rose-500
                                  font-medium">
                      Jitendra ❤️
                    </p>

                  </motion.div>
                )}

              </div>


              {/* Paper Bottom */}
              <div className="h-3
                              bg-gradient-to-r
                              from-rose-200
                              via-pink-100
                              to-rose-200" />

            </div>

          </div>

        </motion.div>


        {/* =====================================================
            SURPRISE + PROPOSAL
        ===================================================== */}
        <div className="mt-20 grid md:grid-cols-2 gap-5">


          {/* Surprise Card */}
          <motion.div
            whileHover={{ y: -5 }}
            className="rounded-[2rem]
                       p-8
                       bg-white/[0.045]
                       backdrop-blur-xl
                       border border-white/10
                       text-center
                       transition-all
                       hover:border-rose-400/25"
          >

            <div className="mx-auto mb-5
                            w-14 h-14
                            rounded-2xl
                            bg-rose-500/10
                            border border-rose-400/15
                            flex items-center justify-center">

              <Gift
                size={27}
                className="text-rose-400"
              />

            </div>


            <h3 className="text-xl
                           font-semibold
                           text-white">
              A Little Surprise
            </h3>


            <p className="mt-2 mb-7
                          text-sm
                          text-white/35">
              There might be something special waiting for you.
            </p>


            <motion.button
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
              onClick={handleSurprise}
              className="px-7 py-3
                         rounded-full
                         bg-rose-500/10
                         border border-rose-400/20
                         text-rose-300
                         text-sm
                         font-medium
                         hover:bg-rose-500
                         hover:text-white
                         transition-all"
            >
              Open Surprise 🎁
            </motion.button>

          </motion.div>


          {/* Proposal Card */}
          <motion.div
            whileHover={{ y: -5 }}
            className="rounded-[2rem]
                       p-8
                       bg-gradient-to-br
                       from-rose-500/10
                       to-pink-500/[0.03]
                       backdrop-blur-xl
                       border border-rose-400/15
                       text-center
                       transition-all"
          >

            <div className="mx-auto mb-5
                            w-14 h-14
                            rounded-2xl
                            bg-rose-500/10
                            border border-rose-400/15
                            flex items-center justify-center">

              <Heart
                size={27}
                className="text-rose-400"
                fill="currentColor"
              />

            </div>


            <h3 className="text-xl
                           font-semibold
                           text-white">
              One Last Question
            </h3>


            <p className="mt-2 mb-7
                          text-sm
                          text-white/35">
              A question from the bottom of my heart.
            </p>


            <motion.button
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
              onClick={() => setShowProposal(true)}
              className="inline-flex
                         items-center
                         justify-center
                         gap-2
                         px-7 py-3
                         rounded-full
                         bg-gradient-to-r
                         from-rose-500
                         to-pink-600
                         text-white
                         text-sm
                         font-semibold
                         shadow-lg
                         shadow-rose-500/20
                         hover:shadow-rose-500/30
                         transition-all"
            >
              Will You Be Mine Forever?
              <ChevronRight size={17} />

            </motion.button>

          </motion.div>

        </div>

      </div>


      {/* =====================================================
          PROPOSAL MODAL
      ===================================================== */}
      <AnimatePresence>

        {showProposal && (

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0
                       z-[100]
                       bg-black/80
                       backdrop-blur-xl
                       flex items-center
                       justify-center
                       p-5"
            onClick={() => setShowProposal(false)}
          >

            <motion.div
              initial={{
                opacity: 0,
                scale: 0.8,
                y: 40,
              }}
              animate={{
                opacity: 1,
                scale: 1,
                y: 0,
              }}
              exit={{
                opacity: 0,
                scale: 0.8,
                y: 40,
              }}
              transition={{
                type: 'spring',
                damping: 20,
              }}
              onClick={(e) => e.stopPropagation()}
              className="relative
                         w-full
                         max-w-xl
                         overflow-hidden
                         rounded-[2.5rem]
                         bg-[#fffafa]
                         text-rose-950
                         shadow-[0_30px_100px_rgba(244,63,94,0.25)]"
            >

              {/* Close */}
              <button
                onClick={() => setShowProposal(false)}
                className="absolute
                           top-5 right-5
                           z-10
                           w-10 h-10
                           rounded-full
                           bg-rose-100
                           text-rose-500
                           flex items-center justify-center
                           hover:bg-rose-200
                           transition-colors"
              >

                <X size={20} />

              </button>


              {/* Modal Content */}
              <div className="px-7 md:px-12
                              py-12 md:py-14
                              text-center">

                <motion.div
                  animate={{
                    scale: [1, 1.08, 1],
                  }}
                  transition={{
                    duration: 1.5,
                    repeat: Infinity,
                  }}
                  className="mx-auto mb-7
                             w-20 h-20
                             rounded-full
                             bg-rose-100
                             flex items-center justify-center"
                >

                  <Heart
                    size={42}
                    fill="currentColor"
                    className="text-rose-500"
                  />

                </motion.div>


                <p className="text-xs
                              uppercase
                              tracking-[0.35em]
                              text-rose-400
                              mb-4">
                  A Question For You
                </p>


                <h2 className="text-4xl md:text-5xl
                               font-serif
                               text-rose-900
                               mb-6">
                  My Love...
                </h2>


                <p className="text-lg
                              leading-8
                              text-rose-800/65
                              max-w-md
                              mx-auto
                              mb-10">
                  Every day with you is a dream come true.
                  I want to spend the rest of my life
                  making you happy.
                </p>


                <div className="flex flex-col gap-3">

                  <button
                    onClick={() => {
                      confetti({
                        particleCount: 250,
                        spread: 120,
                        origin: { y: 0.6 },
                        colors: [
                          '#f43f5e',
                          '#fb7185',
                          '#fda4af',
                          '#fecdd3',
                        ],
                      });

                      alert(
                        "YAY! I'm the luckiest person alive! ❤️❤️❤️"
                      );

                      setShowProposal(false);
                    }}
                    className="w-full
                               py-4
                               rounded-2xl
                               bg-gradient-to-r
                               from-rose-500
                               to-pink-600
                               text-white
                               font-semibold
                               text-lg
                               shadow-lg
                               shadow-rose-500/20
                               hover:-translate-y-0.5
                               transition-all"
                  >
                    Yes, Forever! ❤️
                  </button>


                  <button
                    onMouseEnter={(e) => {
                      const btn = e.currentTarget;

                      btn.style.transform =
                        `translate(
                          ${Math.random() * 180 - 90}px,
                          ${Math.random() * 120 - 60}px
                        )`;
                    }}
                    className="py-3
                               text-rose-300
                               text-sm
                               hover:text-rose-400
                               transition-transform
                               duration-75"
                  >
                    Maybe? Try to catch me 😄
                  </button>

                </div>

              </div>


              {/* Bottom */}
              <div className="h-2
                              bg-gradient-to-r
                              from-rose-300
                              via-rose-500
                              to-pink-500" />

            </motion.div>

          </motion.div>

        )}

      </AnimatePresence>

    </section>
  );
};


const SpecialDatePage = () => {
const [timeTogether, setTimeTogether] = useState({
years: 0,
months: 0,
days: 0,
hours: 0,
minutes: 0,
seconds: 0,
});

useEffect(() => {
const startDate = new Date(2022, 5, 29, 0, 0, 0);


const updateTime = () => {
  const now = new Date();

  let years = now.getFullYear() - startDate.getFullYear();
  let months = now.getMonth() - startDate.getMonth();
  let days = now.getDate() - startDate.getDate();
  let hours = now.getHours() - startDate.getHours();
  let minutes = now.getMinutes() - startDate.getMinutes();
  let seconds = now.getSeconds() - startDate.getSeconds();

  if (seconds < 0) {
    seconds += 60;
    minutes--;
  }

  if (minutes < 0) {
    minutes += 60;
    hours--;
  }

  if (hours < 0) {
    hours += 24;
    days--;
  }

  if (days < 0) {
    const previousMonthDays = new Date(
      now.getFullYear(),
      now.getMonth(),
      0
    ).getDate();

    days += previousMonthDays;
    months--;
  }

  if (months < 0) {
    months += 12;
    years--;
  }

  setTimeTogether({
    years,
    months,
    days,
    hours,
    minutes,
    seconds,
  });
};

updateTime();

const timer = setInterval(updateTime, 1000);

return () => clearInterval(timer);


}, []);

const timeUnits = [
{
value: timeTogether.years,
label: "Years",
icon: "♡",
},
{
value: timeTogether.months,
label: "Months",
icon: "♡",
},
{
value: timeTogether.days,
label: "Days",
icon: "♡",
},
{
value: timeTogether.hours,
label: "Hours",
icon: "♡",
},
{
value: timeTogether.minutes,
label: "Minutes",
icon: "♡",
},
{
value: timeTogether.seconds,
label: "Seconds",
icon: "♡",
},
];

return ( <section className="relative min-h-screen overflow-hidden bg-[#090407] px-4 py-24 text-white">
{/* Background Glow */} <div className="pointer-events-none absolute inset-0 overflow-hidden"> <div className="absolute -left-40 top-10 h-96 w-96 rounded-full bg-rose-600/20 blur-[130px]" /> <div className="absolute -right-40 top-1/3 h-[500px] w-[500px] rounded-full bg-pink-500/10 blur-[150px]" /> <div className="absolute bottom-0 left-1/2 h-96 w-96 -translate-x-1/2 rounded-full bg-red-500/10 blur-[140px]" /> </div>


  {/* Decorative Hearts */}
  <motion.div
    animate={{
      y: [0, -18, 0],
      rotate: [0, 8, -8, 0],
    }}
    transition={{
      duration: 5,
      repeat: Infinity,
      ease: "easeInOut",
    }}
    className="pointer-events-none absolute left-[8%] top-32 text-rose-500/20"
  >
    <Heart size={90} fill="currentColor" />
  </motion.div>

  <motion.div
    animate={{
      y: [0, 20, 0],
      rotate: [0, -10, 10, 0],
    }}
    transition={{
      duration: 6,
      repeat: Infinity,
      ease: "easeInOut",
    }}
    className="pointer-events-none absolute right-[8%] top-48 text-pink-500/10"
  >
    <Heart size={120} fill="currentColor" />
  </motion.div>

  <div className="relative z-10 mx-auto max-w-6xl">

    {/* Hero */}
    <div className="mb-16 text-center">

      <motion.div
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.7 }}
        className="mx-auto mb-8 flex h-24 w-24 items-center justify-center rounded-full border border-rose-400/30 bg-rose-500/10 shadow-[0_0_60px_rgba(244,63,94,0.18)] backdrop-blur-xl"
      >
        <Calendar
          size={44}
          className="text-rose-400"
          strokeWidth={1.5}
        />
      </motion.div>

      <motion.p
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.15 }}
        className="mb-4 text-sm font-medium uppercase tracking-[0.5em] text-rose-400"
      >
        The Day It All Began
      </motion.p>

      <motion.h1
        initial={{ opacity: 0, y: 25 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.25 }}
        className="mb-5 bg-gradient-to-r from-white via-rose-100 to-rose-400 bg-clip-text text-5xl font-bold tracking-tight text-transparent md:text-7xl"
      >
        29 June 2022
      </motion.h1>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="mx-auto max-w-2xl text-lg font-light leading-relaxed text-white/50 md:text-xl"
      >
        The most beautiful chapter of our lives
        <br />
        started on this special day.
      </motion.p>
    </div>

    {/* Main Counter Card */}
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.3 }}
      className="relative overflow-hidden rounded-[2.5rem] border border-white/10 bg-white/[0.045] p-6 shadow-2xl backdrop-blur-2xl md:p-12"
    >
      {/* Card Glow */}
      <div className="pointer-events-none absolute left-1/2 top-0 h-40 w-2/3 -translate-x-1/2 rounded-full bg-rose-500/10 blur-[80px]" />

      <div className="relative z-10">

        <div className="mb-12 text-center">
          <p className="mb-3 text-xs font-medium uppercase tracking-[0.4em] text-rose-400">
            Our Journey
          </p>

          <h2 className="text-3xl font-semibold text-white md:text-4xl">
            Time Spent Together
          </h2>

          <div className="mx-auto mt-5 h-px w-20 bg-gradient-to-r from-transparent via-rose-500 to-transparent" />
        </div>

        {/* Counter */}
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:gap-5 lg:grid-cols-6">
          {timeUnits.map((item, index) => (
            <motion.div
              key={item.label}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                delay: 0.4 + index * 0.08,
                duration: 0.5,
              }}
              className="group relative overflow-hidden rounded-2xl border border-white/10 bg-black/20 p-5 text-center transition-all duration-300 hover:-translate-y-1 hover:border-rose-400/30 hover:bg-rose-500/[0.07]"
            >
              <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-rose-500/50 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />

              <div className="mb-2 text-sm text-rose-400/50">
                {item.icon}
              </div>

              <motion.div
                key={item.value}
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-4xl font-semibold tracking-tight text-white md:text-5xl"
              >
                {String(item.value).padStart(2, "0")}
              </motion.div>

              <div className="mt-3 text-[10px] font-medium uppercase tracking-[0.25em] text-white/35">
                {item.label}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Quote */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="mx-auto mt-14 max-w-3xl text-center"
        >
          <div className="mb-5 flex items-center justify-center gap-4">
            <div className="h-px w-12 bg-gradient-to-r from-transparent to-rose-500/40" />
            <Heart
              size={18}
              className="text-rose-400"
              fill="currentColor"
            />
            <div className="h-px w-12 bg-gradient-to-l from-transparent to-rose-500/40" />
          </div>

          <p className="text-lg font-light italic leading-8 text-white/55 md:text-xl">
            “On this day, two souls found something beautiful in each
            other. Every second since then has become a part of our story —
            filled with love, laughter, memories, and countless little
            moments.”
          </p>

          <p className="mt-6 text-sm font-medium uppercase tracking-[0.3em] text-rose-400/70">
            29 June — The Beginning Of Forever
          </p>
        </motion.div>
      </div>
    </motion.div>

    {/* Bottom Love Section */}
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 1.2 }}
      className="mt-10 grid gap-5 md:grid-cols-3"
    >
      <div className="rounded-3xl border border-white/10 bg-white/[0.035] p-7 text-center backdrop-blur-xl">
        <div className="mb-4 text-3xl">💗</div>
        <h3 className="mb-2 text-lg font-semibold text-white">
          One Beginning
        </h3>
        <p className="text-sm leading-6 text-white/40">
          One special day that changed everything.
        </p>
      </div>

      <div className="rounded-3xl border border-white/10 bg-white/[0.035] p-7 text-center backdrop-blur-xl">
        <div className="mb-4 text-3xl">∞</div>
        <h3 className="mb-2 text-lg font-semibold text-white">
          Endless Memories
        </h3>
        <p className="text-sm leading-6 text-white/40">
          Every moment becoming a beautiful memory.
        </p>
      </div>

      <div className="rounded-3xl border border-white/10 bg-white/[0.035] p-7 text-center backdrop-blur-xl">
        <div className="mb-4 text-3xl">❤️</div>
        <h3 className="mb-2 text-lg font-semibold text-white">
          Forever Ahead
        </h3>
        <p className="text-sm leading-6 text-white/40">
          The best part of our story is still waiting to be written.
        </p>
      </div>
    </motion.div>

    {/* Final Heart */}
    <motion.div
      animate={{
        scale: [1, 1.08, 1],
      }}
      transition={{
        duration: 2,
        repeat: Infinity,
        ease: "easeInOut",
      }}
      className="mt-16 flex justify-center"
    >
      <div className="flex h-16 w-16 items-center justify-center rounded-full border border-rose-500/20 bg-rose-500/10">
        <Heart
          size={28}
          className="text-rose-400"
          fill="currentColor"
        />
      </div>

      

    </motion.div>

  </div>
</section>


);
};

// --- Main App ---

export default function App() {
  return (
    <Router>
      <div className="min-h-screen bg-[#090407] text-white font-sans selection:bg-rose-200">
        <FloatingHearts />
        <MusicPlayer />
        <Navbar />

        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/story" element={<StoryPage />} />
          <Route path="/gallery" element={<GalleryPage />} />
          <Route path="/letter" element={<LetterPage />} />
          <Route path="/special-date" element={<SpecialDatePage />} />
        </Routes>

       <footer className="relative z-30 py-16 text-center text-rose-300 bg-gradient-to-b from-white/30 via-[#18080d] to-black border-t border-white/10">
  
  {/* Navigation Links */}
  <div className="flex flex-wrap items-center justify-center gap-6 mb-8 text-sm">
    <Link
      to="/"
      className="hover:text-rose-900 transition-colors"
    >
      Home
    </Link>

    <Link
      to="/story"
      className="hover:text-rose-600 transition-colors"
    >
      Story
    </Link>

    <Link
      to="/gallery"
      className="hover:text-rose-600 transition-colors"
    >
      Gallery
    </Link>

    <Link
      to="/letter"
      className="hover:text-rose-600 transition-colors"
    >
      Letter
    </Link>

    <Link
      to="/special-date"
      className="hover:text-rose-600 transition-colors"
    >
      Special Date
    </Link>
  </div>

  {/* Love Message */}
  <p className="flex items-center justify-center gap-2 text-lg">
    Made with
    <Heart
      size={20}
      fill="currentColor"
      className="text-rose-500 animate-pulse"
    />
    for Jitendra & Santosh
  </p>

  {/* Copyright */}
  <p className="text-sm mt-2 opacity-60">
    © 2026 Forever Together
  </p>

</footer>
      </div>
    </Router>
  );
}

