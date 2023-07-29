import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { createProduct, fetchAllBrands, fetchAllCategory, fetchAllProducts, fetchProductById, fetchProductBySellerId, fetchProductsByFilter, updateProduct } from "./productListApi";

const initialState = {
  products: [],
  sellerProducts:[],
  brands: [],
  categories:[],
  count:1,
  status: "idle",
  selectedProduct: null,
};

export const fetchAllProductsAsync = createAsyncThunk(
  "products/fetchAllProducts",
  async () => {
    const response = await fetchAllProducts();
    return response.data;
  }
);
export const createProductAsync = createAsyncThunk(
  "products/createNewProduct",
  async (product) => {
    const response = await createProduct(product);
    return response.data;
  }
);

export const updateProductAsync = createAsyncThunk(
  "products/updateProduct",
  async (data) => {
    const response = await updateProduct(data);
    return response.data;
  }
)


export const fetchProductByIdAsync = createAsyncThunk(
  "products/fetchProductById",
  async (id) => {
    const response = await fetchProductById(id);
    return response.data;
  }
)
export const fetchProductBySellerIdAsync = createAsyncThunk(
  "products/fetchProductBySellerId",
  async (id) => {
    const response = await fetchProductBySellerId(id);
    return response.data;
  }
)
export const fetchProductsByFilterAsync = createAsyncThunk(
  "products/fetchProductByFilter",
  async ({filter,sort}) => {
    const response = await fetchProductsByFilter(filter,sort);
    return response.data;
  }
);
export const fetchBrandsAsync = createAsyncThunk(
  "products/fetchBrands",
  async () => {
  const response = await fetchAllBrands();
  return response.data;
  }
)
export const fetchCategoryAsync = createAsyncThunk(
  "products/fetchCategory",
  async () => {
    const response = await fetchAllCategory();
    return response.data;
  }
)

export const productSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {
    increament: (state) => {
      state.count + 1
  }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllProductsAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchAllProductsAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.products=action.payload ;
      })
      .addCase(createProductAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(createProductAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.products.push(action.payload);
      })
      .addCase(updateProductAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(updateProductAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.products = action.payload;
      })
      .addCase(fetchProductByIdAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchProductByIdAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.selectedProduct=action.payload ;
      })
      .addCase(fetchProductBySellerIdAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchProductBySellerIdAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.sellerProducts=action.payload ;
      })
      .addCase(fetchProductsByFilterAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchProductsByFilterAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.products=action.payload ;
      })
      .addCase(fetchBrandsAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchBrandsAsync.fulfilled, (state, action) => {
        state.status = "idle",
          state.brands = action.payload;
      })
      .addCase(fetchCategoryAsync.pending, (state) => {
        state.status = "loading"
      })
      .addCase(fetchCategoryAsync.fulfilled, (state, action) => {
        state.status = "idle",
        state.categories = action.payload;
    })
  },
});

export const {increament } = productSlice.actions;

export const selectAllProducts = (state) => state.product.products;
export const selectAllBrands = (state) => state.product.brands;
export const selectAllCategories = (state) => state.product.categories;
export const selectProductById = (state) => state.product.selectedProduct;
export const sellerProducts=(state)=>state.product.sellerProducts
export default productSlice.reducer;
