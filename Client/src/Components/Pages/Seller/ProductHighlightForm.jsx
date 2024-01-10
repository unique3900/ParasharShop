import React from 'react'

const ProductHighlightForm = ({highlightInput,handleHighlightChange}) => {
  return (
    <div className="col-span-full">
    <label
      htmlFor="about"
      className="block text-sm font-medium leading-6 text-gray-900"
    >
      Product Highlights
    </label>
    <p className="mt-3 text-sm leading-6 text-gray-600">
      Write Highlights for Your Product, Separate by Commas
    </p>
    <div className="mt-2 relative">
      <input
        type="text"
        value={highlightInput}
        onChange={handleHighlightChange}
        rows="3"
        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
      />
    </div>
  </div>
  )
}

export default ProductHighlightForm
