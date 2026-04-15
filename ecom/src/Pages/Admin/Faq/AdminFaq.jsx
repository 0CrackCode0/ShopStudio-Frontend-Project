import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

import $ from 'jquery'
import 'datatables.net-dt/css/dataTables.dataTables.min.css'
import 'datatables.net'

import Breadcrum from '../../../Components/Breadcrum'
import AdminSidebar from '../../../Components/AdminSidebar'

import { deleteFaq, getFaq } from "../../../Redux/ActionCreators/faqActionCreators"

export default function AdminFaq() {
    let FaqStateData = useSelector(state => state.FaqStateData)
    let dispatch = useDispatch()

    function deleteRecord(id) {
        if (window.confirm("Confirm to Delete record ?")) {
            dispatch(deleteFaq({ id: id }))
            getAPIData()
        }
    }

    function getAPIData() {
        dispatch(getFaq())
        let time = setTimeout(() => {
            $('#DataTable').DataTable()
        }, 500)
        return time
    }
    useEffect(() => {
        let time = getAPIData()
        return () => clearTimeout(time)
    }, [FaqStateData.length])
    return (
        <>
            <Breadcrum title='Admin' />
            <div className="container-fluid my-3">
                <div className="row">
                    <div className="col-md-3"><AdminSidebar />
                    </div>
                    <div className="col-md-9">
                        <h5 className='border p-2 text-center'>Faq<Link to="/admin/faq/create"><i className="fa fa-plus float-end"></i></Link></h5>
                        <div className="table-responsive">
                            <table id='DataTable' className='table table-bordered table-striped'>
                                <thead>
                                    <tr>
                                        <th>ID</th>
                                        <th>Question</th>
                                        <th>Answer</th>
                                        <th>Status</th>
                                        <th></th>
                                        <th></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        FaqStateData.map(item => {
                                            return <tr key={item.id}>
                                                <td>{item.id}</td>
                                                <td>{item.question}</td>
                                                <td>{item.answer}</td>
                                                <td>{item.status ? "Active" : "Inactive"}</td>
                                                <td><Link className='btn btn-primary' to={`/admin/faq/update/${item.id}`}><i className='fa fa-edit'></i></Link></td>
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