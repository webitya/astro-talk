import clientPromise from "./mongodb"
import { ObjectId } from "mongodb"

// Database name
const DB_NAME = "talkastro"

// Get database instance
export async function getDb() {
  const client = await clientPromise
  return client.db(DB_NAME)
}

// Collections
export const COLLECTIONS = {
  USERS: "users",
  ASTROLOGERS: "astrologers",
  BOOKINGS: "bookings",
  CHATS: "chats",
  MESSAGES: "messages",
  TRANSACTIONS: "transactions",
  WALLETS: "wallets",
  REVIEWS: "reviews",
  CONTACT_SUBMISSIONS: "contact_submissions",
  ADMIN_LOGS: "admin_logs",
}

// Helper functions
export function createObjectId(id) {
  return new ObjectId(id)
}

export function isValidObjectId(id) {
  return ObjectId.isValid(id)
}

// User operations
export async function createUser(userData) {
  const db = await getDb()
  const result = await db.collection(COLLECTIONS.USERS).insertOne({
    ...userData,
    createdAt: new Date(),
    updatedAt: new Date(),
  })
  return result
}

export async function findUserByEmail(email) {
  const db = await getDb()
  return await db.collection(COLLECTIONS.USERS).findOne({ email })
}

export async function findUserById(id) {
  const db = await getDb()
  return await db.collection(COLLECTIONS.USERS).findOne({ _id: createObjectId(id) })
}

export async function updateUser(id, updateData) {
  const db = await getDb()
  return await db
    .collection(COLLECTIONS.USERS)
    .updateOne({ _id: createObjectId(id) }, { $set: { ...updateData, updatedAt: new Date() } })
}

// Astrologer operations
export async function getAllAstrologers(filters = {}) {
  const db = await getDb()
  const query = { role: "astrologer", approved: true }

  if (filters.specialty) {
    query.specialties = { $in: [filters.specialty] }
  }

  if (filters.minRating) {
    query.rating = { $gte: Number.parseFloat(filters.minRating) }
  }

  return await db.collection(COLLECTIONS.USERS).find(query).toArray()
}

export async function findAstrologerById(id) {
  const db = await getDb()
  return await db.collection(COLLECTIONS.USERS).findOne({
    _id: createObjectId(id),
    role: "astrologer",
  })
}

// Booking operations
export async function createBooking(bookingData) {
  const db = await getDb()
  const result = await db.collection(COLLECTIONS.BOOKINGS).insertOne({
    ...bookingData,
    createdAt: new Date(),
    updatedAt: new Date(),
  })
  return result
}

export async function getUserBookings(userId) {
  const db = await getDb()
  return await db.collection(COLLECTIONS.BOOKINGS).find({ userId }).sort({ createdAt: -1 }).toArray()
}

export async function getAstrologerBookings(astrologerId) {
  const db = await getDb()
  return await db.collection(COLLECTIONS.BOOKINGS).find({ astrologerId }).sort({ createdAt: -1 }).toArray()
}

// Wallet operations
export async function getUserWallet(userId) {
  const db = await getDb()
  let wallet = await db.collection(COLLECTIONS.WALLETS).findOne({ userId })

  if (!wallet) {
    // Create wallet if it doesn't exist
    wallet = {
      userId,
      balance: 0,
      transactions: [],
      createdAt: new Date(),
      updatedAt: new Date(),
    }
    await db.collection(COLLECTIONS.WALLETS).insertOne(wallet)
  }

  return wallet
}

