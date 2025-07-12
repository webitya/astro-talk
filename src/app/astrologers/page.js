"use client"

import { useState, useEffect, useCallback } from "react"
import { motion, AnimatePresence } from "framer-motion"
import AstrologerCard from "@/components/astrologer-card"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import { Search, Star, FilterList } from "@mui/icons-material"
import CustomDrawer from "@/components/custom-drawer"
import { Button } from "@/components/ui/button" // Keep Button for other uses

export default function AstrologersPage() {
  const [astrologers, setAstrologers] = useState([])
  const [filteredAstrologers, setFilteredAstrologers] = useState([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedSpecialty, setSelectedSpecialty] = useState("All Specialties")
  const [minRating, setMinRating] = useState(0)
  const [priceRange, setPriceRange] = useState([0, 5000])
  const [experienceRange, setExperienceRange] = useState([0, 30])
  const [selectedLanguages, setSelectedLanguages] = useState([])
  const [sortBy, setSortBy] = useState("rating")
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false)
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 12

  const specialties = [
    "All Specialties",
    "Vedic Astrology",
    "Tarot Reading",
    "Numerology",
    "Palmistry",
    "Vastu Shastra",
    "Puja Rituals",
    "Sound Healing",
    "Meditation",
    "Career Guidance",
    "Love & Relationships",
  ]

  const languages = ["Hindi", "English", "Sanskrit", "Bengali", "Punjabi", "Marathi", "Gujarati"]

  const fetchAstrologers = async () => {
    try {
      setLoading(true)
      const response = await fetch("/api/astrologers")
      const data = await response.json()

      if (Array.isArray(data)) {
        setAstrologers(data)
        setFilteredAstrologers(data)
      } else {
        console.error("Expected array but got:", typeof data)
        setAstrologers([])
        setFilteredAstrologers([])
      }
    } catch (error) {
      console.error("Error fetching astrologers:", error)
      setAstrologers([])
      setFilteredAstrologers([])
    } finally {
      setLoading(false)
    }
  }

  const filterAndSortAstrologers = useCallback(() => {
    const filtered = astrologers.filter((astrologer) => {
      const matchesSearch =
        astrologer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        astrologer.specialties.some((s) => s.toLowerCase().includes(searchTerm.toLowerCase()))

      const matchesSpecialty =
        selectedSpecialty === "All Specialties" || astrologer.specialties.includes(selectedSpecialty)

      const matchesRating = astrologer.rating >= minRating

      const matchesPrice = astrologer.hourlyRate >= priceRange[0] && astrologer.hourlyRate <= priceRange[1]

      const matchesExperience =
        astrologer.experience >= experienceRange[0] && astrologer.experience <= experienceRange[1]

      const matchesLanguage =
        selectedLanguages.length === 0 || selectedLanguages.some((lang) => astrologer.languages.includes(lang))

      return matchesSearch && matchesSpecialty && matchesRating && matchesPrice && matchesExperience && matchesLanguage
    })

    // Sort astrologers
    filtered.sort((a, b) => {
      switch (sortBy) {
        case "rating":
          return b.rating - a.rating
        case "experience":
          return b.experience - a.experience
        case "price-low":
          return a.hourlyRate - b.hourlyRate
        case "price-high":
          return b.hourlyRate - a.hourlyRate
        case "reviews":
          return b.reviewCount - a.reviewCount
        default:
          return 0
      }
    })

    setFilteredAstrologers(filtered)
    setCurrentPage(1)
    if (isMobileFilterOpen) {
      setIsMobileFilterOpen(false) // Close drawer after applying filters
    }
  }, [
    astrologers,
    searchTerm,
    selectedSpecialty,
    minRating,
    priceRange,
    experienceRange,
    selectedLanguages,
    sortBy,
    isMobileFilterOpen,
  ])

  useEffect(() => {
    fetchAstrologers()
  }, [])

  useEffect(() => {
    filterAndSortAstrologers()
  }, [filterAndSortAstrologers])

  const toggleLanguage = (language) => {
    setSelectedLanguages((prev) => (prev.includes(language) ? prev.filter((l) => l !== language) : [...prev, language]))
  }

  const clearFilters = () => {
    setSearchTerm("")
    setSelectedSpecialty("All Specialties")
    setMinRating(0)
    setPriceRange([0, 5000])
    setExperienceRange([0, 30])
    setSelectedLanguages([])
    setSortBy("rating")
  }

  // Pagination
  const totalPages = Math.ceil(filteredAstrologers.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const paginatedAstrologers = filteredAstrologers.slice(startIndex, startIndex + itemsPerPage)

  const FilterContent = () => (
    <>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-semibold text-gray-900">Filters</h2>
        <button onClick={clearFilters} className="text-orange-600 hover:text-orange-700 text-sm font-medium">
          Reset All
        </button>
      </div>

      {/* Search */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-2">Search</label>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <input
            type="text"
            placeholder="Search astrologers..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
          />
        </div>
      </div>

      {/* Specialty */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-2">Specialty</label>
        <select
          value={selectedSpecialty}
          onChange={(e) => setSelectedSpecialty(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
        >
          {specialties.map((specialty) => (
            <option key={specialty} value={specialty}>
              {specialty}
            </option>
          ))}
        </select>
      </div>

      {/* Rating */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-3">Minimum Rating</label>
        <div className="space-y-2">
          {[5, 4, 3, 2, 1].map((rating) => (
            <label key={rating} className="flex items-center">
              <input
                type="radio"
                name="rating"
                value={rating}
                checked={minRating === rating}
                onChange={(e) => setMinRating(Number(e.target.value))}
                className="mr-2"
              />
              <div className="flex items-center">
                {Array.from({ length: rating }).map((_, i) => (
                  <Star key={i} className="h-4 w-4 text-yellow-500 fill-current" />
                ))}
                <span className="ml-1 text-sm text-gray-600">& Up</span>
              </div>
            </label>
          ))}
        </div>
      </div>

      {/* Price Range */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Price Range (₹/hour): ₹{priceRange[0]} - ₹{priceRange[1]}
        </label>
        <div className="px-2">
          <input
            type="range"
            min="0"
            max="5000"
            step="100"
            value={priceRange[1]}
            onChange={(e) => setPriceRange([priceRange[0], Number(e.target.value)])}
            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
          />
        </div>
      </div>

      {/* Languages */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-2">Languages</label>
        <div className="flex flex-wrap gap-2">
          {languages.map((language) => (
            <button
              key={language}
              onClick={() => toggleLanguage(language)}
              className={`px-3 py-1 text-xs font-medium rounded-full border transition-colors ${
                selectedLanguages.includes(language)
                  ? "bg-orange-100 text-orange-800 border-orange-300"
                  : "bg-gray-50 text-gray-600 border-gray-300 hover:bg-gray-100"
              }`}
            >
              {language}
            </button>
          ))}
        </div>
      </div>
      <Button onClick={filterAndSortAstrologers} className="w-full bg-orange-600 hover:bg-orange-700 text-white">
        Apply Filters
      </Button>
    </>
  )

  if (loading) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen bg-gray-50 pt-20">
          {/* Header */}
          <div className="bg-gradient-to-r from-orange-500 to-red-600 text-white py-12">
            <div className="container mx-auto px-4">
              <h1 className="text-3xl md:text-4xl font-bold text-center mb-4">Find Your Astrologer</h1>
              <p className="text-center text-orange-100 max-w-2xl mx-auto">
                Connect with experienced astrologers for guidance on love, career, health, and spiritual growth
              </p>
            </div>
          </div>

          {/* Loading Skeleton */}
          <div className="container mx-auto px-4 py-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {Array.from({ length: 6 }).map((_, index) => (
                <div key={index} className="bg-white rounded-lg border border-gray-200 p-4 animate-pulse">
                  <div className="flex items-start space-x-3 mb-3">
                    <div className="w-16 h-16 bg-gray-200 rounded-full flex-shrink-0"></div>
                    <div className="flex-1 min-w-0">
                      <div className="h-4 bg-gray-200 rounded mb-2"></div>
                      <div className="h-3 bg-gray-200 rounded mb-1"></div>
                      <div className="h-3 bg-gray-200 rounded w-2/3"></div>
                    </div>
                  </div>
                  <div className="space-y-2 mb-4">
                    <div className="h-6 bg-gray-200 rounded"></div>
                    <div className="h-3 bg-gray-200 rounded"></div>
                    <div className="h-12 bg-gray-200 rounded"></div>
                  </div>
                  <div className="h-10 bg-gray-200 rounded"></div>
                </div>
              ))}
            </div>
          </div>
        </div>
        <Footer />
      </>
    )
  }

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gray-50 pt-20">
        {/* Header */}
        <div className="bg-gradient-to-r from-orange-500 to-red-600 text-white py-12">
          <div className="container mx-auto px-4">
            <h1 className="text-3xl md:text-4xl font-bold text-center mb-4">Find Your Astrologer</h1>
            <p className="text-center text-orange-100 max-w-2xl mx-auto">
              Connect with experienced astrologers for guidance on love, career, health, and spiritual growth
            </p>
          </div>
        </div>

        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Filters Sidebar (Desktop) */}
            <div className="hidden lg:block lg:w-80 flex-shrink-0">
              <div className="bg-white rounded-lg border border-gray-200 p-6 lg:sticky lg:top-4">
                <FilterContent />
              </div>
            </div>

            {/* Main Content */}
            <div className="flex-1 min-w-0">
              {/* Results Header */}
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6">
                <div>
                  <h2 className="text-xl font-semibold text-gray-900">
                    {filteredAstrologers.length} Astrologers Found
                  </h2>
                  <p className="text-gray-600 text-sm">
                    Showing {startIndex + 1}-{Math.min(startIndex + itemsPerPage, filteredAstrologers.length)} of{" "}
                    {filteredAstrologers.length} results
                  </p>
                </div>

                <div className="mt-4 sm:mt-0">
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  >
                    <option value="rating">Highest Rated</option>
                    <option value="experience">Most Experienced</option>
                    <option value="price-low">Price: Low to High</option>
                    <option value="price-high">Price: High to Low</option>
                    <option value="reviews">Most Reviews</option>
                  </select>
                </div>
              </div>

              {/* Astrologers Grid - 3 cards per row on desktop */}
              {filteredAstrologers.length === 0 ? (
                <div className="text-center py-12">
                  <div className="w-24 h-24 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
                    <Search className="h-8 w-8 text-gray-400" />
                  </div>
                  <h3 className="text-lg font-medium text-gray-900 mb-2">No astrologers found</h3>
                  <p className="text-gray-600 mb-4">
                    We could not find any astrologers matching your current filters. Try adjusting your search criteria
                    or explore our full directory.
                  </p>
                  <button
                    onClick={clearFilters}
                    className="px-6 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors"
                  >
                    Clear All Filters
                  </button>
                </div>
              ) : (
                <>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    <AnimatePresence>
                      {paginatedAstrologers.map((astrologer) => (
                        <motion.div
                          key={astrologer.id}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -20 }}
                          transition={{ duration: 0.3 }}
                        >
                          <AstrologerCard astrologer={astrologer} />
                        </motion.div>
                      ))}
                    </AnimatePresence>
                  </div>

                  {/* Pagination */}
                  {totalPages > 1 && (
                    <div className="flex justify-center items-center space-x-2 mt-8">
                      <button
                        onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                        disabled={currentPage === 1}
                        className="px-3 py-2 border border-gray-300 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
                      >
                        Previous
                      </button>

                      {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                        const pageNum = i + 1
                        return (
                          <button
                            key={pageNum}
                            onClick={() => setCurrentPage(pageNum)}
                            className={`px-3 py-2 border rounded-lg ${
                              currentPage === pageNum
                                ? "bg-orange-600 text-white border-orange-600"
                                : "border-gray-300 hover:bg-gray-50"
                            }`}
                          >
                            {pageNum}
                          </button>
                        )
                      })}

                      <button
                        onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                        disabled={currentPage === totalPages}
                        className="px-3 py-2 border border-gray-300 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
                      >
                        Next
                      </button>
                    </div>
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      </div>
      <Footer />

      {/* Mobile Filter Button and Custom Drawer */}
      <div className="fixed bottom-4 right-4 lg:hidden z-40">
        {/* Changed to a standard HTML button */}
        <button
          className="rounded-full w-14 h-14 bg-orange-600 hover:bg-orange-700 text-white shadow-lg flex items-center justify-center"
          aria-label="Open filters"
          onClick={() => setIsMobileFilterOpen(true)}
        >
          <FilterList className="h-6 w-6" />
        </button>
        <CustomDrawer
          isOpen={isMobileFilterOpen}
          onClose={() => setIsMobileFilterOpen(false)}
          title="Filter Astrologers"
          side="right"
        >
          <FilterContent />
        </CustomDrawer>
      </div>
    </>
  )
}
