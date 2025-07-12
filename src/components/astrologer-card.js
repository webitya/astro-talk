"use client"

import Image from "next/image"
import { useState } from "react"
import { Star, Language, Favorite, FavoriteBorder, CheckCircle } from "@mui/icons-material"
import { Award } from "lucide-react"

export default function AstrologerCard({ astrologer }) {
  const [isFavorite, setIsFavorite] = useState(false)

  const handleBookSession = () => {
    console.log(`Booking session with ${astrologer.name}`)
  }

  const toggleFavorite = () => {
    setIsFavorite(!isFavorite)
  }

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-4 h-full flex flex-col overflow-hidden">
      {/* Header Section */}
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-start space-x-3 flex-1 min-w-0">
          {/* Profile Image */}
          <div className="relative flex-shrink-0">
            <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-orange-200">
              <Image
                src={astrologer.image || "/placeholder.svg"}
                alt={astrologer.name}
                width={64}
                height={64}
                className="w-full h-full object-cover"
              />
            </div>
            {/* Online Status */}
            {astrologer.isOnline && (
              <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white" />
            )}
          </div>

          {/* Name and Basic Info */}
          <div className="flex-1 min-w-0 overflow-hidden">
            <div className="flex items-center gap-1 mb-1">
              <h3 className="text-base font-semibold text-gray-900 truncate pr-1" title={astrologer.name}>
                {astrologer.name}
              </h3>
              {astrologer.isVerified && <CheckCircle className="h-4 w-4 text-blue-500 flex-shrink-0" />}
            </div>

            {/* Rating */}
            <div className="flex items-center gap-2 mb-1">
              <div className="flex items-center flex-shrink-0">
                <Star className="h-3.5 w-3.5 text-yellow-500 fill-current" />
                <span className="text-sm font-medium text-gray-900 ml-1">{astrologer.rating}</span>
              </div>
              <span className="text-xs text-gray-500 truncate">({astrologer.reviewCount})</span>
            </div>

            {/* Experience */}
            <div className="flex items-center text-xs text-gray-600 overflow-hidden">
              <Award className="h-3.5 w-3.5 mr-1 flex-shrink-0" />
              <span className="truncate">{astrologer.experience} years exp</span>
            </div>
          </div>
        </div>

        {/* Favorite Button */}
        <button
          onClick={toggleFavorite}
          className="p-1 rounded-full hover:bg-gray-100 transition-colors flex-shrink-0 ml-2"
        >
          {isFavorite ? (
            <Favorite className="h-5 w-5 text-red-500" />
          ) : (
            <FavoriteBorder className="h-5 w-5 text-gray-400" />
          )}
        </button>
      </div>

      {/* Specialties */}
      <div className="mb-3 overflow-hidden">
        <div className="flex flex-wrap gap-1">
          {astrologer.specialties.slice(0, 2).map((specialty, index) => (
            <span
              key={index}
              className="px-2 py-1 bg-orange-50 text-orange-700 text-xs font-medium rounded border border-orange-200 truncate max-w-full"
              title={specialty}
            >
              {specialty}
            </span>
          ))}
          {astrologer.specialties.length > 2 && (
            <span className="px-2 py-1 bg-gray-50 text-gray-600 text-xs font-medium rounded border border-gray-200 flex-shrink-0">
              +{astrologer.specialties.length - 2}
            </span>
          )}
        </div>
      </div>

      {/* Languages */}
      <div className="mb-3 overflow-hidden">
        <div className="flex items-center text-xs text-gray-600">
          <Language className="h-3.5 w-3.5 mr-1 flex-shrink-0" />
          <div className="flex-1 min-w-0">
            <span className="truncate block" title={astrologer.languages.join(", ")}>
              {astrologer.languages.slice(0, 2).join(", ")}
              {astrologer.languages.length > 2 && <span className="ml-1">+{astrologer.languages.length - 2}</span>}
            </span>
          </div>
        </div>
      </div>

      {/* Pricing */}
      <div className="mb-4 mt-auto">
        <div className="bg-orange-50 rounded-lg p-3 border border-orange-100 overflow-hidden">
          <div className="flex items-center justify-between">
            <div className="flex-1 min-w-0">
              <div className="text-lg font-bold text-gray-900 truncate">
                ₹{astrologer.hourlyRate}
                <span className="text-sm font-normal text-gray-600">/hr</span>
              </div>
              <div className="text-xs text-gray-500 truncate">{astrologer.isOnline ? "Available now" : "Busy"}</div>
            </div>
            <div
              className="text-xs text-orange-600 font-medium ml-2 flex-shrink-0 max-w-20 truncate"
              title={astrologer.achievements?.[0]?.title || "Certified"}
            >
              {astrologer.achievements?.[0]?.title || "Certified"}
            </div>
          </div>
        </div>
      </div>

      {/* Book Session Button */}
      <button
        onClick={handleBookSession}
        className="w-full py-2.5 bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700 text-white font-medium rounded-lg transition-all text-sm flex-shrink-0"
      >
        Book Session
      </button>
    </div>
  )
}
