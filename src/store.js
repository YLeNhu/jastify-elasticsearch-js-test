import { configureStore } from '@reduxjs/toolkit'
import bookstoreReducer from "./reducers/bookstore.reducer"
export const store = configureStore({
  reducer: { bookstore: bookstoreReducer }
})
