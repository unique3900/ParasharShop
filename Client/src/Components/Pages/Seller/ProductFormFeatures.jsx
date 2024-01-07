import React from "react";
import { FaCheckCircle } from "react-icons/fa";
import { IoIosClose } from "react-icons/io";
const ProductFormFeatures = ({
  feature1,
  feature1Title,
  setFeature1Title,
  setFeature2Title,
  feature2,
  feature2Title,
  setFeature1,
    setFeature2,
    feature1Option,
    setFeature1Option,
    feature2Option,
    setFeature2Option,
  register
}) => {
  return (
    <div className="col-span-full">
          {/* Feature 1  */}
          <div className="col-span-full">
        <label
          htmlFor="about"
          className="block text-sm font-medium leading-6 text-gray-900"
        >
          Product Feature 1
        </label>
        <div className="mt-2 relative flex flex-row gap-2">
          <input
            type="text"
            rows="3"
            value={feature1Title}
            onChange={(e) => {
              setFeature1Title(e.target.value);
            }}
                     
                      id="feature1Title"
            placeholder="What should be feature 1 be named as?"
            className="block w-1/3 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          />
          <input
            type="text"
            rows="3"
            className="block w-2/3 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            value={feature1Option}
            onChange={(e) => {
              setFeature1Option(e.target.value);
            }}
            onKeyDown={(e) => {
              if (e.key == "Enter") {
                if (feature1.length < 4) {
                  feature1 != null &&
                    setFeature1([...feature1, feature1Option]);
                  setFeature1Option("");
                } else {
                  toast.error("Maximum 4 Feature Options Allowed");
                }
              }
            }}
          />
        </div>
        {feature1.length == 0 ? (
          <p className="bg-[#b13333] text-white w-fit  font-bold mt-4 py-1 px-3">
            Enter Features 1
          </p>
        ) : (
          <div className="flex flex-row flex-wrap  gap-2 items-center mt-3">
            {feature1.map((item, index) => (
              <p
                className="bg-[#7b2883] font-bold text-center px-3 py-2 text-white flex items-center justify-between"
                key={index}
              >
                {item}
                <span
                  className=""
                    onClick={() => {
                    setFeature1(feature1.filter((i,ind)=> index!==ind))
        
                        
                  }}
                >
                  <IoIosClose
                    className="text-white cursor-pointer text-2xl font-bold"
                    size={28}
                  />
                </span>
              </p>
            ))}
          </div>
        )}
      </div>

          

          {/*Feature 2  */}
      <div className="col-span-full">
        <label
          htmlFor="about"
          className="block text-sm font-medium leading-6 text-gray-900"
        >
          Product Feature 2
        </label>
        <div className="mt-2 relative flex flex-row gap-2">
          <input
            type="text"
            rows="3"
                      value={feature2Title}
                      id="feature2Title"
            onChange={(e) => {
              setFeature2Title(e.target.value);
                      }}
                     
            placeholder="What should be feature 2 be named as?"
            className="block w-1/3 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          />
          <input
            type="text"
            rows="3"
            className="block w-2/3 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            value={feature2Option}
            onChange={(e) => {
              setFeature2Option(e.target.value);
            }}
            onKeyDown={(e) => {
              if (e.key == "Enter") {
                if (feature2.length < 4) {
                  feature2 != null &&
                    setFeature2([...feature2, feature2Option]);
                  setFeature2Option("");
                } else {
                  toast.error("Maximum 4 Feature Options Allowed");
                }
              }
            }}
          />
        </div>
        {feature2.length <= 0 ? (
          <p className="bg-[#b13333] text-white w-fit  font-bold mt-4 py-1 px-3">
            Enter Features
          </p>
        ) : (
          <div className="flex flex-row flex-wrap  gap-2 items-center mt-3">
            {feature2.map((item, index) => (
              <p
                className="bg-[#7b2883] font-bold text-center px-3 py-2 text-white flex items-center justify-between"
                key={index}
              >
                {item}
                <span
                  className=""
                    onClick={() => {
                        setFeature2(feature2.filter((i,ind)=> index!==ind))
                  }}
                >
                  <IoIosClose
                    className="text-white cursor-pointer text-2xl font-bold"
                    size={28}
                  />
                </span>
              </p>
            ))}
          </div>
        )}
      </div>



    </div>
  );
};

export default ProductFormFeatures;
