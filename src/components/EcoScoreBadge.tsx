import React from 'react'
import '../styles/EcoScoreBadge.css'

interface EcoScoreBadgeProps {
  score: string
}

const EcoScoreBadge: React.FC<EcoScoreBadgeProps> = ({ score }) => {
  const getScoreColor = (score: string) => {
    switch (score) {
      case 'A+': return 'score-a-plus'
      case 'A': return 'score-a'
      case 'B+': return 'score-b-plus'
      case 'B': return 'score-b'
      case 'C+': return 'score-c-plus'
      case 'C': return 'score-c'
      default: return 'score-d'
    }
  }

  return (
    <div className={`eco-score-badge ${getScoreColor(score)}`}>
      <span className="score-text">{score}</span>
      <span className="eco-label">ECO</span>
    </div>
  )
}

export default EcoScoreBadge