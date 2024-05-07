import { useState } from "react"
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "../../../Redux/ReduxStore";
import Contactcard from "../Contactcard/Contactcard";
import "./Showcontact.css"
import { deleteBook } from "../../../Redux/ContactSlice";

const useAppDispatch = () => useDispatch<AppDispatch>();
const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

const Showcontact = () => {
    const dispatch = useAppDispatch();
    const [Filter ,setFilter] =useState(true)
    const bookList = useAppSelector((state) => state.book.bookList);
    // console.log(bookList);
  return (
    <>
        <div className="contacts">
            <div className="selection">
                <button onClick={()=>{setFilter(true)}}>Active contacts</button>
                <button onClick={()=>{setFilter(false)}}>Inactive contacts</button>
            </div>
            <div className="grid">
            {
                bookList.map((val)=>(val.active==Filter) &&  <Contactcard onDelete={() => dispatch(deleteBook(val.id))} id={val.id} key={val.id} active={val.active} firstName={val.firstName} lastName={val.lastName}/>)
            }
            </div>
        </div>
    </>
  )
}

export default Showcontact