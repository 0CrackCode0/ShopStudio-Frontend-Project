import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import Breadcrum from '../Components/Breadcrum'

import { getSetting } from "../Redux/ActionCreators/SettingActionCreators"
import { createContactUs } from "../Redux/ActionCreators/ContactUsActionCreators"
import FormValidator from '../Validators/FormValidator'

export default function ContactusPage() {
    let [data, setData] = useState({
        name: "",
        email: "",
        phone: "",
        subject: "",
        message: "",
    })
    let [errorMessage, setErrorMessage] = useState({
        name: "Name Field is Required",
        email: "Email Address Field is Required",
        phone: "Phone Field is Required",
        subject: "Subject Field is Required",
        message: "Message Field is Required",
    })
    let [show, setShow] = useState(false)
    let [message, setMessage] = useState("")

    function getInputData(e) {
        let { name, value } = e.target
        setData({ ...data, [name]: value })
        setErrorMessage({ ...errorMessage, [name]: FormValidator(e) })
        setMessage("")
    }

    function postData(e) {
        e.preventDefault()
        let error = Object.values(errorMessage).find(x => x !== "")
        if (error)
            setShow(true)
        else {
            dispatch(createContactUs({ ...data, 'date': new Date(), 'status': true }))
            setMessage("We've Received Your Query, Team Will NEVER Get Back You .. :)")
            setData({
                name: "",
                email: "",
                phone: "",
                subject: "",
                message: "",
            })
            setErrorMessage({
                name: "Name Field is Required",
                email: "Email Address Field is Required",
                phone: "Phone Field is Required",
                subject: "Subject Field is Required",
                message: "Message Field is Required",
            })
            setShow(false)
        }
    }

    let [setting, setSetting] = useState({
        siteName: import.meta.env.VITE_APP_SITE_NAME,
        map1: import.meta.env.VITE_APP_SITE_MAP1,
        map2: import.meta.env.VITE_APP_SITE_MAP2,
        address: import.meta.env.VITE_APP_SITE_ADDRESS,
        email: import.meta.env.VITE_APP_SITE_EMAIL,
        phone: import.meta.env.VITE_APP_SITE_PHONE,
        whatsapp: import.meta.env.VITE_APP_SITE_WHATSAPP,
        x: import.meta.env.VITE_APP_SITE_X,
        facebook: import.meta.env.VITE_APP_SITE_FACEBOOK,
        instagram: import.meta.env.VITE_APP_SITE_INSTAGRAM,
        youtube: import.meta.env.VITE_APP_SITE_YOUTUBE,
        linkdin: import.meta.env.VITE_APP_SITE_LINKEDIN,
    })

    let SettingStateData = useSelector(state => state.SettingStateData || [])
    let dispatch = useDispatch()

    useEffect(() => {
        dispatch(getSetting())

        if (SettingStateData.length) {
            setSetting({
                siteName: SettingStateData[0].siteName || setting.siteName,
                map1: SettingStateData[0].map1 || setting.map1,
                map2: SettingStateData[0].map2 || setting.map2,
                address: SettingStateData[0].address || setting.address,
                email: SettingStateData[0].email || setting.email,
                phone: SettingStateData[0].phone || setting.phone,
                whatsapp: SettingStateData[0].whatsapp || setting.whatsapp,
                instagram: SettingStateData[0].instagram || setting.instagram,
                x: SettingStateData[0].x || setting.x,
                youtube: SettingStateData[0].youtube || setting.youtube,
                linkdin: SettingStateData[0].linkdin || setting.linkdin,
            })
        }
    }, [SettingStateData])

    return (
        <>
            <Breadcrum title="Contact Us" />
            <div className="container-fluid py-5">
                <div className="container py-5">
                    <div className="text-center">
                        <h1 className="mb-5">Have Any Query? <span className="text-uppercase text-primary bg-light px-2">Contact Us</span></h1>
                    </div>
                    <div className="row">
                        <div className="col-lg-5">
                            <div className="card border-dark p-3 mb-1">
                                <div className='d-flex'>
                                    <div><i className='bi bi-house fs-1'></i></div>
                                    <div className='ms-4'>
                                        <h5>Address</h5>
                                        <Link to={setting.map2} target='_blank' rel='noreferrer'>{setting.address}</Link>
                                    </div>
                                </div>
                            </div>
                            <div className="card border-dark p-3 mb-1">
                                <div className='d-flex'>
                                    <div><i className='bi bi-envelope fs-1'></i></div>
                                    <div className='ms-4'>
                                        <h5>Email</h5>
                                        <Link to={`mailto:${setting.email}`} target='_blank' rel='noreferrer'>{setting.email}</Link>
                                    </div>
                                </div>
                            </div>
                            <div className="card border-dark p-3 mb-1">
                                <div className='d-flex'>
                                    <div><i className='bi bi-phone fs-1'></i></div>
                                    <div className='ms-4'>
                                        <h5>Phone</h5>
                                        <Link to={`tell:${setting.phone}`} target='_blank' rel='noreferrer'>{setting.phone}</Link>
                                    </div>
                                </div>
                            </div>
                            <div className="card border-dark p-3 mb-1">
                                <div className='d-flex'>
                                    <div><i className='bi bi-whatsapp fs-1'></i></div>
                                    <div className='ms-4'>
                                        <h5>WhatsApp</h5>
                                        <Link to={`https://wa.me/${setting.whatsapp}`} target='_blank' rel='noreferrer'>{setting.address}</Link>
                                    </div>
                                </div>
                            </div>
                            <div className="d-flex m-2">
                                <Link className="btn btn-outline-primary btn-square border-2 me-2" to={setting.x} target='_blank' rel='noopener noreferrer'><i
                                    className="text-dark fab fa-twitter"></i></Link>
                                <Link className="btn btn-outline-primary btn-square border-2 me-2" to={setting.facebook} target='_blank' rel='noopener noreferrer'><i
                                    className="text-dark fab fa-facebook-f"></i></Link>
                                <Link className="btn btn-outline-primary btn-square border-2 me-2" to={setting.youtube} target='_blank' rel='noopener noreferrer'><i
                                    className="text-dark fab fa-youtube"></i></Link>
                                <Link className="btn btn-outline-primary btn-square border-2 me-2" to={setting.instagram} target='_blank' rel='noopener noreferrer'><i
                                    className="text-dark fab fa-instagram"></i></Link>
                                <Link className="btn btn-outline-primary btn-square border-2 me-2" to={setting.linkdin} target='_blank' rel='noopener noreferrer'><i
                                    className="text-dark fab fa-linkedin-in"></i></Link>
                            </div>
                        </div>
                        <div className="col-lg-7">
                            {message ? <p className='text-success text-center'>{message}</p> : null}
                            <div>
                                <form onSubmit={postData}>
                                    <div className="row g-3">
                                        <div className="col-12">
                                            <div className="form-floating">
                                                <input
                                                    type="text"
                                                    className={`form-control ${show && errorMessage.name ? 'border-danger' : 'border-dark'}`}
                                                    onChange={getInputData}
                                                    name="name"
                                                    value={data.name}
                                                    placeholder="Your Name"
                                                />
                                                <label>Your Name</label>
                                                {show && errorMessage.name && (
                                                    <p className='text-danger'>{errorMessage.name}</p>
                                                )}
                                            </div>
                                        </div>

                                        <div className="col-md-6">
                                            <div className="form-floating">
                                                <input
                                                    type="email"
                                                    className={`form-control ${show && errorMessage.email ? 'border-danger' : 'border-dark'}`}
                                                    onChange={getInputData}
                                                    name="email"
                                                    value={data.email}
                                                />
                                                <label>Your Email</label>
                                                {show && errorMessage.email && (
                                                    <p className='text-danger'>{errorMessage.email}</p>
                                                )}
                                            </div>
                                        </div>

                                        <div className="col-md-6">
                                            <div className="form-floating">
                                                <input
                                                    type="text"
                                                    className={`form-control ${show && errorMessage.phone ? 'border-danger' : 'border-dark'}`}
                                                    onChange={getInputData}
                                                    name="phone"
                                                    value={data.phone}
                                                    placeholder="Phone No."
                                                />
                                                <label>Your Phone No.</label>
                                                {show && errorMessage.phone && (
                                                    <p className='text-danger'>{errorMessage.phone}</p>
                                                )}
                                            </div>
                                        </div>

                                        <div className="col-12">
                                            <div className="form-floating">
                                                <input
                                                    type="text"
                                                    className={`form-control ${show && errorMessage.subject ? 'border-danger' : 'border-dark'}`}
                                                    onChange={getInputData}
                                                    name="subject"
                                                    value={data.subject}
                                                    placeholder="Subject"
                                                />
                                                <label>Subject</label>
                                                {show && errorMessage.subject && (
                                                    <p className='text-danger'>{errorMessage.subject}</p>
                                                )}
                                            </div>
                                        </div>

                                        <div className="col-12">
                                            <div className="form-floating">
                                                <textarea
                                                    className={`form-control ${show && errorMessage.message ? 'border-danger' : 'border-dark'}`}
                                                    onChange={getInputData}
                                                    value={data.message}
                                                    name="message"
                                                    style={{ height: "150px" }}
                                                />
                                                <label>Message</label>
                                                {show && errorMessage.message && (
                                                    <p className='text-danger'>{errorMessage.message}</p>
                                                )}
                                            </div>
                                        </div>
                                        <div className="col-12">
                                            <button className="btn btn-primary w-100 py-3" type="submit">Send Message</button>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div >
                <div className='w-100'>
                    <iframe src={setting.map1} className='w-100' height={250} frameBorder="0"></iframe>
                </div>
            </div>
        </>
    )
}