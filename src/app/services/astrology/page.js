"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import Link from "next/link"
import { Star, CheckCircle, ArrowForward, Schedule } from "@mui/icons-material"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"

export default function AstrologyPage() {
  const benefits = [
    "Gain insights into your personality and life path",
    "Understand your relationships and compatibility",
    "Make informed decisions about career and finances",
    "Discover your strengths and overcome challenges",
    "Find the best timing for important life events",
    "Connect with your spiritual purpose and destiny",
  ]

  const astrologers = [
    {
      id: "1",
      name: "Acharya Sharma",
      rating: 4.9,
      reviews: 128,
      experience: 15,
      image: "/astrologers/astrologer-1.jpg",
      specialties: ["Vedic Astrology", "Birth Chart Analysis"],
    },
    {
      id: "2",
      name: "Pandit Rajesh",
      rating: 4.8,
      reviews: 215,
      experience: 20,
      image: "/astrologers/astrologer-3.jpg",
      specialties: ["Predictive Astrology", "Remedial Measures"],
    },
    {
      id: "3",
      name: "Dr. Priya Joshi",
      rating: 4.7,
      reviews: 89,
      experience: 12,
      image: "/astrologers/astrologer-4.jpg",
      specialties: ["Western Astrology", "Psychological Astrology"],
    },
  ]

  return (
    <>
      <Navbar />
      <main className="pt-20">
        {/* Hero Section */}
        <section className="relative overflow-hidden bg-gradient-to-b from-purple-50 to-white py-20">
          <div className="absolute inset-0 bg-[url('/patterns/stars.svg')] opacity-5"></div>
          <div className="container mx-auto px-4">
            <div className="flex flex-col lg:flex-row items-center">
              <motion.div
                className="lg:w-1/2 mb-10 lg:mb-0"
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
              >
                <h1 className="text-4xl md:text-6xl font-bold mb-6">
                  Discover Your Destiny with <span className="text-gradient">Astrology</span>
                </h1>
                <p className="text-lg md:text-xl text-muted-foreground mb-8">
                  Unlock the secrets of the stars and gain profound insights into your life, relationships, and future
                  through the ancient wisdom of astrology.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Link
                    href="/astrologers?specialty=Vedic Astrology"
                    className="inline-flex items-center justify-center px-6 py-3 rounded-lg bg-primary text-white font-medium hover:bg-primary-dark transition-colors"
                  >
                    Consult an Astrologer
                    <ArrowForward className="ml-2 h-5 w-5" />
                  </Link>
                  <Link
                    href="#how-it-works"
                    className="inline-flex items-center justify-center px-6 py-3 rounded-lg border border-input bg-background hover:bg-accent transition-colors"
                  >
                    Learn More
                  </Link>
                </div>
              </motion.div>
              <motion.div
                className="lg:w-1/2"
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <div className="relative">
                  <div className="absolute -inset-4 bg-gradient-to-r from-purple-500 to-indigo-500 rounded-full blur-3xl opacity-20"></div>
                  <Image
                    src="/services/astrology-hero.png"
                    alt="Astrology consultation"
                    width={600}
                    height={500}
                    className="relative z-10 animate-float"
                  />
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* What is Astrology */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <motion.div
                className="text-center mb-16"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
              >
                <h2 className="text-3xl md:text-4xl font-bold mb-6">What is Astrology?</h2>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  Astrology is the ancient practice of studying the movements and relative positions of celestial bodies
                  to gain insights into human affairs and terrestrial events. For thousands of years, astrologers have
                  used the positions of the sun, moon, planets, and stars at the time of birth to create detailed birth
                  charts that reveal personality traits, life patterns, and potential future events.
                </p>
              </motion.div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                <motion.div
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5 }}
                >
                  <Image
                    src="/services/astrology-chart.png"
                    alt="Astrological birth chart"
                    width={500}
                    height={400}
                    className="rounded-lg shadow-lg"
                  />
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, x: 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                >
                  <h3 className="text-2xl font-bold mb-4">Your Birth Chart is Your Cosmic Blueprint</h3>
                  <p className="text-muted-foreground mb-6">
                    Your birth chart, also known as a natal chart, is a snapshot of the sky at the exact moment and
                    location of your birth. This unique cosmic fingerprint reveals your inherent strengths, challenges,
                    and life purpose.
                  </p>
                  <ul className="space-y-3">
                    {benefits.slice(0, 3).map((benefit, index) => (
                      <li key={index} className="flex items-start">
                        <CheckCircle className="h-5 w-5 text-primary mr-3 mt-0.5 flex-shrink-0" />
                        <span>{benefit}</span>
                      </li>
                    ))}
                  </ul>
                </motion.div>
              </div>
            </div>
          </div>
        </section>

        {/* Benefits Section */}
        <section className="py-20 bg-muted">
          <div className="container mx-auto px-4">
            <motion.div
              className="text-center mb-16"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-6">Benefits of Astrological Guidance</h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Discover how astrology can provide valuable insights and guidance for every aspect of your life
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {benefits.map((benefit, index) => (
                <motion.div
                  key={index}
                  className="bg-white p-6 rounded-xl shadow-sm border border-border"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <CheckCircle className="h-8 w-8 text-primary mb-4" />
                  <p className="font-medium">{benefit}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* How It Works */}
        <section id="how-it-works" className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <motion.div
              className="text-center mb-16"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-6">How Astrological Consultation Works</h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Get personalized insights through our simple and secure consultation process
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  step: "1",
                  title: "Choose Your Astrologer",
                  description: "Browse our verified astrologers and select one based on their specialties and reviews",
                  icon: <Star className="h-8 w-8" />,
                },
                {
                  step: "2",
                  title: "Book Your Session",
                  description:
                    "Schedule a convenient time or start an instant chat session with your chosen astrologer",
                  icon: <Schedule className="h-8 w-8" />,
                },
                {
                  step: "3",
                  title: "Get Your Reading",
                  description:
                    "Receive detailed insights about your birth chart, current transits, and future predictions",
                  icon: <CheckCircle className="h-8 w-8" />,
                },
              ].map((step, index) => (
                <motion.div
                  key={index}
                  className="text-center"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.2 }}
                >
                  <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center text-white font-bold text-xl mx-auto mb-4">
                    {step.step}
                  </div>
                  <div className="text-primary mb-4">{step.icon}</div>
                  <h3 className="text-xl font-semibold mb-4">{step.title}</h3>
                  <p className="text-muted-foreground">{step.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Featured Astrologers */}
        <section className="py-20 bg-muted">
          <div className="container mx-auto px-4">
            <motion.div
              className="text-center mb-16"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-6">Expert Astrologers</h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Connect with our verified and experienced astrologers specializing in various astrological traditions
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {astrologers.map((astrologer, index) => (
                <motion.div
                  key={astrologer.id}
                  className="bg-white p-6 rounded-xl shadow-sm border border-border"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <div className="text-center">
                    <Image
                      src={astrologer.image || "/placeholder.svg"}
                      alt={astrologer.name}
                      width={80}
                      height={80}
                      className="rounded-full mx-auto mb-4"
                    />
                    <h3 className="text-xl font-semibold mb-2">{astrologer.name}</h3>
                    <div className="flex items-center justify-center mb-2">
                      <Star className="h-4 w-4 text-yellow-500 mr-1" />
                      <span className="font-medium">{astrologer.rating}</span>
                      <span className="text-muted-foreground text-sm ml-1">({astrologer.reviews} reviews)</span>
                    </div>
                    <p className="text-sm text-muted-foreground mb-4">{astrologer.experience} years experience</p>
                    <div className="flex flex-wrap gap-2 justify-center mb-6">
                      {astrologer.specialties.map((specialty) => (
                        <span
                          key={specialty}
                          className="px-2 py-1 bg-muted text-xs font-medium rounded-full text-muted-foreground"
                        >
                          {specialty}
                        </span>
                      ))}
                    </div>
                    <Link
                      href={`/astrologers/${astrologer.id}`}
                      className="inline-flex items-center justify-center w-full py-2 px-4 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors"
                    >
                      Consult Now
                    </Link>
                  </div>
                </motion.div>
              ))}
            </div>

            <div className="text-center mt-12">
              <Link
                href="/astrologers?specialty=Vedic Astrology"
                className="inline-flex items-center justify-center px-8 py-3 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors font-medium"
              >
                View All Astrologers
                <ArrowForward className="ml-2 h-5 w-5" />
              </Link>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-gradient-to-r from-purple-600 to-indigo-600 text-white">
          <div className="container mx-auto px-4 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Discover Your Cosmic Blueprint?</h2>
              <p className="text-lg mb-8 max-w-2xl mx-auto opacity-90">
                Take the first step towards understanding your true potential and life purpose through the wisdom of
                astrology
              </p>
              <Link
                href="/astrologers?specialty=Vedic Astrology"
                className="inline-flex items-center justify-center px-8 py-4 rounded-lg bg-white text-purple-600 font-medium hover:bg-opacity-90 transition-colors"
              >
                Start Your Journey
                <ArrowForward className="ml-2 h-5 w-5" />
              </Link>
            </motion.div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
