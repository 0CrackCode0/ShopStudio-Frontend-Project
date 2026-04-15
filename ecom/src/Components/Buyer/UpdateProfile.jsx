import React, { useEffect, useState } from 'react'
import { ToastContainer, toast } from 'react-toastify';

import FormValidator from '../../Validators/FormValidator'

export default function UpdateProfile(props) {

  let [data, setData] = useState({
    name: "",
    username: "",
    email: "",
    phone: ""

  })
  let [errorMessage, setErrorMessage] = useState({
    name: "",
    username: "",
    email: "",
    phone: "",
  })
  let [show, setShow] = useState(false)

  function getInputData(e) {
    let {name, value} = e.target
    setErrorMessage({ ...errorMessage, [name]: FormValidator(e) })
    setData({ ...data, [name]: value })
  }

  async function postData(e) {
    e.preventDefault()
    let error = Object.values(errorMessage).find(x => x !== "")
    if (error)
      setShow(true)
    else {
      let response = await fetch(`${import.meta.env.VITE_APP_BACKEND_SERVER}/user`)
      response = await response.json()

      let item = response.find(x => x.id !== data.id && (x.username === data.username || x.email === data.email))
      if (item) {
        setShow(true)
        setErrorMessage({
          ...errorMessage,
          'username': item.username === data.username ? "Username is already in use" : "",
          'email': item.email === data.email ? "Email is already in use" : "",
        })
      }
      else {
        let response = await fetch(`${import.meta.env.VITE_APP_BACKEND_SERVER}/user/${data.id}`, {
          method: "PUT",
          headers: {
            "content-type": "application/json"
          },
          body: JSON.stringify({ ...data })
        })
        response = await response.json()
        toast("Record Updated...")
        props.setOption("home")

      }
    }
  }

  useEffect(() => {
    (async () => {
      let response = await fetch(`${import.meta.env.VITE_APP_BACKEND_SERVER}/user/${localStorage.getItem("userId")}`, {
        method: "GET",
        headers: {
          "content-type": "application/json"
        }
      })
      response = await response.json()
      setData({ ...data, ...response })
    })()
  }, [])

  return (
    <>
      <h5 className='bg-primary text-center text-light p-2'>Update Profile</h5>
      <form onSubmit={postData}>

        <div className="mb-3">
          <input type="text" name="name" value={data.name} onChange={getInputData} placeholder='Full Name' className={`form-control ${show && errorMessage.name ? 'border-danger' : 'border-dark'}`} />
          {show && errorMessage.name ? <p className='text-danger'>{errorMessage.name}</p> : null}
        </div>

        <div className="mb-3">
          <input type="text" name="username" value={data.username} onChange={getInputData} placeholder='Username' className={`form-control ${show && errorMessage.username ? 'border-danger' : 'border-dark'}`} />
          {show && errorMessage.username ? <p className='text-danger'>{errorMessage.username}</p> : null}
        </div>

        <div className="mb-3">
          <input type="text" name="email" value={data.email} onChange={getInputData} placeholder='Email Address' className={`form-control ${show && errorMessage.email ? 'border-danger' : 'border-dark'}`} />
          {show && errorMessage.email ? <p className='text-danger'>{errorMessage.email}</p> : null}
        </div>

        <div className="mb-3">
          <input type="number" name="phone" value={data.phone} onChange={getInputData} placeholder='Phone Number' className={`form-control ${show && errorMessage.phone ? 'border-danger' : 'border-dark'}`} />
          {show && errorMessage.phone ? <p className='text-danger'>{errorMessage.phone}</p> : null}
        </div>

        <div className="mb-3">
          <button type="submit" className='btn btn-primary w-100'>Save</button>
        </div>
      </form>
      <ToastContainer />
    </>
  )
}
