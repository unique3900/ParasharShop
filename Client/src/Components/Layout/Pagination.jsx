import React from 'react'

const Pagination = ({page,setPage,totalPage}) => {
  return (
    <div className='w-full mt-10 flex flex-row justify-between px-10 '  >
          <button className={`font-bold text-4xl text-purple-700`} disabled={page==1?true:false} onClick={() => {
                  page==1?setPage(1):setPage(page-1)
          }}>⬅️</button>
          <div className="flex items-center">
              <p className="italic">{page} out of {Math.ceil(totalPage/12) } pages</p>
              <button className={`font-bold text-4xl`} onClick={() => {
                  page==totalPage/12?setPage(Math.ceil(totalPage/12) ):setPage(page+1)
          }} disabled={page== Math.ceil(totalPage/12)?true:false}>➡️</button>
          </div>
          
    </div>
  )
}

export const MiniPagination = ({page,setPage,totalPage}) => {
  return (
    <div className='w-full mt-10 flex flex-row justify-between px-10 '  >
          <button className={`font-bold text-4xl text-purple-700`} disabled={page==1?true:false} onClick={() => {
                  page==1?setPage(1):setPage(page-1)
          }}>⬅️</button>
          <div className="flex items-center">
              <p className="italic">{page} out of {Math.ceil(totalPage/4) } pages</p>
              <button className={`font-bold text-4xl`} onClick={() => {
                  page==totalPage/4?setPage(Math.ceil(totalPage/4) ):setPage(page+1)
          }} disabled={page== Math.ceil(totalPage/4)?true:false}>➡️</button>
          </div>
          
    </div>
  )
}

export default Pagination
