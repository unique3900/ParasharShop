import React from 'react'
import {
    navList
} from '../../Data/data'
import {
    Link
} from 'react-router-dom'

const NavbarList = ({
    navState
}) => {
    return (
        <>

            {
                navState == false && (
                    <div className='hidden lg:flex flex-row w-2/3 py-2 justify-center gap-5'>
                    {
                    navList.map((item) => (
                        <Link key={
                            item.id
                        }>
                            {
                            item.title
                        }</Link>
                    ))
                    } </div>
                )
            }

            
            {
                navState == true && (
                    <div className='flex h-screen flex-col text-black font-bold w-full px-3 py-10 items-center gap-14'>
                {
                navList.map((item) => (
                    <Link key={
                        item.id
                    }>
                        {
                        item.title
                    }</Link>
                ))
                } </div>
                )
            }
        </>


    )
}

export default NavbarList
