import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import 'datatables.net'

import Breadcrum from '../../../Components/Breadcrum'
import AdminSidebar from '../../../Components/AdminSidebar'

import { createSetting, getSetting, updateSetting } from "../../../Redux/ActionCreators/SettingActionCreators"

export default function AdminSetting() {
    let [data, setData] = useState({
        map1: "",
        map2: "",
        address: "",
        email: "",
        phone: "",
        whatsapp: "",
        siteName: "",
        facebook: "",
        linkdin: "",
        instagram: "",
        x: "",
        pinterest: "",
        youtube: "",
    })
    let SettingStateData = useSelector(state => state.SettingStateData)
    let dispatch = useDispatch()

    function getInputData(e) {
        let { name, value } = e.target
        setData({ ...data, [name]: value })
    }

    function postData(e) {
        e.preventDefault()
        if (SettingStateData.length) {
            dispatch(updateSetting({ ...data }))
            alert("Record Has Been Updated")
        }
        else {
            dispatch(createSetting({ ...data }))
            alert("Record Has Been Created")
        }
    }

    function getAPIData() {
        dispatch(getSetting())
        if (SettingStateData.length) {
            setData({ ...data, ...SettingStateData[0] })
        }
    }
    useEffect(() => {
        getAPIData()
    }, [SettingStateData.length])
    return (
        <>
            <Breadcrum title='Admin' />
            <div className="container-fluid my-3">
                <div className="row">
                    <div className="col-md-3"><AdminSidebar />
                    </div>
                    <div className="col-md-9">
                        <h5 className='border p-2 text-center'>Setting</h5>
                        <form onSubmit={postData}>
                            <div className="row">

                                <div className="col-12 mb-3">
                                    <label>Google Map1</label>
                                    <input type="text" name="map1" value={data.map1} onChange={getInputData} placeholder='Google Map1' className='form-control' />
                                </div>

                                <div className="col-12 mb-3">
                                    <label>Google Map2</label>
                                    <input type="text" name="map2" value={data.map2} onChange={getInputData} placeholder='Google Map2' className='form-control' />
                                </div>

                                <div className="col-12 mb-3">
                                    <label>Address</label>
                                    <input type="text" name="address" value={data.address} onChange={getInputData} placeholder='Address' className='form-control' />
                                </div>

                                <div className="col-md-6 mb-3">
                                    <label>Site Name</label>
                                    <input type="text" name="siteName" value={data.siteName} onChange={getInputData} placeholder='Website Name' className='form-control' />
                                </div>

                                <div className="col-md-6 mb-3">
                                    <label>Email</label>
                                    <input type="email" name="email" value={data.email} onChange={getInputData} placeholder='Email Address' className='form-control' />
                                </div>

                                <div className="col-md-6 mb-3">
                                    <label>Phone</label>
                                    <input type="number" name="phone" value={data.phone} onChange={getInputData} placeholder='Contact No.' className='form-control' pattern="[0-9]*" />
                                </div>

                                <div className="col-md-6 mb-3">
                                    <label>WhatsApp</label>
                                    <input type="number" name="whatsapp" value={data.whatsapp} onChange={getInputData} placeholder='Whatsapp No.' className='form-control' pattern="[0-9]*" />
                                </div>

                                <div className="col-md-6 mb-3">
                                    <label>Facebook</label>
                                    <input type="text" name="facebook" value={data.facebook} onChange={getInputData} placeholder='Facebook Profile' className='form-control' />
                                </div>

                                <div className="col-md-6 mb-3">
                                    <label>Instagram</label>
                                    <input type="text" name="instagram" value={data.instagram} onChange={getInputData} placeholder='Instagram Profile' className='form-control' />
                                </div>

                                <div className="col-md-6 mb-3">
                                    <label>X</label>
                                    <input type="text" name="x" value={data.x} onChange={getInputData} placeholder='X Profile' className='form-control' />
                                </div>

                                <div className="col-md-6 mb-3">
                                    <label>LinkdIn</label>
                                    <input type="text" name="linkdin" value={data.linkdin} onChange={getInputData} placeholder='Linkdin Profile' className='form-control' />
                                </div>

                                <div className="col-md-6 mb-3">
                                    <label>Pinterest</label>
                                    <input type="text" name="pinterest" value={data.pinterest} onChange={getInputData} placeholder='Pinterest Profile' className='form-control' />
                                </div>

                                <div className="col-12 mb-3">
                                    <button type="submit" className='btn btn-primary w-100'>Submit</button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}