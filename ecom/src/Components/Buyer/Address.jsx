import React, { useEffect, useState } from 'react'
import FormValidator from '../../Validators/FormValidator'

import { toast, ToastContainer } from 'react-toastify'

export default function Address() {
  let [option, setOption] = useState()
  let [showModel, setShowModel] = useState()
  let errorOptions = {
    name: "Name is required",
    email: "Email Address is required",
    phone: "Phone Number is required",
    address: "Address is required",
    pin: "City PIN Code is required",
    city: "City Name is required",
    state: "State Name is required"
  }
  let dataOptions = {
    name: "",
    email: "",
    phone: "",
    address: "",
    pin: "",
    city: "",
    state: ""
  }
  let [data, setData] = useState(dataOptions)

  let [errorMessage, setErrorMessage] = useState(errorOptions)
  let [show, setShow] = useState(false)
  let [address, setAddress] = useState([])

  function getInputData(e) {
    let { name, value } = e.target
    setErrorMessage({ ...errorMessage, [name]: FormValidator(e) })
    setData({ ...data, [name]: value })
  }

  function setCreateRecord() {
    setOption("Create")
    setShowModel(true)
    setShow(false)
    setErrorMessage(errorOptions)
    setData(dataOptions)
  }

  function setUpdateRecord(id) {
    setOption("Update")
    setShowModel(true)
    setData({ ...address.find(x => x.id == id), 'id': id })
    setErrorMessage(dataOptions)
    setShow(false)
  }

  async function deleteRecord(id) {
    if (window.confirm("Sure to delete this address ?")) {
      let response = await fetch(`${import.meta.env.VITE_APP_BACKEND_SERVER}/address/${id}`, {
        method: "DELETE",
        headers: {
          "content-type": "application/json"
        }
      })
      response = await response.json()
      toast("Address Removed...")
      setAddress(address.filter(x => x.id !== id))
      setShow(false)
    }
  }

  async function postData(e) {
    e.preventDefault()
    let error = Object.values(errorMessage).find(x => x !== "")
    if (error)
      setShow(true)
    else {
      let url = option === "Create" ? `${import.meta.env.VITE_APP_BACKEND_SERVER}/address` : `${import.meta.env.VITE_APP_BACKEND_SERVER}/address/${data.id}`
      let response = await fetch(url, {
        method: option === "Create" ? "POST" : "PUT",
        headers: {
          "content-type": "application/json"
        },
        body: JSON.stringify({ ...data, user: localStorage.getItem("userId") })
      })
      response = await response.json()
      if (option === "Create")
        setAddress([...address, response])
      else {
        let index = address.findIndex(x => x.id === data.id)
        address[index] = { ...data }
        setAddress(address)
      }
      setData(dataOptions)
      setErrorMessage(errorOptions)
      setShow(false)
      setShowModel(false)
      toast(`Address ${option === "Create" ? "Created" : "Updated"}...`)
    }
  }

  useEffect(() => {
    (async () => {
      let response = await fetch(`${import.meta.env.VITE_APP_BACKEND_SERVER}/address`, {
        method: "GET",
        headers: {
          "content-type": "application/json"
        }
      })
      response = await response.json()
      setAddress(response.filter(x => x.user === localStorage.getItem("userId")))
    })()
  }, [])

  return (
    <>
      <div className="d-flex justify-content-between align-items-center w-100 bg-primary p-2">
        <h5 className="text-light m-0">Saved Address</h5>
        <button className='btn btn-light' onClick={setCreateRecord}><i className="bi bi-plus"></i> New</button>
      </div>
      {
        address.map((item, index) => {
          return <div className='card p-2 my-3' style={{ background: "#e6f4f1" }} key={index}>
            <div className="row">
              <div className="col-9">
                <div className="table-responsive">
                  <table className='table'>
                    <tbody>
                      <tr>
                        <th>Name</th>
                        <td>{item.name}</td>
                      </tr>
                      <tr>
                        <th>Email</th>
                        <td>{item.email}</td>
                      </tr>
                      <tr>
                        <th>Phone</th>
                        <td>{item.phone}</td>
                      </tr>
                      <tr>
                        <th>Address</th>
                        <td>{item.address}</td>
                      </tr>
                      <tr>
                        <th>City</th>
                        <td>{item.city}, {item.state} - {item.pin}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
              <div className="col-3">
                <div className="btn-group">
                  <button className='btn btn-primary m-1' onClick={() => setUpdateRecord(item.id)}><i className='bi bi-pencil'></i></button>
                  <button className='btn btn-danger m-1' onClick={() => deleteRecord(item.id)}><i className='bi bi-trash'></i></button>
                </div>
              </div>
            </div>
          </div>
        })
      }
      <ToastContainer />

      <div className={`modal fade ${showModel ? 'show d-block' : 'd-none'}`} id="exampleModal">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel">Modal title</h1>
              <button type="button" className="btn-close" onClick={() => setShowModel(false)}></button>
            </div>
            <div className="modal-body">
              <form onSubmit={postData}>
                <div className="mb-3">
                  <input type="text" name="name" value={data.name} onChange={getInputData} placeholder='Full Name' className={`form-control ${show && errorMessage.name ? 'border-danger' : 'border-dark'}`} />
                  {show && errorMessage.name ? <p className='text-danger form-text m-0' style={{ maxHeight: "10px" }}>{errorMessage.name}</p> : null}
                </div>

                <div className="row">
                  <div className="col-6 mb-3">
                    <input type="text" name="email" value={data.email} onChange={getInputData} placeholder='Email Address' className={`form-control ${show && errorMessage.email ? 'border-danger' : 'border-dark'}`} />
                    {show && errorMessage.email ? <p className='text-danger form-text m-0' style={{ maxHeight: "10px" }}>{errorMessage.email}</p> : null}
                  </div>

                  <div className="col-6 mb-3">
                    <input type="number" name="phone" value={data.phone} onChange={getInputData} placeholder='Phone Number' className={`form-control ${show && errorMessage.phone ? 'border-danger' : 'border-dark'}`} />
                    {show && errorMessage.phone ? <p className='text-danger form-text m-0' style={{ maxHeight: "10px" }}>{errorMessage.phone}</p> : null}
                  </div>

                  <div className="mb-3">
                    <textarea name="address" value={data.address} rows={3} onChange={getInputData} placeholder='Full Address' className={`form-control ${show && errorMessage.address ? 'border-danger' : 'border-dark'}`} ></textarea>
                    {show && errorMessage.address ? <p className='text-danger form-text m-0' style={{ maxHeight: "10px" }}>{errorMessage.address}</p> : null}
                  </div>

                  <div className="col-6 mb-3">
                    <input type="text" name="city" value={data.city} onChange={getInputData} placeholder='City Name' className={`form-control ${show && errorMessage.city ? 'border-danger' : 'border-dark'}`} />
                    {show && errorMessage.city ? <p className='text-danger form-text m-0' style={{ maxHeight: "10px" }}>{errorMessage.city}</p> : null}
                  </div>

                  <div className="col-6 mb-3">
                    <input type="text" name="state" value={data.state} onChange={getInputData} placeholder='State Name' className={`form-control ${show && errorMessage.state ? 'border-danger' : 'border-dark'}`} />
                    {show && errorMessage.state ? <p className='text-danger form-text m-0' style={{ maxHeight: "10px" }}>{errorMessage.state}</p> : null}
                  </div>

                  <div className="col-5 mb-3">
                    <input type="number" name="pin" value={data.pin} onChange={getInputData} placeholder='City PIN Code' className={`form-control ${show && errorMessage.pin ? 'border-danger' : 'border-dark'}`} />
                    {show && errorMessage.pin ? <p className='text-danger form-text m-0' style={{ maxHeight: "10px" }}>{errorMessage.pin}</p> : null}
                  </div>
                </div>

                <div className="modal-footer">
                  <button type="submit" className="btn btn-primary">{option}</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}