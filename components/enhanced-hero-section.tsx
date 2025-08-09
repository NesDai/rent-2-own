"use client"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Header } from "./header"
import { ChevronDown, Play, Sparkles } from "lucide-react"
import Link from "next/link"

export function EnhancedHeroSection() {
  return (
    <section className="flex flex-col items-center text-center relative w-full h-screen overflow-hidden">
      {/* Enhanced Animated Background */}
      <div className="absolute inset-0 z-0">
        {/* Dynamic Gradient Background */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-br from-primary/30 via-background to-secondary/20"
          animate={{
            background: [
              "linear-gradient(45deg, rgba(75, 140, 255, 0.3) 0%, rgba(15, 23, 42, 1) 50%, rgba(56, 253, 208, 0.2) 100%)",
              "linear-gradient(135deg, rgba(56, 253, 208, 0.3) 0%, rgba(15, 23, 42, 1) 50%, rgba(75, 140, 255, 0.2) 100%)",
              "linear-gradient(45deg, rgba(75, 140, 255, 0.3) 0%, rgba(15, 23, 42, 1) 50%, rgba(56, 253, 208, 0.2) 100%)",
            ],
          }}
          transition={{ duration: 8, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
        />

        {/* Enhanced Animated Particles */}
        {[...Array(30)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-primary rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -20, 0],
              x: [0, Math.random() * 20 - 10, 0],
              opacity: [0.3, 1, 0.3],
              scale: [1, 1.5, 1],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Number.POSITIVE_INFINITY,
              delay: Math.random() * 2,
              ease: "easeInOut",
            }}
          />
        ))}

        {/* Floating Geometric Shapes */}
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={`shape-${i}`}
            className={`absolute ${i % 2 === 0 ? "w-4 h-4 bg-secondary/20" : "w-6 h-6 bg-primary/20"} rounded-full blur-sm`}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -30, 0],
              rotate: [0, 360],
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: 6 + Math.random() * 4,
              repeat: Number.POSITIVE_INFINITY,
              delay: Math.random() * 3,
              ease: "easeInOut",
            }}
          />
        ))}

        {/* Enhanced Grid Pattern */}
        <svg
          width="100%"
          height="100%"
          viewBox="0 0 1920 1080"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="xMidYMid slice"
          className="opacity-10"
        >
          <defs>
            <pattern id="enhancedGrid" width="60" height="60" patternUnits="userSpaceOnUse">
              <path d="M 60 0 L 0 0 0 60" fill="none" stroke="currentColor" strokeWidth="1" opacity="0.5" />
              <circle cx="30" cy="30" r="1" fill="currentColor" opacity="0.3" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#enhancedGrid)" />
        </svg>

        {/* Large Glowing Orbs */}
        <motion.div
          className="absolute top-1/4 left-1/4 w-64 h-64 bg-primary/20 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.2, 0.4, 0.2],
          }}
          transition={{ duration: 4, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-secondary/15 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.15, 0.3, 0.15],
          }}
          transition={{ duration: 5, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut", delay: 1 }}
        />
      </div>

      {/* Seamless Transition Gradient - extends beyond section */}
      <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-b from-transparent to-background z-5" />

      {/* Header - Now completely transparent on landing page */}
      <div className="absolute top-0 left-0 right-0 z-20">
        <Header />
      </div>

      {/* Enhanced Hero Content - Made Smaller */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full max-w-5xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="space-y-6 text-center"
        >
          {/* Badge - Made Smaller */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="inline-flex items-center gap-2 px-3 py-1.5 bg-primary/10 border border-primary/20 rounded-full text-primary font-medium text-sm"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Built on SUI Blockchain</span>
          </motion.div>

          {/* Main Headline - Made Smaller */}
          <div className="space-y-3">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.3 }}
              className="text-4xl md:text-6xl lg:text-7xl font-bold leading-tight"
            >
              <span className="bg-gradient-to-r from-primary via-secondary to-primary bg-clip-text text-transparent bg-300% animate-gradient">
                Rent. Compete. Own.
              </span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.5 }}
              className="text-lg md:text-xl lg:text-2xl text-muted-foreground font-medium leading-relaxed max-w-3xl mx-auto"
            >
              The fastest way to own NFTs — pay rent, stack ownership, win the asset.
            </motion.p>
          </div>

          {/* CTA Buttons - Made Smaller */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.7 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-6"
          >
            <Link href="/marketplace">
              <Button className="bg-primary text-primary-foreground hover:bg-primary/90 px-8 py-3 rounded-full font-bold text-lg shadow-2xl hover:shadow-primary/25 transition-all duration-300 animate-glow-pulse group">
                <span>Start Competing</span>
                <motion.div
                  className="ml-2"
                  animate={{ x: [0, 5, 0] }}
                  transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY }}
                >
                  →
                </motion.div>
              </Button>
            </Link>
            <Button
              variant="outline"
              className="border-2 border-secondary text-secondary hover:bg-secondary hover:text-secondary-foreground px-8 py-3 rounded-full font-bold text-lg flex items-center gap-2 transition-all duration-300 bg-transparent backdrop-blur-sm group"
            >
              <Play className="w-5 h-5 group-hover:scale-110 transition-transform" />
              Learn How It Works
            </Button>
          </motion.div>

          {/* Trust Indicators - Made Smaller */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1 }}
            className="flex flex-wrap justify-center items-center gap-6 pt-8 text-sm text-muted-foreground"
          >
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
              <span>Live on SUI Mainnet</span>
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* Enhanced Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.2 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
          className="flex flex-col items-center gap-2 cursor-pointer group"
        >
          <span className="text-xs text-muted-foreground group-hover:text-foreground transition-colors">
            Scroll to explore
          </span>
          <ChevronDown className="w-6 h-6 text-muted-foreground group-hover:text-primary transition-colors" />
        </motion.div>
      </motion.div>
    </section>
  )
}
