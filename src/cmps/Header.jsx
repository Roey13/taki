import React from 'react';
import { Link } from 'react-router-dom'

export function Header() {

    return (
        <div className="header">
            <Link to={'/'}>
                Taki
            </Link>
        </div>
    )
}