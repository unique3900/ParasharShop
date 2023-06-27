import React from 'react'

const Pagination = ({page,setPage,totalPage}) => {
  return (
    <div className='w-full mt-10 flex flex-row justify-between px-10 '  >
          <button className={`font-bold text-4xl`} disabled={page==1?true:false} onClick={() => {
                  page==1?setPage(1):setPage(page-1)
          }}>⬅️</button>
          <div className="flex items-center">
              <p className="italic">{page} out of {totalPage/10} pages</p>
              <button className={`font-bold text-4xl`} onClick={() => {
                  page==totalPage/10?setPage(totalPage/10):setPage(page+1)
          }} disabled={page==totalPage/10?true:false}>➡️</button>
          </div>
          
    </div>
  )
}

export default Pagination
