import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import { StarIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { useSelector, useDispatch } from "react-redux";
import {
  fetchProductRecommendationAsync,
  selectProductRecommendation,
} from "../../features/product/productListSlice";

const RecommendationPage = ({ id }) => {
  const params = useParams();
  const dispatch = useDispatch();
  const [recommendation, setRecommendation] = useState([]);
  const recommendations = useSelector(selectProductRecommendation);

  useEffect(() => {
    // Dispatch the action to fetch product recommendations
    dispatch(fetchProductRecommendationAsync(params.id));
  }, [params.id, dispatch]);

  useEffect(() => {
    // Filter and set the recommendations in the local state
    setRecommendation(recommendations.filter((item) => item.similarity));
  }, [recommendations]);

  return (
    <div className="">
      {recommendation.length > 0 && (
        <div className="flex flex-col items-center justify-center gap-4">
          <h1 className="text-center font-bold text-4xl">You May Also Like</h1>

          <div className="grid grid-cols-2 justify-center lg:grid-cols-3 gap-3">
            {recommendation?.map((item, index) => (
              <div
                key={index}
                className="relative flex flex-col gap-2 lg:items-stretch  justify-between px-2 py-4 lg:w-72 shadow-lg"
              >
                <Link
                  to={`/products/${item?.item.id}`}
                  className="flex justify-center"
                >
                  <img
                    src={`http://localhost:8080/uploads/${item?.item.thumbnail}`}
                    className="w-[200px] object-cover"
                    alt=""
                  />
                </Link>

                <h3 className="text-center font-bold text-lg">
                  {item?.item.title}
                </h3>

                <div className="flex gap-2">
                  <StarIcon className="w-6 h-6" />
                  <p className="">4</p>
                </div>
                <div className="flex justify-between">
                  {item?.item.discountPercentage ? (
                    <>
                      <del className="text-lg italic text-purple-700">
                        NRS {item?.item.price}
                      </del>
                      <p className="text-lg italic font-bold text-red-700">
                        NRS{" "}
                        {Math.round(
                          item?.item.price * (1 - item?.item.discountPercentage / 100)
                        )}
                      </p>
                    </>
                  ) : (
                    <p className="text-lg italic  text-purple-700">
                      NRS {item?.item.price}
                    </p>
                  )}

                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default RecommendationPage;
