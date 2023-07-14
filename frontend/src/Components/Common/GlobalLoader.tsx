import React from 'react';
import { HashLoader } from 'react-spinners';
import './styles/globalLoader.css';

export default function GlobalLoader() {
    return (
        <div className='w-100 h-100 d-flex justify-content-center align-items-center global-loader-container'>
            <HashLoader color='#36d7b7' size={100} />
        </div>
    )
}