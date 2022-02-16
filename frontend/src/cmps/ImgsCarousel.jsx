/*eslint-disable*/
import React, { useEffect, useState } from 'react';
import { Loading } from '../helpers/Loading.js'
import SwipeableTextMobileStepper from './SwipeableTextMobileStepper'

export function ImgsCarousel({ rocket, launchpad }) {

    const [images, setImages] = useState([])

    useEffect(() => {
        let imgsData = []
        rocket.flickr_images.map((img) => {
            const imgData = { imgPath: img, label: rocket.name + ' rocket' }
            imgsData.push(imgData)
        })
        launchpad.images.large.map((img) => {
            const imgData = { imgPath: img, label: launchpad.name + ' launchpad' }
            imgsData.push(imgData)
        })
        setImages(imgsData)
    }, [])

    if (images.length < 1) return <Loading />

    return (
        <SwipeableTextMobileStepper images={images}/>
    )
}