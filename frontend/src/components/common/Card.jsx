import React from 'react'

const Card = ({title, description, imgUrl}) => {
  return (
    <div className='bg-gradient-to-b from-[#1f2728] via-[#131618] to-[#070808] cursor-pointer opacity-80 w-full py-5 space-y-2 p-4 hover:opacity-95 hover:transition-all delay-110  transition-all rounded-lg hover:bg-slate-600'>
      <div className='mb-2'>
        <img className='w-full rounded-lg h-auto' src={imgUrl} alt="" />
      </div>
      <div className='text-white'>{title}</div>
      <div className='text-gray-400 text-sm'>{description}</div>
    </div>
  )
}

export default Card