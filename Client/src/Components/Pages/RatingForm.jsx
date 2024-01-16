import React, { useState } from "react";
import { RiStarSLine } from "react-icons/ri";
import { RiStarSFill } from "react-icons/ri";
import { useDispatch, useSelector } from "react-redux";
import { toast, Toaster } from "react-hot-toast";
import { updateRatingStatusAsync } from "../../features/order/orderSlice";
import { fetchLoggedInUserOrdersAsync } from "../../features/user/userSlice";
import { rating } from "@material-tailwind/react";
import {
  fetchAllProductsAsync,
  updateProductRatingAsync,
} from "../../features/product/productListSlice";

const RatingForm = ({ productId, id }) => {
  const [userRating, setUserRating] = useState(0);
  const dispatch = useDispatch();
  const handleRatingStatusChange = async (rating) => {
    // id,value,productId
    const data = { id, productId, value: true };
    await dispatch(updateRatingStatusAsync(data));
    toast.success("Thank You For Rating the Product");
    await dispatch(fetchLoggedInUserOrdersAsync());

    console.log(userRating);
    // Update totalRating Aswell in Products
    const dataProduct = { productId, rating: Number(rating)  };
    console.log(dataProduct);
    await dispatch(updateProductRatingAsync(dataProduct));
  };
  return (
    <div className="flex ">
      <Toaster />
      <div className="rating">
              <input type="radio" name="rating-4" value={1} onClick={(e) =>
              {
                  setUserRating(e.target.value)
                  handleRatingStatusChange(e.target.value)
              }} className="mask mask-star-2 bg-yellow-500" />
              <input type="radio" name="rating-4" value={2} onClick={(e) =>
              {
                  setUserRating(e.target.value)
                  handleRatingStatusChange(e.target.value)
              }} className="mask mask-star-2 bg-yellow-500"  />
              <input type="radio" name="rating-4" value={3} onClick={(e) =>
              {
                  setUserRating(e.target.value)
                  handleRatingStatusChange(e.target.value)
              }} className="mask mask-star-2 bg-yellow-500" />
              <input type="radio" name="rating-4" value={4} onClick={(e) =>
              {
                  setUserRating(e.target.value)
                  handleRatingStatusChange(e.target.value)
              }} className="mask mask-star-2 bg-yellow-500" />
              <input type="radio" name="rating-4" value={5} onClick={(e) =>
              {
                  setUserRating(e.target.value)
                  handleRatingStatusChange(e.target.value)
              }}
               className="mask mask-star-2 bg-yellow-500" />
</div>
    </div>
  );
};

export default RatingForm;
