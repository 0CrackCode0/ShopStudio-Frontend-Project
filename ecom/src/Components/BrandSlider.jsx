import React, { useEffect } from 'react'
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';

import 'swiper/css';

import { getBrand } from "../Redux/ActionCreators/BrandActionCreators"

export default function BrandSlider() {
    let BrandStateData = useSelector(state => state.BrandStateData)
    let dispatch = useDispatch()
    let sliderOptions = {
        loop: true,
        modules: [Autoplay],
        autoplay: {
            delay: 2000,
        },
        pagination: false,
        breakpoints: {
            0: {
                slidesPerView: 1,
            },
            768: {
                slidesPerView: 2,
            },
            1200: {
                slidesPerView: 3,
            }
        }
    }

    useEffect(() => {
        (() => {
            dispatch(getBrand())
        })()
    }, [BrandStateData.length])

    return (
        <div className="container">
            <h3 className='text-center p-2 bg-primary text-light mt-2'>Our Brand</h3>
            <Swiper className='mySwiper' {...sliderOptions}>
                {
                    BrandStateData.map((item) => {
                        return <SwiperSlide key={item.id}>
                            <div className="wow fadeIn m-1" data-wow-delay="0.2s">
                                <div>
                                    <Link className='fs-3 position-absolute bottom-0 text-dark d-block w-100 text-center m-1' to={`/shop?br=${item.name}`}>{item.name}</Link>
                                    <img src={`${import.meta.env.VITE_APP_IMAGE_SERVER}/${item.pic}`} className='w-100' style={{ height: "250px" }} alt="" />
                                </div>
                            </div>
                        </SwiperSlide>
                    })
                }
            </Swiper>
        </div>
    )
}
