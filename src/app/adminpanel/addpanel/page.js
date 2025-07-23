'use client'

import { useState } from 'react'

export default function FilterAstrologers() {
  const [filters, setFilters] = useState({
    name: '',
    minRating: '',
    minPrice: '',
    maxPrice: '',
    expertise: '',
    language: ''
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setFilters((prev) => ({ ...prev, [name]: value }))
  }

  const handleClear = () => {
    setFilters({
      name: '',
      minRating: '',
      minPrice: '',
      maxPrice: '',
      expertise: '',
      language: ''
    })
  }

  return (
    <div className="bg-gradient-to-br from-purple-900 via-indigo-900 to-black text-white p-6 rounded-xl shadow-[0_0_20px_rgba(138,43,226,0.6)] border border-purple-500 max-w-xs mx-auto">
      <h2 className="text-xl font-bold text-pink-400 flex items-center gap-2 mb-4">
        🎯 Filter Astrologers
      </h2>

      {/* Name */}
      <label className="block mb-2 text-sm">Search by Name</label>
      <input
        type="text"
        name="name"
        placeholder="e.g. Ravi"
        value={filters.name}
        onChange={handleChange}
        className="w-full px-3 py-2 mb-4 rounded bg-transparent border border-purple-400 text-white placeholder-purple-300 focus:outline-none focus:ring-2 focus:ring-pink-500"
      />

      {/* Rating */}
      <label className="block mb-2 text-sm">Minimum Rating</label>
      <select
        name="minRating"
        value={filters.minRating}
        onChange={handleChange}
        className="w-full px-3 py-2 mb-4 rounded bg-transparent border border-purple-400 text-white focus:outline-none focus:ring-2 focus:ring-pink-500"
      >
        <option value="">All Ratings</option>
        <option value="4">4+</option>
        <option value="3">3+</option>
        <option value="2">2+</option>
      </select>

      {/* Price */}
      <div className="flex gap-2 mb-4">
        <div className="w-1/2">
          <label className="block mb-2 text-sm">Min Price (₹)</label>
          <input
            type="number"
            name="minPrice"
            value={filters.minPrice}
            onChange={handleChange}
            className="w-full px-3 py-2 rounded bg-transparent border border-purple-400 text-white focus:outline-none focus:ring-2 focus:ring-pink-500"
          />
        </div>
        <div className="w-1/2">
          <label className="block mb-2 text-sm">Max Price (₹)</label>
          <input
            type="number"
            name="maxPrice"
            value={filters.maxPrice}
            onChange={handleChange}
            className="w-full px-3 py-2 rounded bg-transparent border border-purple-400 text-white focus:outline-none focus:ring-2 focus:ring-pink-500"
          />
        </div>
      </div>

      {/* Expertise */}
      <label className="block mb-2 text-sm">Expertise</label>
      <select
        name="expertise"
        value={filters.expertise}
        onChange={handleChange}
        className="w-full px-3 py-2 mb-4 rounded bg-transparent border border-purple-400 text-white focus:outline-none focus:ring-2 focus:ring-pink-500"
      >
        <option value="">All</option>
        <option value="vedic">Vedic</option>
        <option value="numerology">Numerology</option>
        <option value="tarot">Tarot</option>
      </select>

      {/* Language */}
      <label className="block mb-2 text-sm">Language</label>
      <select
        name="language"
        value={filters.language}
        onChange={handleChange}
        className="w-full px-3 py-2 mb-4 rounded bg-transparent border border-purple-400 text-white focus:outline-none focus:ring-2 focus:ring-pink-500"
      >
        <option value="">All Languages</option>
        <option value="hindi">Hindi</option>
        <option value="english">English</option>
        <option value="telugu">Telugu</option>
      </select>

      {/* Clear Filters Button */}
      <button
        onClick={handleClear}
        className="w-full bg-pink-600 hover:bg-pink-700 text-white font-semibold py-2 rounded shadow-md transition duration-200 flex items-center justify-center gap-2"
      >
        🧹 Clear Filters
      </button>
    </div>
  )
}
