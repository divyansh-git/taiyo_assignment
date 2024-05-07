import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "./ReduxStore";
import type { PayloadAction } from "@reduxjs/toolkit";
import { BookState } from "./type";

type initialStateType = {
  bookList: BookState[];
};
const bookList: BookState[] =
  JSON.parse(localStorage.getItem("userData") as string) ?? [];
const initialState: initialStateType = {
  bookList,
};
export const bookSlice = createSlice({
  name: "counter",
  initialState,
  reducers: {
    addNewBook: (state, action: PayloadAction<BookState>) => {
      state.bookList?.push(action.payload);
    },
    updateBook: (state, action: PayloadAction<BookState>) => {
      const {
        payload: { firstName, id, lastName,active },
      } = action;

      state.bookList = state.bookList.map((book) =>
        book.id === id ? { ...book, firstName, lastName,active } : book
      );
      localStorage.setItem("userData", JSON.stringify(state.bookList));
    },
    deleteBook: (state, action: PayloadAction<string>) => {
      const newArr = state.bookList.filter(
        (book) => book.id !== action.payload
      );
       localStorage.setItem("userData", JSON.stringify(newArr));
      state.bookList = newArr;
    },
  },
});
export const { addNewBook, updateBook, deleteBook } = bookSlice.actions;
export const selectBookList = (state: RootState) => state.book.bookList;
export default bookSlice.reducer;