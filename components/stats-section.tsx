"use client"

import { motion } from "framer-motion"
import { TrendingUp, Users, Zap, DollarSign } from "lucide-react"

const stats = [
  {
    icon: <TrendingUp className="w-8 h-8" />,
    value: "2.4M",
    label: "Total Volume",
    suffix: "SUI",
    color: "text-primary",
  },
  {
    icon: <Users className="w-8 h-8" />,
    value: "15.2K",
    label: "Active Users",
    suffix: "",
    color: "text-secondary",
  },
  {
    icon: <Zap className="w-8 h-8" />,
    value: "847",
    label: "NFTs Listed",
    suffix: "",
    color: "text-primary",
  },
  {
    icon: <DollarSign className="w-8 h-8" />,
    value: "156",
    label: "Completed Races",
    suffix: "",
    color: "text-secondary",
  },
]

export function StatsSection() {
  return (
    <section
      id="stats"
      className="w-full py-16 md:py-24 relative overflow-hidden bg-gradient-to-b from-background via-background to-muted/10"
    >
      {/* Seamless Transition from Hero */}
      <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-background to-transparent" />

      {/* Background Effects */}
      <div className="absolute inset-0">
        {/* Continuing the hero's particle effect */}
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-primary/50 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -15, 0],
              x: [0, Math.random() * 15 - 7.5, 0],
              opacity: [0.2, 0.6, 0.2],
              scale: [0.8, 1.2, 0.8],
            }}
            transition={{
              duration: 4 + Math.random() * 2,
              repeat: Number.POSITIVE_INFINITY,
              delay: Math.random() * 3,
              ease: "easeInOut",
            }}
          />
        ))}

        {/* Subtle glowing orbs that continue the hero theme */}
        <div className="absolute top-1/4 left-1/6 w-48 h-48 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/6 w-64 h-64 bg-secondary/5 rounded-full blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto px-5 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            Platform{" "}
            <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">Statistics</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Real-time metrics from the Race2Own ecosystem
          </p>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="group relative"
            >
              <div className="bg-card/30 backdrop-blur-sm rounded-2xl border border-border p-8 text-center hover:border-primary/50 transition-all duration-300 hover:shadow-lg hover:shadow-primary/10">
                <div
                  className={`inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-r from-primary/20 to-secondary/20 mb-4 group-hover:scale-110 transition-transform duration-300 ${stat.color}`}
                >
                  {stat.icon}
                </div>
                <div className="space-y-2">
                  <div className="flex items-baseline justify-center gap-1">
                    <motion.span
                      className={`text-3xl md:text-4xl font-bold ${stat.color}`}
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 1, delay: index * 0.1 + 0.3 }}
                    >
                      {stat.value}
                    </motion.span>
                    {stat.suffix && <span className="text-lg text-muted-foreground font-medium">{stat.suffix}</span>}
                  </div>
                  <p className="text-muted-foreground font-medium">{stat.label}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Smooth transition to next section */}
      <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-b from-transparent to-muted/10" />
    </section>
  )
}
