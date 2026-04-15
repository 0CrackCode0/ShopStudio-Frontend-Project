import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Breadcrum from '../../../Components/Breadcrum'
import AdminSidebar from '../../../Components/AdminSidebar'
import { Link, useNavigate } from 'react-router-dom'
import FormValidator from '../../../Validators/FormValidator'

import { getFaq, createFaq } from "../../../Redux/ActionCreators/faqActionCreators"
export default function AdminCreateFaq() {
    let [data, setData] = useState({
        question: '',
        answer: '',
        status: true
    })
    let [errorMessage, setErrorMessage] = useState({
        question: "Question is required",
        answer: "Answer is required"
    })
    let [show, setShow] = useState(false)

    let FaqStateData = useSelector(state => state.FaqStateData)
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
            let item = FaqStateData.find(x => x.question.toLocaleLowerCase() === data.question.toLocaleLowerCase())
            if (item) {
                setShow(true)
                setErrorMessage(old => {
                    return {
                        ...old,
                        'question': 'Faq with this Question filed is already exist'
                    }
                })
            }
            else {
                dispatch(createFaq({ ...data }))
                navigate("/admin/Faq")
            }
        }
    }

    useEffect(() => {
        (() => {
            dispatch(getFaq())
        })()
    }, [FaqStateData.length])
    return (
        <>
            <Breadcrum title='Admin' />
            <div className="container-fluid my-3">
                <div className="row">
                    <div className="col-md-3"><AdminSidebar />
                    </div>
                    <div className="col-md-9">
                        <h5 className='border p-2 text-center'>Create Faq<Link to="/admin/Faq"><i className="fa fa-arrow-left float-end"></i></Link></h5>

                        <form onSubmit={postData}>
                            <div className="row">
                                <div className="col-12 mb-3">
                                    <label>Question*</label>
                                    <input type="text" name="question" onChange={getInputData} placeholder='Question Field' className={`${show && errorMessage.question ? 'border-danger' : ''} form-control`} />
                                    {show && errorMessage.question ? <p className='text-danger'>{errorMessage.question}</p> : null}
                                </div>

                                <div className="col-12 mb-3">
                                    <label>Answer*</label>
                                    <textarea name="answer" onChange={getInputData} placeholder="Answer Field" rows={3} className={`${show && errorMessage.answer ? 'border-danger' : ''} form-control`} />
                                    {show && errorMessage.answer ?<p className="text-danger">{errorMessage.answer}</p> : null}
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