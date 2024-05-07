import { useState } from "react"
import { useDispatch } from "react-redux";
import { updateContact } from "../../../Redux/ContactSlice";
import { AppDispatch } from "../../../Redux/ReduxStore";
import './EditContact.css'

interface Mycomponentprops{
    first:string;
    last:string;
    act:boolean;
    ids:string;
}

const Editcontact:React.FC<Mycomponentprops> = (props) => {
    const{first,last,act,ids}= props;
    const useAppDispatch = () => useDispatch<AppDispatch>();
    const dispatch = useAppDispatch();
    const [firstName,setFirstName] =useState<string>(first);
    const [lastName,setLastName] =useState<string>(last);
    const [active,setActive] =useState<boolean|undefined>(act);
    const handleFormEditSubmit=()=>{
        console.log(firstName,lastName)
        if(firstName && lastName )
        {
            dispatch(updateContact({ firstName, lastName, id: ids,active }));
        }
    }

  return (
    <div className="form_body">
        <form className="form" onSubmit={handleFormEditSubmit}>
            <p>Edit Contact</p>
            <input value={firstName} placeholder="First Name" onChange={(e) => setFirstName(e.currentTarget.value)}/>
            <input value={lastName} placeholder="Last Name" onChange={(e) => setLastName(e.currentTarget.value)}/>
            <div className="radio">
                <div className="radio1">
                    {act?<input defaultChecked id="option1" type="radio" value="Active" name="status" onChange={() => {setActive(true)}}/>:<input id="option1" type="radio" value="Active" name="status" onChange={() => {setActive(true)}}/>}
                    <label htmlFor="option1" > Active </label>
                </div>
                <div className="radio2">
                    {!act?<input defaultChecked id="option1" type="radio" value="Inactive" name="status" onChange={() => {setActive(false)}}/>:<input id="option1" type="radio" value="Inactive" name="status" onChange={() => {setActive(false)}}/>}
                    <label htmlFor="option2" > Inactive </label>
                </div>
            </div>
            <button type="submit">Save Contact</button>
        </form>
    </div>
  )
}

export default Editcontact