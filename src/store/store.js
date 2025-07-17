// store.js
import { configureStore } from '@reduxjs/toolkit'
import commonReducer from './features/CommonSlice.js'
import { authApi } from './services/authApi.js'
import { blogApi } from './services/blogApi.js'
import { enquiryApi } from './services/enquiryApi.js'


export const store = configureStore({
  reducer: {
    common: commonReducer,
    [authApi.reducerPath]: authApi.reducer,
    [blogApi.reducerPath]:blogApi.reducer,
    [enquiryApi.reducerPath]:enquiryApi.reducer
    
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      authApi.middleware,
      blogApi.middleware,
      enquiryApi.middleware
     
    ),
})
