import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Breadcrum from '../../../Components/Breadcrum'
import AdminSidebar from '../../../Components/AdminSidebar'
import { Link, useNavigate } from 'react-router-dom'
import FormValidator from '../../../Validators/FormValidator'
import ImageValdator from '../../../Validators/ImageValidator'

import { getFeature, createFeature } from "../../../Redux/ActionCreators/featureActionCreators"
export default function AdminCreateFeature() {
    let [data, setData] = useState({
        name: '',
        icon: '',
        shortDescription: "",
        status: true
    })
    let [errorMessage, setErrorMessage] = useState({
        name: "Name is required",
        icon: "Icon is required",
        shortDescription: "Short Description is required"
    })
    let [show, setShow] = useState(false)

    let FeatureStateData = useSelector(state => state.FeatureStateData)
    let dispatch = useDispatch()
    let navigate = useNavigate()

    function getInputData(e) {
        let { name, value } = e.target

        setErrorMessage(old => {
            return {
                ...old,
                [name]: FormValidator(e)
            }
        })
        setData(old => {
            return {
                ...old,
                [name]: name === "status" ? (value === "1" ? true : false) : value
            }
        })
    }

    function postData(e) {
        e.preventDefault()
        let error = Object.values(errorMessage).find(x => x !== "")
        if (error)
            setShow(true)
        else {
            let item = FeatureStateData.find(x => x.name.toLocaleLowerCase() === data.name.toLocaleLowerCase())
            if (item) {
                setShow(true)
                setErrorMessage(old => {
                    return {
                        ...old,
                        'name': 'Feature with this Name filed is already exist'
                    }
                })
            }
            else {
                dispatch(createFeature({ ...data }))

                // let formData = new FormData()
                // formData.append("name", data.name)
                // formData.append("icon", data.icon)
                // formData.append("shortDescription", data.shortDescription)
                // formData.append("status", data.status)
                // dispatch(createFeature(formData))
                navigate("/admin/feature")
            }
        }
    }

    useEffect(() => {
        (() => {
            dispatch(getFeature())
        })()
    }, [FeatureStateData.length])
    return (
        <>
            <Breadcrum title='Admin' />
            <div className="container-fluid my-3">
                <div className="row">
                    <div className="col-md-3"><AdminSidebar />
                    </div>
                    <div className="col-md-9">
                        <h5 className='border p-2 text-center'>Create Feature<Link to="/admin/feature"><i className="fa fa-arrow-left float-end"></i></Link></h5>

                        <form onSubmit={postData}>
                            <div className="row">
                                <div className="col-12 mb-3">
                                    <label>Name*</label>
                                    <input type="text" name="name" onChange={getInputData} placeholder='Name' className={`${show && errorMessage.name ? 'border-danger' : ''} form-control`} />
                                    {show && errorMessage.name ? <p className='text-danger'>{errorMessage.name}</p> : null}
                                </div>

                                <div className="col-12 mb-3">
                                    <label>Short Description*</label>
                                    <textarea name="shortDescription" onChange={getInputData} placeholder="Short Description" rows={3} className={`${show && errorMessage.shortDescription ? 'border-danger' : ''} form-control`} /> {show && errorMessage.shortDescription ? (
                                        <p className="text-danger">{errorMessage.shortDescription}</p>) : null}
                                </div>

                                <div className="col-lg-6 mb-3">
                                    <label>Icon*</label>
                                    <input type="text" name="icon" onChange={getInputData} placeholder='e.g. <i className="fab fa-tag"></i>' className={`${show && errorMessage.icon ? 'border-danger' : ''} form-control`} />
                                    {show && errorMessage.icon ? <p className='text-danger'>{errorMessage.icon}</p> : null}
                                </div>

                                <div className="col-lg-6 mb-3">
                                    <label>Status*</label>
                                    <select name="status" onChange={getInputData} className='form-select'>
                                        <option value="1">Active</option>
                                        <option value="0">Inactive</option>
                                    </select>
                                </div>
                                <div className="col-12 mb-3">
                                    <button type="submit" className="btn btn-primary w-100">Create</button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}