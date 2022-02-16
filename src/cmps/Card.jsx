import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom'
import noImg from '../assets/img/noimg.png'

export function Card(props) {

    const { landing } = props;

    const patchImg = landing.links.patch.small

    const [imgSrc, setImgSrc] = useState()

    useEffect(() => {
        if (patchImg) setImgSrc(patchImg)
        else setImgSrc(noImg)
    }, [imgSrc, patchImg])

    let txt = landing.details
    if (txt && txt.length > 48) txt = txt.substring(0, 48) + '...'

    return <div className="card-container">
        <Link to={`/landings/${landing.id}`}>
            <img src={imgSrc} alt='' />
            <h1>{landing.name}</h1>
            <p>{txt}</p>
        </Link>
    </div>
}
