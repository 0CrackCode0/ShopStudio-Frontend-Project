import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

import $ from 'jquery'
import 'datatables.net-dt/css/dataTables.dataTables.min.css'
import 'datatables.net'

import Breadcrum from '../../../Components/Breadcrum'
import AdminSidebar from '../../../Components/AdminSidebar'

import { deleteFeature, getFeature } from "../../../Redux/ActionCreators/FeatureActionCreators"

export default function AdminFeature() {
    let FeatureStateData = useSelector(state => state.FeatureStateData)
    let dispatch = useDispatch()

    function deleteRecord(id) {
        if (window.confirm("Confirm to Delete record ?")) {
            dispatch(deleteFeature({ id: id }))
            getAPIData()
        }
    }

    function getAPIData() {
        dispatch(getFeature())
        let time = setTimeout(() => {
            $('#DataTable').DataTable()
        }, 500)
        return time
    }
    useEffect(() => {
        let time = getAPIData()
        return () => clearTimeout(time)
    }, [FeatureStateData.length])
    return (
        <>
            <Breadcrum title='Admin' />
            <div className="container-fluid my-3">
                <div className="row">
                    <div className="col-md-3"><AdminSidebar />
                    </div>
                    <div className="col-md-9">
                        <h5 className='border p-2 text-center'>Feature<Link to="/admin/feature/create"><i className="fa fa-plus float-end"></i></Link></h5>
                        <div className="table-responsive">
                            <table id='DataTable' className='table table-bordered table-striped'>
                                <thead>
                                    <tr>
                                        <th>ID</th>
                                        <th>Name</th>
                                        <th>Icon</th>
                                        <th>Short Description</th>
                                        <th>Status</th>
                                        <th></th>
                                        <th></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        FeatureStateData.map(item => {
                                            return <tr key={item.id}>
                                                <td>{item.id}</td>
                                                <td>{item.name}</td>
                                                <td><span className='fs-1 text-primary' dangerouslySetInnerHTML={{ __html: item.icon || "" }} /></td>
                                                <td>{item.shortDescription}</td>
                                                <td>{item.status ? "Active" : "Inactive"}</td>
                                                <td><Link className='btn btn-primary' to={`/admin/feature/update/${item.id}`}><i className='fa fa-edit'></i></Link></td>
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