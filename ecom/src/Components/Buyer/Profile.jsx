import React, { useEffect, useState } from 'react'

export default function Profile() {
  let [data, setData] = useState({})

  useEffect(() => {
    (async () => {
      let response = await fetch(`${import.meta.env.VITE_APP_BACKEND_SERVER}/user/${localStorage.getItem("userId")}`, {
        method: "GET",
        headers: {
          "content-type": "application/json"
        }
      })
      response = await response.json()
      setData(response)
    })()
  }, [])

  return (
    <>
        <h5 className='bg-primary text-center text-light p-2'>Profile Details</h5>
      <table className='table table-bordered'>
        <tbody>
          <tr>
            <th>Name</th>
            <th>{data.name}</th>
          </tr>
          <tr>
            <th>Username</th>
            <th>{data.username}</th>
          </tr>
          <tr>
            <th>Email</th>
            <th>{data.email}</th>
          </tr>
          <tr>
            <th>Phone</th>
            <th>{data.phone}</th>
          </tr>
        </tbody>
      </table>
    </>
  )
}
