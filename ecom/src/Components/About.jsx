import React from 'react'

export default function About() {
    return (
        <>
            <div className="container-fluid py-5">
                <div className="container">
                    <div className="row g-5">
                        <div className="col-lg-6">
                            <div className="row">
                                <div className="col-6 wow fadeIn" data-wow-delay="0.1s">
                                    <img className="img-fluid" src="img/image9.png" alt="" />
                                </div>
                                <div className="col-6 wow fadeIn" data-wow-delay="0.3s">
                                    <img className="img-fluid h-70" src="img/image7.jpg" alt="" />
                                    <div className="h-40 d-flex align-items-center text-center bg-primary px-4">
                                        <h4 className="text-white lh-base mb-0">Open to learn since beginning</h4>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-6 wow fadeIn" data-wow-delay="0.5s">
                            <h1 className="mb-5">
                                <span className="text-primary bg-light px-2">Our</span> Journey</h1>
                            <p className="mb-4">At {import.meta.env.VITE_APP_SITE_NAME}, we believe shopping should be simple, inspiring,
                                and enjoyable. Our journey started with a vision to create a
                                modern online store where customers can discover trending
                                products, quality essentials, and great deals all in one place.</p>
                            <p className="mb-5">Today, {import.meta.env.VITE_APP_SITE_NAME} continues to grow by focusing on customer
                                satisfaction, curated collections, and a seamless shopping
                                experience designed for everyone.</p>
                            <div className="row g-3">
                                <div className="col-sm-6">
                                    <h6 className="mb-3"><i className="fa fa-check text-primary me-2"></i>Leading Platform</h6>
                                    <h6 className="mb-0"><i className="fa fa-check text-primary me-2"></i>Professional Staff</h6>
                                </div>
                                <div className="col-sm-6">
                                    <h6 className="mb-3"><i className="fa fa-check text-primary me-2"></i>24/7 Support</h6>
                                    <h6 className="mb-0"><i className="fa fa-check text-primary me-2"></i>Fair Prices</h6>
                                </div>
                            </div>
                            <div className="d-flex align-items-center mt-5">
                                <a className="btn btn-primary px-4 me-2" href="#!">Read More</a>
                                <a className="btn btn-outline-primary btn-square border-2 me-2" to={import.meta.env.VITE_APP_SITE_FACEBOOK} target='_blank' rel='noopener noreferrer'><i
                                    className="fab fa-facebook-f"></i></a>
                                <a className="btn btn-outline-primary btn-square border-2 me-2" to={import.meta.env.VITE_APP_SITE_TWITTER} target='_blank' rel='noopener noreferrer'><i
                                    className="fab fa-twitter"></i></a>
                                <a className="btn btn-outline-primary btn-square border-2 me-2" to={import.meta.env.VITE_APP_SITE_INSTAGRAM} target='_blank' rel='noopener noreferrer'><i
                                    className="fab fa-instagram"></i></a>
                                <a className="btn btn-outline-primary btn-square border-2 me-2" to={import.meta.env.VITE_APP_SITE_LINKDIN} target='_blank' rel='noopener noreferrer'><i
                                    className="fab fa-linkedin-in"></i></a>
                                <a className="btn btn-outline-primary btn-square border-2" to={import.meta.env.VITE_APP_SITE_YOUTUBE} target='_blank' rel='noopener noreferrer'><i
                                    className="fab fa-youtube"></i></a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
