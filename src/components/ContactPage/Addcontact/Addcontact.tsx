import { FormEvent, useState } from "react"
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { addNewBook } from "../../../Redux/ContactSlice";
import { RootState, AppDispatch } from "../../../Redux/ReduxStore";
import { v4 as uuidv4 } from 'uuid';
import './Addcontact.css'


const Addcontact = () => {
    const useAppDispatch = () => useDispatch<AppDispatch>();
    const dispatch = useAppDispatch();
    const [firstName,setFirstName] =useState<string>();
    const [lastName,setLastName] =useState<string>();
    const [active,setActive] =useState<boolean>();
    const handleFormSubmit=()=>{
        console.log(firstName,lastName)
        if(firstName && lastName && active )
        {
            const userData = {
                firstName,
                lastName,
                active,
                id: uuidv4(),
              };
              let oldData =
          JSON.parse(localStorage.getItem("userData") as string) || [];

        localStorage.setItem(
          "userData",
          JSON.stringify([...oldData, userData])
        );
        dispatch(addNewBook(userData));
        }
        else if(firstName==null)
          alert("Please enter the first name");
        else if(lastName ==null)
          alert("Please enter the last name");
        else if(active==null)
          alert("Please choose the contact status");
    }

  return (
    <div className="form_body">
        <form className="form" onSubmit={handleFormSubmit}>
            <p>Save Contact</p>
            <input value={firstName} placeholder="First Name" onChange={(e) => setFirstName(e.currentTarget.value)}/>
            <input value={lastName} placeholder="Last Name" onChange={(e) => setLastName(e.currentTarget.value)}/>
            <div className="radio">
                <div className="radio1">
                    <input id="option1" type="radio" value="Active" name="status" onChange={() => {setActive(true)}}/>
                    <label htmlFor="option1" > Active </label>
                </div>
                <div className="radio2">
                    <input id="option1" type="radio" value="Inactive" name="status" onChange={() => {setActive(false)}}/>
                    <label htmlFor="option2" > Inactive </label>
                </div>
            </div>
            <button type="submit">Save Contact</button>
        </form>
    </div>
  )
}

export default Addcontact