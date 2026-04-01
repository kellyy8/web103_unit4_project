import React from 'react'
import '../App.css'
import '../css/Navigation.css'

const Navigation = () => {
    return (
        <nav>
            <ul>
                <li><h1>DIY Earrings 💎</h1></li>
            </ul>

            <ul>
                <li><a href='/' role='button'>Customize</a></li>
                <li><a href='/customearrings' role='button'>View Earrings</a></li>
            </ul>
            
        </nav>
    )
}

export default Navigation