export async function updateWalletBalance(userId, amount, type, description) {
  const db = await getDb()
  const wallet = await getUserWallet(userId)

  const transaction = {
    id: new ObjectId().toString(),
    type,
    amount: Number.parseFloat(amount),
    description: description || (type === "credit" ? "Wallet recharge" : "Session payment"),
    timestamp: new Date(),
  }

  let newBalance = wallet.balance
  if (type === "credit") {
    newBalance += transaction.amount
  } else if (type === "debit") {
    if (wallet.balance < transaction.amount) {
      throw new Error("Insufficient balance")
    }
    newBalance -= transaction.amount
  }

  await db.collection(COLLECTIONS.WALLETS).updateOne(
    { userId },
    {
      $set: { balance: newBalance, updatedAt: new Date() },
      $push: { transactions: transaction },
    },
  )

  return { ...wallet, balance: newBalance, transactions: [...wallet.transactions, transaction] }
}

// Chat operations
export async function getUserChats(userId) {
  const db = await getDb()
  return await db.collection(COLLECTIONS.CHATS).find({ userId }).sort({ lastMessageTime: -1 }).toArray()
}

export async function createChat(chatData) {
  const db = await getDb()
  const result = await db.collection(COLLECTIONS.CHATS).insertOne({
    ...chatData,
    createdAt: new Date(),
    updatedAt: new Date(),
  })
  return result
}

// Contact form operations
export async function createContactSubmission(submissionData) {
  const db = await getDb()
  const result = await db.collection(COLLECTIONS.CONTACT_SUBMISSIONS).insertOne({
    ...submissionData,
    status: "new",
    createdAt: new Date(),
    updatedAt: new Date(),
  })
  return result
}

// Admin operations
export async function getAdminStats() {
  const db = await getDb()

  const [totalUsers, totalAstrologers, totalBookings, totalTransactions] = await Promise.all([
    db.collection(COLLECTIONS.USERS).countDocuments({ role: "user" }),
    db.collection(COLLECTIONS.USERS).countDocuments({ role: "astrologer" }),
    db.collection(COLLECTIONS.BOOKINGS).countDocuments(),
    db
      .collection(COLLECTIONS.WALLETS)
      .aggregate([
        { $unwind: "$transactions" },
        { $match: { "transactions.type": "debit" } },
        { $group: { _id: null, total: { $sum: "$transactions.amount" } } },
      ])
      .toArray(),
  ])

  return {
    totalUsers,
    totalAstrologers,
    totalBookings,
    totalRevenue: totalTransactions[0]?.total || 0,
    activeChats: 0, // Will be calculated from real-time data
    pendingApprovals: await db.collection(COLLECTIONS.USERS).countDocuments({
      role: "astrologer",
      approved: false,
    }),
  }
}

export async function getRecentActivity() {
  const db = await getDb()

  // Get recent user registrations
  const recentUsers = await db
    .collection(COLLECTIONS.USERS)
    .find({ role: "user" })
    .sort({ createdAt: -1 })
    .limit(5)
    .toArray()

  // Get recent astrologer applications
  const recentAstrologers = await db
    .collection(COLLECTIONS.USERS)
    .find({ role: "astrologer" })
    .sort({ createdAt: -1 })
    .limit(5)
    .toArray()

  // Get recent bookings
  const recentBookings = await db.collection(COLLECTIONS.BOOKINGS).find().sort({ createdAt: -1 }).limit(5).toArray()

  const activities = []

  // Add user activities
  recentUsers.forEach((user) => {
    activities.push({
      id: user._id.toString(),
      type: "user_signup",
      title: "New User Registration",
      description: `${user.name} joined the platform`,
      timestamp: user.createdAt,
    })
  })

  // Add astrologer activities
  recentAstrologers.forEach((astrologer) => {
    activities.push({
      id: astrologer._id.toString(),
      type: "astrologer_application",
      title: "Astrologer Application",
      description: `${astrologer.name} applied to become an astrologer`,
      timestamp: astrologer.createdAt,
    })
  })

  // Add booking activities
  recentBookings.forEach((booking) => {
    activities.push({
      id: booking._id.toString(),
      type: "booking_created",
      title: "New Booking",
      description: `Session booked for ${booking.service}`,
      timestamp: booking.createdAt,
    })
  })

  // Sort by timestamp and return latest 10
  return activities.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp)).slice(0, 10)
}
