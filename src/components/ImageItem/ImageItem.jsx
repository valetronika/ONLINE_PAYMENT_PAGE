import s from './ImageItem.module.css';
import React from 'react'
import img from '../../assets/faster_pay.svg'

export default function ImageItem() {
  return (
    <div>
        <img src={img} alt="faster_pay icon" className={s.img}/>
    </div>
  )
}
