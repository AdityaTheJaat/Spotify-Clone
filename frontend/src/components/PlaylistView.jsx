import React from 'react'
import Card from './common/Card'

const PlaylistView = ({title, data}) => {
  return (
    <div className='text-white p-5 mt-4'>
      <div className='text-2xl font-semibold pb-5'>{title}</div>
      <div className='w-full flex justify-between space-x-5 pt-0'>
        {
          data.map((info) => (
            <Card key={info.id} title={info.title} description={info.description} imgUrl={info.imgUrl} info={data} />
          ))
        }
      </div>
    </div>
  )
}

export default PlaylistView