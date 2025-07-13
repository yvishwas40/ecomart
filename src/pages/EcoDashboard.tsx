import React, { useState, useEffect } from 'react'
import '../styles/EcoDashboard.css'
import { getUserEcoStats } from '../services/userService'
import '/vishwaa.jpg'

interface EcoStats {
  totalPoints: number
  productsViewed: number
  co2Saved: number
  averageScore: string
}

interface UserProfile {
  name: string
  email: string
  profilePic: string
  address: string
}

const EcoDashboard: React.FC = () => {
  const [ecoStats, setEcoStats] = useState<EcoStats>({
    totalPoints: 0,
    productsViewed: 0,
    co2Saved: 0,
    averageScore: 'B+'
  })

  const [userProfile, setUserProfile] = useState<UserProfile>({
    name: 'Vishwa',
    email: 'yishwas40@gmail.com',
    profilePic: '/vishwaa.jpg',
    address: 'Hyderabad, Telangana, India'
  })

  useEffect(() => {
    const loadEcoStats = async () => {
      const stats = await getUserEcoStats()
      if (stats) setEcoStats(stats)
    }

    loadEcoStats()
  }, [])

  return (
    <div className="dashboard-container">
      {/* Sidebar */}
      <aside className="profile-sidebar">
        <img src={userProfile.profilePic} alt="Profile" className="profile-pic" />
        <h2 className="profile-name">{userProfile.name}</h2>
        <p className="profile-email">{userProfile.email}</p>
        <p className="profile-address">📍 {userProfile.address}</p>
        <button className="edit-button">Edit Profile</button>
      </aside>

      {/* Main Dashboard */}
      <main className="dashboard-main">
        <header className="dashboard-header">
          <h1>Your Eco Dashboard 🌿</h1>
          <p>Track your sustainable journey and environmental contributions</p>
        </header>

        <section className="stats-section">
          {[
            {
              icon: '🌱',
              title: 'Eco Points',
              value: ecoStats.totalPoints,
              subtitle: 'Points from eco-friendly choices'
            },
            {
              icon: '👁️',
              title: 'Products Viewed',
              value: ecoStats.productsViewed,
              subtitle: 'Sustainable items explored'
            },
            {
              icon: '🌍',
              title: 'CO₂ Saved',
              value: `${ecoStats.co2Saved} kg`,
              subtitle: 'Reduced carbon footprint'
            },
            {
              icon: '⭐',
              title: 'Average Score',
              value: ecoStats.averageScore,
              subtitle: 'Your overall eco score'
            }
          ].map((stat, index) => (
            <div key={index} className="stat-card">
              <div className="stat-icon">{stat.icon}</div>
              <div>
                <h3>{stat.title}</h3>
                <div className="stat-value">{stat.value}</div>
                <p>{stat.subtitle}</p>
              </div>
            </div>
          ))}
        </section>

        <section className="activity-achievement-section">
          <div className="activity-section">
            <h2>Recent Activity</h2>
            <div className="activity-list">
              <div className="activity-item">🌱 Earned 15 points - Viewed Organic T-Shirt</div>
              <div className="activity-item">♻️ Earned 12 points - Viewed Bamboo Kitchen Set</div>
              <div className="activity-item">🌿 Earned 10 points - Viewed Biodegradable Plates</div>
            </div>
          </div>

          <div className="achievement-section">
            <h2>Eco Achievements</h2>
            <div className="achievement-grid">
              <div className="achievement-card">🏆 Eco Explorer - 20+ products viewed</div>
              <div className="achievement-card">🌱 Green Starter - 100 eco points</div>
              <div className="achievement-card">🌍 Planet Protector - 12.5/50kg CO₂</div>
              <div className="achievement-card">⭐ Eco Master - A+ score for 30 days</div>
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}

export default EcoDashboard
