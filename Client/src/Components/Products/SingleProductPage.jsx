import React from 'react'
import { BiCartAdd } from 'react-icons/bi';

const SingleProductPage = () => {
    return (
        <div className='h-screen flex flex-col items-center'>
            <div className="relative w-5/6 overflow-auto no-scrollbar shadow-lg h-fullflex flex-col justify-around gap-2 px-10 py-5">
                <p className="absolute top-4 left-2 font-bold text-white bg-red-600 px-5 py-2 rounded-full">Decoration</p>
                <div className="outline-black shadow-md flex  gap-2 items-center">
                    {/* Main Image */}
                    <div className="flex  w-full">
                        <img className='w-full max-h-[600px] ' src="https://i.dummyjson.com/data/products/29/1.jpg" alt=""/>
                    </div>


                    {/* SUb Images */}
                    

                </div>


                <div className="flex flex-col gap-3 mt-5">
                    <div className="">
                        <h2 className="text-4xl text-purple-700 text-center font-bold">Beautiful Ceramic Vase on sell</h2>
                    </div>
                    <div className="">
                        <p className="italic text-lg">Lorem ipsum dolor sit, amet consectetur adipisicing elit. Distinctio, deserunt voluptates fugit autem reiciendis amet voluptatum, pariatur voluptas libero ad eaque repellat! Cum nemo cumque corporis consectetur unde dolor! Aliquid consequatur ratione delectus sequi. Dolores, esse quo ea vero molestias nam facere mollitia. Repellat voluptates qui incidunt quaerat nostrum hic natus odit inventore magni? Esse maxime ducimus necessitatibus ipsa cum modi dolorem eius porro, ad, fugiat quam tempore. Beatae ab, unde dolorem rem id voluptates inventore sit distinctio enim praesentium maiores vitae veritatis quo similique temporibus illum sunt, obcaecati quos suscipit nam fuga quisquam! Error odit, sit voluptatibus quidem commodi neque? Obcaecati, itaque qui ipsa esse eum accusantium earum nisi aperiam consequatur cumque distinctio nostrum beatae tempore deleniti provident necessitatibus sit facere dolores non dolorum soluta ducimus minus. Rerum, facere pariatur? Suscipit tenetur recusandae, earum unde illum asperiores. Iste, blanditiis inventore. Laudantium unde error quis modi repellendus cum quibusdam. Vitae eligendi enim omnis vero ratione accusamus hic, aspernatur soluta eum nesciunt amet minus, dolorum aut quidem modi cum. Nostrum, earum consequuntur? Vero explicabo dignissimos facere minima? Ratione modi dolorum natus minima tempore accusantium in fugiat aperiam numquam optio iure saepe aliquam, corporis voluptas provident. Ratione cum et rerum quis excepturi.</p>
                    </div>

                    <div className="">
                        <h3 className="font-bold text-3xl text-purple-700">Npr 999/-</h3>
                    </div>
                    <div className="flex flex-col items-center lg:flex-row justify-between gap-4">
                        <div className="flex flex-col gap-2">
                            <p className="font-bold underline text-xl">Product Details</p>
                            <ul className='list-disc text-lg'>
                                <li>Ceramic with Painting</li>
                                <li>1 Year Warrenty</li>
                                <li>Scratch proof</li>
                            </ul>
                        </div>

                        <div className="flex flex-col gap-2 shadow-md w-2/3 p-4">
                            <div className="flex flex-col gap-3">
                                <label htmlFor="" className='font-bold'>Color Options</label>
                                <select name="" id="" className='px-2 py-2'>
                                    <optgroup>
                                        <option value="" defaultChecked>Red</option>
                                        <option value="">Blue</option>
                                    </optgroup>
                                </select>
                            </div>
                            <div className="">
                                <label htmlFor="" className='font-bold'>Size Options</label>
                                <div className="flex flex-row justify-around font-bold">
                                <div className="flex items-center gap-2">
                                    <label htmlFor="">M</label>
                                    <input type="radio" name="size" id=""/>
                                </div>
                                <div className="flex items-center gap-2">
                                    <label htmlFor="">S</label>
                                    <input type="radio" name="size" id=""/>
                                </div>
                                <div className="flex items-center gap-2">
                                    <label htmlFor="">L</label>
                                    <input type="radio" name="size" id=""/>
                                </div>
                                <div className="flex items-center gap-2">
                                    <label htmlFor="">XL</label>
                                    <input type="radio" name="size" id=""/>
                                </div>
                                </div>
                               
                            </div>

                            <div className="flex justify-center items-center">
                              <button className="relative w-full bg-purple-800 text-white px-3 py-2 rounded-full">Add to Cart</button>
                    </div>
                        </div>
                    </div>


                </div>
            </div>

        </div>
    )
}

export default SingleProductPage
