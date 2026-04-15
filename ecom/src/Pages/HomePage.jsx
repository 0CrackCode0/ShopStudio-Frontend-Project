import React, { useEffect, useRef, useState } from 'react';
import About from '../Components/About'
import Features from '../Components/Features'
import Products from '../Components/Products'
import ProductSlider from '../Components/ProductSlider'
import Testimonials from '../Components/Testimonials'
import Breadcrum from '../Components/Breadcrum'
import MaincategorySlider from '../Components/MaincategorySlider';
import SubcategorySlider from '../Components/SubcategorySlider';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';

import 'swiper/css'

import { getMaincategory } from "../Redux/ActionCreators/MaincategoryActionCreators"
import { getProduct } from "../Redux/ActionCreators/ProductActionCreators"
import { useDispatch, useSelector } from 'react-redux';
import BrandSlider from '../Components/BrandSlider';

export default function HomePage() {
  let MaincategoryStateData = useSelector(state => state.MaincategoryStateData)
  let ProductStateData = useSelector(state => state.ProductStateData)

  let dispatch = useDispatch()

  let sliderOptions = {
    loop: true,
    modules: [Autoplay],
    autoplay: {
      delay: 2000,
    }
  }

  useEffect(() => {
    (() => {
      dispatch(getMaincategory())
    })()
  }, [MaincategoryStateData.length])

  useEffect(() => {
    (() => {
      dispatch(getProduct())
    })()
  }, [ProductStateData.length])

  return (
    <>
      <div className="container-fluid pb-5 hero-header bg-light mb-5">
        <div className="container py-5">
          <div className="row g-5 align-items-center mb-5">
            <div className="col-lg-6">
              <h1 className="display-3 mb-4 animated slideInRight">Discover Trends. <span className="text-primary">Define </span>Your Style</h1>
              <h5 className="d-inline-block border border-2 border-white py-3 px-5 mb-0 fs-6 animated slideInRight">ShopStudio | Everything You Love, All in One Place.</h5>
            </div>
            <div className="col-lg-6">
              <div className="header-carousel animated fadeIn">
                <Swiper className='mySwiper' {...sliderOptions}>
                  <SwiperSlide><img className="w-100" height={300} src="img/image2.jpg" alt="" /></SwiperSlide>
                  <SwiperSlide><img className="w-100" height={300} src="img/image1.jpg" alt="" /></SwiperSlide>
                  <SwiperSlide><img className="w-100" height={300} src="img/image3.jpg" alt="" /></SwiperSlide>
                  <SwiperSlide><img className="w-100" height={300} src="img/image5.jpg" alt="" /></SwiperSlide>
                  <SwiperSlide><img className="w-100" height={300} src="img/image4.jpg" alt="" /></SwiperSlide>
                  <SwiperSlide><img className="w-100" height={300} src="img/image6.jpg" alt="" /></SwiperSlide>
                </Swiper>
              </div>
            </div>
          </div>
          <div className="row g-5 animated fadeIn">
            <div className="col-md-6 col-lg-3">
              <div className="d-flex align-items-center">
                <div className="flex-shrink-0 btn-square border border-2 border-white me-3">
                  <i className="fa fa-truck fs-3 text-primary"></i>
                </div>
                <h5 className="lh-base mb-0">Fast Delivery</h5>
              </div>
            </div>
            <div className="col-md-6 col-lg-3">
              <div className="d-flex align-items-center">
                <div className="flex-shrink-0 btn-square border border-2 border-white me-3">
                  <i className="fa fa-check-circle fs-3 text-primary"></i>
                </div>
                <h5 className="lh-base mb-0">Original Products</h5>
              </div>
            </div>
            <div className="col-md-6 col-lg-3">
              <div className="d-flex align-items-center">
                <div className="flex-shrink-0 btn-square border border-2 border-white me-3">
                  <i className="fa fa-rotate-left fs-3 text-primary"></i>
                </div>
                <h5 className="lh-base mb-0">Easy Returns</h5>
              </div>
            </div>
            <div className="col-md-6 col-lg-3">
              <div className="d-flex align-items-center">
                <div className="flex-shrink-0 btn-square border border-2 border-white me-3">
                  <i className="fa fa-support fs-3 text-primary"></i>
                </div>
                <h5 className="lh-base mb-0">24/7 Support</h5>
              </div>
            </div>
          </div>
        </div>
      </div>
      <MaincategorySlider />
      <SubcategorySlider />
      <BrandSlider />
      <About />
      <Features />
      <ProductSlider maincategory={MaincategoryStateData.filter(x => x.status)} product={ProductStateData.filter(x => x.status)} />
      <Products products={ProductStateData.filter(x => x.status).slice(0, 24)} />
      <Testimonials />
      <Breadcrum />
    </>
  )
}