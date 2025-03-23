import React from 'react'

type MiniLayout_type = {
    title: string, 
    children: React.ReactNode,
}
export default function MiniLayout({title, children}: MiniLayout_type) {
  return (
    <div className='bg-white rounded overflow-hidden shadow-2xl'>
        <div className='p-2 bg-white border-darkgrey'>
            <h1 className='text-darkgrey text-center font-bold md:text-2xl text-4xl'>{title}</h1>
        </div>
        <div className='flex flex-col p-4 gap-5 items-center'>
            {children}
        </div>
    </div>
  )
}
