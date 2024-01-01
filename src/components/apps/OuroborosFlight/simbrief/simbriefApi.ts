import React, { useEffect, useState } from 'react'
// this entire component uses a bootleg persistant storage method, this will be replaced with proper hooks when implemented into the sim
export const SimBriefApi = () => {
  const [simbriefId, setSimbriefId] = useState(() => {
    // getting stored value
    const id: any = localStorage.getItem('simbriefId')
    const initialValue = JSON.parse(id)
    return initialValue || console.log('no id found')
  })
  const [simbriefData, setSimbriefData] = useState(() => {
    const data: any = localStorage.getItem('simbriefData')
    const initialValue = JSON.parse(data)
    return initialValue || ''
  })

  fetch(`https://www.simbrief.com/api/xml.fetcher.php?userid=${simbriefId}&json=1`)
    .then((response) => response.json())
    .then((data) => {
      setSimbriefData(data)
    })
  return localStorage.setItem('simbriefData', JSON.stringify(simbriefData))
  //  https://www.simbrief.com/api/xml.fetcher.php?userid=555605&json=1  api call
}
