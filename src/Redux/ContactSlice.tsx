import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "./ReduxStore";
import type { PayloadAction } from "@reduxjs/toolkit";
import { ContactState } from "./type";

type initialStateType = {
  contactList: ContactState[];
};
const contactList: ContactState[] =
  JSON.parse(localStorage.getItem("userData") as string) ?? [];
const initialState: initialStateType = {
  contactList,
};
export const contactSlice = createSlice({
  name: "counter",
  initialState,
  reducers: {
    addNewContact: (state, action: PayloadAction<ContactState>) => {
      state.contactList?.push(action.payload);
    },
    updateContact: (state, action: PayloadAction<ContactState>) => {
      const {
        payload: { firstName, id, lastName,active },
      } = action;

      state.contactList = state.contactList.map((contact) =>
        contact.id === id ? { ...contact, firstName, lastName,active } : contact
      );
      localStorage.setItem("userData", JSON.stringify(state.contactList));
    },
    deleteContact: (state, action: PayloadAction<string>) => {
      const newArr = state.contactList.filter(
        (contact) => contact.id !== action.payload
      );
       localStorage.setItem("userData", JSON.stringify(newArr));
      state.contactList = newArr;
    },
  },
});
export const { addNewContact, updateContact, deleteContact } = contactSlice.actions;
export const selectcontactList = (state: RootState) => state.contact.contactList;
export default contactSlice.reducer;