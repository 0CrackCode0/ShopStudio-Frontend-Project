import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import $ from 'jquery'
import 'datatables.net-dt/css/dataTables.dataTables.min.css'
import 'datatables.net'

import Breadcrum from '../../../Components/Breadcrum'
import AdminSidebar from '../../../Components/AdminSidebar'

import { deleteNewsletter, getNewsletter, updateNewsletter } from "../../../Redux/ActionCreators/NewsletterActionCreators"

export default function AdminNewsletter() {
    let [data, setData] = useState([])
    let [flag, setFlag] = useState(false)
    let NewsletterStateData = useSelector(state => state.NewsletterStateData)
    let dispatch = useDispatch()

    function updateRecord(id) {
        if (window.confirm("Confirm to Change the record Status ?")) {
            let item = NewsletterStateData.find(x => x.id === id)
            let index = NewsletterStateData.findIndex(x => x.id === id)
            item.status = !item.status
            dispatch(updateNewsletter({ ...item }))
            data[index] = { ...item }
            setFlag(!flag)
        }
    }

    function deleteRecord(id) {
        if (window.confirm("Confirm to Delete record ?")) {
            dispatch(deleteNewsletter({ id: id }))
            getAPIData()
        }
    }

    function getAPIData() {
        dispatch(getNewsletter())
        if (NewsletterStateData.length) {
            setData(NewsletterStateData)
        }
        let time = setTimeout(() => {
            $('#DataTable').DataTable()
        }, 500)
        return time
    }
    useEffect(() => {
        let time = getAPIData()
        return () => clearTimeout(time)
    }, [NewsletterStateData.length])
    return (
        <>
            <Breadcrum title='Admin' />
            <div className="container-fluid my-3">
                <div className="row">
                    <div className="col-md-3"><AdminSidebar />
                    </div>
                    <div className="col-md-9">
                        <h5 className='border p-2 text-center'>Newsletter</h5>
                        <div className='table-responsive'>
                            <table id='DataTable' className='table table-bordered table-striped'>
                                <thead>
                                    <tr>
                                        <th>ID</th>
                                        <th>Email</th>
                                        <th>Status</th>
                                        <th></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        data.map(item => {
                                            return <tr key={item.id}>
                                                <td>{item.id}</td>
                                                <td>{item.email}</td>
                                                <td title="Update Status" style={{ cursor: "pointer" }} onClick={() => updateRecord(item.id)}>{item.status ? "Active" : "Inactive"}</td>
                                                <td>{localStorage.getItem("role") === "Super Admin" ? <button className='btn btn-danger' onClick={() => deleteRecord(item.id)}><i className='fa fa-trash'></i></button> : null}</td>                                            </tr>
                                        })
                                    }
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}