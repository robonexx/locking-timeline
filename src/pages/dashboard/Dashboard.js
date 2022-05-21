import React from 'react'
import TimelineList from '../../components/timelinelist/TimelineList'

import { useCollection } from '../../hooks/useCollection'

// styles 
import './Dashboard.css'
export default function Dashboard() {
  const { documents, error } = useCollection('timeline')
  
  console.log(documents)
  return (
    <div>
      <h2 className='page-title'>Overview</h2>
      {error && <p className='error'>{error}</p>}

      {documents && <TimelineList timeline={documents}/>}
    </div>
  )
}
