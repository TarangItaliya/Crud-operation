import React, { useState } from 'react'

const Edit = () => {
    const [data, setData] = useState([])


fetch('https://buzzy.codderlab.com/banner/all?key=dH2PxQSNvJN1KGJkTQYrzTPeSLShBRLJ', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      image: 'New Post',
      URL: 'Lorem ipsum dolor sit amet.'
    })
  })
    .then(response => response.json())
    .then(data => console.log(data))
    .catch(error => console.error(error))
  return (
    <div>Edit</div>

  )
}

export default Edit
