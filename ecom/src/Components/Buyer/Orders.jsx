import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify'

import { getCheckout } from "../../Redux/ActionCreators/CheckoutActionCreators"
import { getTestimonial, createTestimonial, updateTestimonial } from "../../Redux/ActionCreators/TestimonialActionCreators"

export default function Orders() {

  const [orders, setOrders] = useState([])
  const [reviews, setReviews] = useState([])

  const CheckoutStateData = useSelector(state => state.CheckoutStateData)
  const TestimonialStateData = useSelector(state => state.TestimonialStateData)

  const dispatch = useDispatch()

  const [showModal, setShowModal] = useState(false)
  const [option, setOption] = useState("Create")

  const [data, setData] = useState({
    message: "",
    star: 5,
    product: ""
  })

  const userId = localStorage.getItem("userId")

  useEffect(() => {
    dispatch(getCheckout())
    dispatch(getTestimonial())
  }, [dispatch])


  useEffect(() => {
    if (CheckoutStateData?.length) {
      setOrders(
        CheckoutStateData.filter(
          x => x.user?.toString() === userId
        )
      )
    }
  }, [CheckoutStateData, userId])


  useEffect(() => {
    if (TestimonialStateData?.length) {
      setReviews(
        TestimonialStateData.filter(
          x => x.user?.toString() === userId
        )
      )
    }
  }, [TestimonialStateData, userId])

  function getInputData(e) {
    const { name, value } = e.target
    setData(prev => ({ ...prev, [name]: value }))
  }

  function postData(e) {
    e.preventDefault()

    if (option === "Create") {
      dispatch(createTestimonial({
        message: data.message,
        star: parseInt(data.star),
        product: data.product,
        user: userId,
        name: localStorage.getItem("name")
      }))
    } else {
      dispatch(updateTestimonial({
        id: data.id,
        message: data.message,
        star: parseInt(data.star),
        product: data.product,
        user: data.user,
        name: data.name
      }))
    }

    toast(`Review ${option === "Create" ? "Created" : "Updated"} Successfully`)
    setShowModal(false)
  }

  function create(pid) {
    setOption("Create")
    setData({
      message: "",
      star: 5,
      product: pid
    })
    setShowModal(true)
  }

  function update(id) {
    const item = reviews.find(x => x.id === id)
    if (!item) return

    setOption("Update")
    setData({
      id: item.id,
      message: item.message,
      star: item.star,
      product: item.product,
      user: item.user,
      name: item.name
    })
    setShowModal(true)
  }

  function check(pid) {
    const item = reviews.find(x => x.product === pid)
    return item ? item.id : false
  }

  return (
    <>
      <h5 className='bg-primary text-center p-2 text-light'>Your Orders</h5>

      {orders.length === 0 && (
        <p className='text-center mt-3'>No Orders Found</p>
      )}

      {orders.map((item) => (
        <div key={item.id} className='card p-3 mb-3'>
          <div className="row">

            <div className="col-lg-4">
              <table className='table table-bordered'>
                <tbody>
                  <tr><th>Order Id</th><td>{item.id}</td></tr>
                  <tr><th>Status</th><td>{item.orderStatus}</td></tr>
                  <tr><th>Payment</th><td>{item.paymentMode}</td></tr>
                  <tr><th>Payment Status</th><td>{item.paymentStatus}</td></tr>
                  <tr><th>Subtotal</th><td>₹{item.subtotal}</td></tr>
                  <tr><th>Shipping</th><td>₹{item.shipping}</td></tr>
                  <tr><th>Total</th><td>₹{item.total}</td></tr>
                  <tr><th>Date</th><td>{new Date(item.date).toLocaleDateString()}</td></tr>
                </tbody>
              </table>
            </div>

            <div className="col-lg-8">
              <h5 className='bg-primary p-2 text-center text-light'>Products</h5>

              <table className='table table-bordered'>
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Pic</th>
                    <th>Price</th>
                    <th>Qty</th>
                    <th>Total</th>
                    <th></th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {item.products?.map((x, i) => (
                    <tr key={i}>
                      <td>{x.name}</td>
                      <td>
                        <Link to={`${import.meta.env.VITE_APP_IMAGE_SERVER}/${x.pic}`} target='_blank'>
                          <img
                            src={`${import.meta.env.VITE_APP_IMAGE_SERVER}/${x.pic}`}
                            height={60}
                            width={60}
                            alt=""
                          />
                        </Link>
                      </td>
                      <td>₹{x.price}</td>
                      <td>{x.qty}</td>
                      <td>₹{x.total}</td>

                      <td>
                        <Link to={`/product/${x.product}`} className='btn btn-primary'>
                          Buy Again
                        </Link>
                      </td>

                      <td>
                        {item.orderStatus === "Delivered" && (
                          check(x.product)
                            ? <button className='btn btn-dark' onClick={() => update(check(x.product))}>Update</button>
                            : <button className='btn btn-dark' onClick={() => create(x.product)}>Review</button>
                        )}
                      </td>

                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

          </div>
        </div>
      ))}

      <ToastContainer />

      <div className={`modal ${showModal ? 'd-block' : 'd-none'}`}>
        <div className="modal-dialog">
          <div className="modal-content">

            <div className="modal-header">
              <h5 className="modal-title">{option} Review</h5>
              <button className="btn-close" onClick={() => setShowModal(false)}></button>
            </div>

            <div className="modal-body">
              <form onSubmit={postData}>
                <textarea
                  name="message"
                  value={data.message}
                  onChange={getInputData}
                  className='form-control mb-2'
                  placeholder='Write review...'
                />

                <select
                  name="star"
                  value={data.star}
                  onChange={getInputData}
                  className='form-select mb-2'
                >
                  {[5, 4, 3, 2, 1].map(n => (
                    <option key={n}>{n}</option>
                  ))}
                </select>

                <button className='btn btn-primary w-100'>
                  {option}
                </button>
              </form>
            </div>

          </div>
        </div>
      </div>
    </>
  )
}