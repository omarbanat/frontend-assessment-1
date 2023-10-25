import React from 'react'
import '../css/dashnav.css'
const DashNav = () => {
  return (
    <div>
        <aside>
            <h1>Welcome</h1>
            <div className='dash-item'>
                <div className="dash-item-list">
                    memes
                </div>
                <div className="dash-item-list">add</div>
                <div className="dash-item-list">delete</div>
                <div className="dash-item-list">update</div>
                <div className="dash-item-list">sign out</div>
            </div>
        </aside>
    </div>
  )
}

export default DashNav