import {createAction, createReducer} from "@reduxjs/toolkit"
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import http from "../utils/http"
import {comments} from "../components/BookDisplay/dummyData"

export const changeLesson = createAction('calc/changeLesson')

const initialState= {

    myBook: {
        title: "",
        author: "",
        publishedDate: "",
        description: "",
        price: 0.0
    },
    commentList: [...comments],
    commentCount: comments.length,
    loading: false
}

export const getBook = createAsyncThunk('bookstore/getBook', async (bookId, thunkAPI) => {
  const response = await http.get(`/books/?id=${bookId}`, {
    signal: thunkAPI.signal
  })
  return response.data
})

const bookstoreSlice = createSlice({
  name: 'bookstore',
  initialState,
  reducers: {
    postComment: (state, action) => {
      state.commentList = [...state.commentList, action.payload],
      state.commentCount += 1
    },
    postReply: (state, action) => {
      const userId = action.payload.userId 
      state.commentList.some((post, index) => {
        if (post.id === userId) {
          const thisCommentChilren = state.commentList[index].children
          thisCommentChilren.push(action.payload.children)

          return true
        }
        return false
      })
    },
    deleteComment: (state, action) => {
      const postId = action.payload
      const foundPostIndex = state.commentList.findIndex((post) => post.id === postId)
      if (foundPostIndex !== -1) {
        state.commentList.splice(foundPostIndex, 1)
      }
    },
  },
  extraReducers(builder) {
    builder
      .addCase(getBook.pending, (state, action) => {
        state.loading = true
      })
      .addCase(getBook.fulfilled, (state, action) => {
        state.myBook = action.payload
        state.loading = false
      })
      .addCase(getBook.rejected, (state, action) => {
        state.loading = false
      })
  }
})

export const { postComment, postReply, deleteComment } = bookstoreSlice.actions

const bookstoreReducer = bookstoreSlice.reducer

export default bookstoreReducer