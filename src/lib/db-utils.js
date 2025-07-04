// Mock database utilities for development
// In production, these would connect to your actual database

export async function getRecentActivity() {
  // Mock recent activity data
  const recentActivity = [
    {
      id: "1",
      type: "user_signup",
      title: "New User Registration",
      description: "Priya Sharma joined the platform",
      timestamp: new Date(Date.now() - 5 * 60 * 1000).toISOString(), // 5 minutes ago
    },
    {
      id: "2",
      type: "astrologer_application",
      title: "Astrologer Application",
      description: "Dr. Rajesh Kumar applied to become an astrologer",
      timestamp: new Date(Date.now() - 15 * 60 * 1000).toISOString(), // 15 minutes ago
    },
    {
      id: "3",
      type: "booking_created",
      title: "New Booking",
      description: "Session booked with Acharya Sharma",
      timestamp: new Date(Date.now() - 30 * 60 * 1000).toISOString(), // 30 minutes ago
    },
    {
      id: "4",
      type: "payment_received",
      title: "Payment Received",
      description: "₹1200 payment for astrology session",
      timestamp: new Date(Date.now() - 45 * 60 * 1000).toISOString(), // 45 minutes ago
    },
    {
      id: "5",
      type: "user_signup",
      title: "New User Registration",
      description: "Amit Patel joined the platform",
      timestamp: new Date(Date.now() - 60 * 60 * 1000).toISOString(), // 1 hour ago
    },
  ]

  return recentActivity
}

export async function getAdminStats() {
  // Mock admin stats data
  return {
    totalUsers: 1250,
    totalAstrologers: 45,
    totalBookings: 890,
    totalRevenue: 125000,
    activeUsers: 320,
    pendingBookings: 12,
    completedSessions: 756,
    averageRating: 4.6,
  }
}

export async function getDashboardData(userId) {
  // Mock dashboard data
  return {
    walletBalance: 2500,
    totalBookings: 8,
    activeSessions: 2,
    totalSpent: 4500,
    recentBookings: [
      {
        id: "1",
        astrologerName: "Acharya Sharma",
        date: "2024-01-15",
        time: "10:00 AM",
        status: "confirmed",
        service: "Vedic Astrology",
      },
      {
        id: "2",
        astrologerName: "Dr. Priya Gupta",
        date: "2024-01-12",
        time: "2:30 PM",
        status: "completed",
        service: "Tarot Reading",
      },
    ],
    chatHistory: [
      {
        id: "1",
        astrologerName: "Acharya Sharma",
        lastMessage: "Thank you for the session",
        timestamp: "2024-01-15T10:30:00Z",
      },
      {
        id: "2",
        astrologerName: "Dr. Priya Gupta",
        lastMessage: "Your reading is complete",
        timestamp: "2024-01-12T15:00:00Z",
      },
    ],
  }
}

// Mock user operations
export async function findUserByEmail(email) {
  // Mock user data
  const mockUsers = [
    {
      _id: "user1",
      name: "John Doe",
      email: "john@example.com",
      password: "$2a$12$hashedpassword", // This would be a real hashed password
      role: "user",
      approved: true,
      createdAt: new Date(),
    },
    {
      _id: "admin1",
      name: "Admin User",
      email: "admin@talkastro.com",
      password: "$2a$12$hashedpassword",
      role: "admin",
      approved: true,
      createdAt: new Date(),
    },
  ]

  return mockUsers.find((user) => user.email === email) || null
}

export async function createUser(userData) {
  // Mock user creation
  const newUser = {
    _id: `user_${Date.now()}`,
    ...userData,
    createdAt: new Date(),
    updatedAt: new Date(),
  }

  return {
    insertedId: newUser._id,
    acknowledged: true,
  }
}

export async function findUserById(id) {
  // Mock find user by ID
  return {
    _id: id,
    name: "Mock User",
    email: "user@example.com",
    role: "user",
    approved: true,
  }
}

export async function updateUser(id, updateData) {
  // Mock user update
  return {
    matchedCount: 1,
    modifiedCount: 1,
    acknowledged: true,
  }
}

// Mock astrologer operations
export async function getAllAstrologers(filters = {}) {
  // This will return empty array since we're using mock data in the API route
  return []
}

export async function findAstrologerById(id) {
  return {
    _id: id,
    name: "Mock Astrologer",
    email: "astrologer@example.com",
    role: "astrologer",
    approved: true,
  }
}

// Mock booking operations
export async function createBooking(bookingData) {
  return {
    insertedId: `booking_${Date.now()}`,
    acknowledged: true,
  }
}

export async function getUserBookings(userId) {
  return []
}

export async function getAstrologerBookings(astrologerId) {
  return []
}

// Mock wallet operations
export async function getUserWallet(userId) {
  return {
    userId,
    balance: 1000,
    transactions: [],
    createdAt: new Date(),
    updatedAt: new Date(),
  }
}

export async function updateWalletBalance(userId, amount, type, description) {
  const wallet = await getUserWallet(userId)

  const transaction = {
    id: `txn_${Date.now()}`,
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

  return {
    ...wallet,
    balance: newBalance,
    transactions: [...wallet.transactions, transaction],
  }
}

// Mock chat operations
export async function getUserChats(userId) {
  return []
}

export async function createChat(chatData) {
  return {
    insertedId: `chat_${Date.now()}`,
    acknowledged: true,
  }
}

// Mock contact form operations
export async function createContactSubmission(submissionData) {
  return {
    insertedId: `contact_${Date.now()}`,
    acknowledged: true,
  }
}

// Helper functions
export function createObjectId(id) {
  return id
}

export function isValidObjectId(id) {
  return typeof id === "string" && id.length > 0
}

// Collections constant
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
