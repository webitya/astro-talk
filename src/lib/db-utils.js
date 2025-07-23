// src/lib/db-utils.js
// Mock database utilities for development
// In production, these would connect to your actual database

// Always ensure the return type is an array when map() is expected
function ensureArray(data) {
  return Array.isArray(data) ? data : [];
}

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
  ];

  return ensureArray(recentActivity);
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
  };
}

export async function getDashboardData(userId) {
  // Mock dashboard data
  const dashboardData = {
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
  };

  // Convert properties to arrays if they are expected to be mapped
  dashboardData.recentBookings = ensureArray(dashboardData.recentBookings);
  dashboardData.chatHistory = ensureArray(dashboardData.chatHistory);

  return dashboardData;
}

// Placeholder exports to avoid "not exported" errors during build
export async function getAllAstrologers() { return []; }
export async function getUserBookings() { return []; }
export async function getAstrologerBookings() { return []; }
export async function createBooking() { return { success: true }; }
export async function getUserChats() { return []; }
export async function createChat() { return { success: true }; }
export async function createContactSubmission() { return { success: true }; }
export async function getUserWallet() { return { balance: 0 }; }
export async function updateWalletBalance() { return { success: true }; }
export async function findUserByEmail() { return null; }
export async function createUser() { return { success: true }; }
