import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { selectLoggedInUserToken } from '../../features/Auth/authSlice';
import { Toaster } from 'react-hot-toast';
import { Card, Typography } from "@material-tailwind/react";
 
const TABLE_HEAD = ["Name", "Job", "Employed", "Option"];
 
const TABLE_ROWS = [
  {
    name: "John Michael",
    job: "Manager",
    date: "23/04/18",
  },
  {
    name: "Alexa Liras",
    job: "Developer",
    date: "23/04/18",
  },
  {
    name: "Laurent Perrier",
    job: "Executive",
    date: "19/09/17",
  },
  {
    name: "Michael Levi",
    job: "Developer",
    date: "24/12/08",
  },
  {
    name: "Richard Gran",
    job: "Manager",
    date: "04/10/21",
  },
];

const WishList = () => {
    const dispatch = useDispatch();
    const userToken = useSelector(selectLoggedInUserToken);

  return (
    <div className='min-h-screen w-full flex flex-col items-center'>
          <Toaster />
          <h1 className="text-center font-bold text-4xl p-2">Wishlist</h1>
          <Card className="h-full w-11/12 overflow-scroll no-scrollbar">
      <table className="w-full min-w-max table-auto text-left no-scrollbar">
        <thead className='bg-indigo-600 text-white'>
          <tr>
            {TABLE_HEAD.map((head) => (
              <th key={head} className="border-b border-blue-gray-100 bg-blue-gray-50 text-white p-4">
                <Typography
                  variant="small"
                  color="white"
                  className="font-normal leading-none "
                >
                  {head}
                </Typography>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {TABLE_ROWS.map(({ name, job, date }, index) => (
            <tr key={name} className="even:bg-blue-gray-50/50">
              <td className="p-4">
                <Typography variant="small" color="blue-gray" className="font-normal">
                  {name}
                </Typography>
              </td>
              <td className="p-4">
                <Typography variant="small" color="blue-gray" className="font-normal">
                  {job}
                </Typography>
              </td>
              <td className="p-4">
                <Typography variant="small" color="blue-gray" className="font-normal">
                  {date}
                </Typography>
              </td>
              <td className="p-4">
                <Typography as="a" href="#" variant="small" color="blue-gray" className="font-medium">
                  Edit
                </Typography>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </Card>
    </div>
  )
}

export default WishList
