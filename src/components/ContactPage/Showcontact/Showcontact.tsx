import { useState } from "react"
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "../../../Redux/ReduxStore";
import Contactcard from "../Contactcard/Contactcard";
import "./Showcontact.css"
import { deleteContact } from "../../../Redux/ContactSlice";

const useAppDispatch = () => useDispatch<AppDispatch>();
const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;  

const Showcontact = () => {
    const dispatch = useAppDispatch(); // creating dispatch instance.
    const [Filter ,setFilter] =useState(true)
    const contactList = useAppSelector((state) => state.contact.contactList);  // contactList contains the list of contacts
  return ( 
    <>
        <div className="contacts">
            <div className="selection">
                <button onClick={()=>{setFilter(true)}}>Active contacts</button>
                <button onClick={()=>{setFilter(false)}}>Inactive contacts</button>
            </div>
            <div className="grid">
            {
                contactList.map((val)=>(val.active==Filter) &&  <Contactcard onDelete={() => dispatch(deleteContact(val.id))} id={val.id} key={val.id} active={val.active} firstName={val.firstName} lastName={val.lastName}/>)
            }
            </div>
        </div>
    </>
  )
}

export default Showcontact