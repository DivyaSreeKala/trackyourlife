import React from 'react'
import TrackingMap from './TrackingMap'

const LazyComponent = () => {
  return (
    <div>
      <h1>Track Your Life</h1>
      <hr/>
      <TrackingMap/>
      {/*1. it could be better if i could add a typewriter effect in 'track your life' heading */}
      {/*2. how to do a heatmap to show the details of habits done in a year or few months time */}
       
    </div>
  )
}

export default LazyComponent
