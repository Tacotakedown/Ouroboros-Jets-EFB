import React from 'react'
import { GroundServiceIcon } from './GroundSericeIcon'
import './GroundService.scss'

export const GroundService = () => {
  return (
    <div className="ground-service-container">
      <div className="ground-service-header">Ground Services</div>
      <div className="ground-service-content">
        <GroundServiceIcon width={1000} color="transparent" stroke="blue" strokeWidth={10} />
      </div>
    </div>
  )
}
