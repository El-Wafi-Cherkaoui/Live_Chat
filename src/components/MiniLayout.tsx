import React from 'react'

type MiniLayout_type = {
    title: string, 
    children: React.ReactNode,
}
export default function MiniLayout({title, children}: MiniLayout_type) {
  return (
    <div className='bg-amber-50 rounded overflow-hidden'>
        <div className='p-5 bg-red-800'>
            <h1 className='text-amber-50 text-center font-bold text-2xl'>{title}</h1>
        </div>
        <div className='flex flex-col p-5 gap-5 items-center'>
            {children}
        </div>
    </div>
  )
}
