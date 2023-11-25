import React from 'react'
import { AiOutlineCloudUpload } from "react-icons/ai";
import { MdDeleteForever } from "react-icons/md";

const ImageUploader = ({imageURL,setImageURL,addImageByUrl,handleImageDelete,uploadedImages}) => {
  return (
    <div>
                        <div className="mt-2 flex flex-row gap-3">
                    <input
                      value={imageURL}
                      onChange={(e) => {
                        setImageURL(e.target.value);
                      }}
                      id="URL"
                      placeholder="Paste Image URL"
                      rows="3"
                      className="block w-full rounded-md px-2 border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                    <button
                      onClick={(e) => {
                        e.preventDefault();
                        addImageByUrl();
                      }}
                      className="bg-blue-600 px-3 py-2 text-white font-bold"
                    >
                      Add
                    </button>
          </div>
          

          <div className="mt-2 w-fit border-2 border-black/30 rounded-3xl">
                    <label className="h-32 cursor-pointer flex items-center gap-1 justify-center border bg-transparent rounded-2xl p-2 text-2xl text-gray-600">
                      <input
                        type="file"
                        multiple
                        accept="image/*"
                        className="hidden"
                      />
                      <AiOutlineCloudUpload />
                      Upload from Device
                    </label>
                  </div>

                  {uploadedImages.length > 0 && (
                    <div className="flex flex-row flex-wrap gap-2 mt-3 items-center w-full">
                      {uploadedImages?.map((item, index) => (
                        <div key={index} className="relative w-48 h-48">
                          <img
                            key={index}
                            className=" object-cover w-full h-full rounded-xl"
                            src={`http://localhost:8080/uploads/${item}`}
                            alt=""
                              />
                              <div className="absolute w-full h-full top-0 left-0 bg-black/40"></div>
                              <MdDeleteForever onClick={() => {
                                  handleImageDelete(index)
                          }}  size={50} className="cursor-pointer absolute bottom-5 right-3 text-white" />
                        </div>
                      ))}
                    </div>
                  )}
      </div>
      


  )
}

export default ImageUploader
