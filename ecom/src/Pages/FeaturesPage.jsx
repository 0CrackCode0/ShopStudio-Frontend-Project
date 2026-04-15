import React from 'react'
import Breadcrum from '../Components/Breadcrum'
import Features from '../Components/Features'
import Testimonials from '../Components/Testimonials'

export default function FeaturesPage() {
    return (
        <>
            <Breadcrum title="Features" />
            <Features />
            <Testimonials />
        </>
    )
}