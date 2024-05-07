import { useState } from "react"
import { useDispatch } from "react-redux";
import { addNewContact } from "../../../Redux/ContactSlice";
import { AppDispatch } from "../../../Redux/ReduxStore";
import { v4 as uuidv4 } from 'uuid';
import './Addcontact.css'


const Addcontact = () => {
    const useAppDispatch = () => useDispatch<AppDispatch>();
    const dispatch = useAppDispatch();
    const [firstName,setFirstName] =useState<string>(""); // defining the state of first name field in the form
    const [lastName,setLastName] =useState<string>(""); // defining the state of last name field in the form
    const [active,setActive] =useState<boolean|null>(); // defining the active state in the form
    const handleFormSubmit=(e:React.FormEvent)=>{
        e.preventDefault(); 
        console.log(firstName,lastName,active)
        if(firstName && lastName && active!=null )  // checking for the valid input
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
        dispatch(addNewContact(userData));
        }
        else if(firstName=="")
          alert("Please enter the first name");
        else if(lastName =="")
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