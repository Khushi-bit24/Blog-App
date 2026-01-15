import { assets } from '@/assets/assets'
import Image from 'next/image'
import React from 'react'

const Footer = () => {
  return (
    <div  className='flex justify-around flex-col gap-2 sm:gap-0 sm:flex-row bg-black py-5 items-center'>
        <Image src = {assets.logoicon} alt ='logo' width ={50} height={40}/>
        <p className='text-sm text-white'>All rights reserved.Copyright@blogger</p>
        <div className='flex'></div>
        <Image src ={assets.facebookicon}alt=''width={40}/>
        <Image src ={assets.googleicon}alt=''width={40}/>
        <Image src ={assets.twittericon}alt=''width={40}/>

    </div>
  )
}

export default Footer