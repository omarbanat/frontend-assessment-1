import React from 'react'
import DashHeader from './DashHeader'
import DashNav from './DashNav'
import DashMain from './DashMain'
// css
import '../css/dashboard.css'
const Dashboard= () => {
  return (
    <div>
      <div className='main-header'>
      <DashHeader/>
      </div>
      <DashNav/>
      <div className='main-content'>
      <DashMain/>
      </div>
    </div>
  )
}

export default Dashboard