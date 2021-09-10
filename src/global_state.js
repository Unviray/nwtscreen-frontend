import { configureStore, createSlice } from '@reduxjs/toolkit'
import { ajaxMethod } from './utils'


export const pointerSlice = createSlice({
  name: 'pointer',
  initialState: {
    value: [],
    toScreen: undefined
  },
  reducers: {
    add: (state, action) => {
      let newPointers = state.value
      let existing = false

      for (let pointer of state.value) {
        if ((parseInt(action.payload.verset) === pointer.verset) &&
            (parseInt(action.payload.chapter) === pointer.chapter) &&
            (action.payload.book === pointer.book)) {
              existing = true
        }
      }

      if (!existing) {
        newPointers.push({
          book: action.payload.book,
          chapter: parseInt(action.payload.chapter),
          verset: parseInt(action.payload.verset)
        })
        state.value = newPointers
      }
    },
    remove: (state, action) => {
      const newValue = state.value.filter((value) => {
        return !(
          ((value.book) === action.payload.book) &&
          ((value.chapter) === action.payload.chapter) &&
          ((value.verset) === action.payload.verset)
        )
      })
      state.value = newValue
    },
    show: (state, action) => {
      state.toScreen = action.payload
      ajaxMethod("/screen", action.payload)
    },
    hide: (state) => {
      state.toScreen = undefined
      ajaxMethod("/clear-screen", {})
    }
  },
})


export default configureStore({
  reducer: {
    pointer: pointerSlice.reducer
  },
})


export const { add, remove, show, hide } = pointerSlice.actions

export const pointerSliceReducer = pointerSlice.reducer
