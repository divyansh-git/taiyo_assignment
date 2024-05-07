import { useState } from "react";
import "./Contactcard.css"
import Editcontact from "../EditContact/EditContact";

interface Mycomponentprops{  
    firstName:string;
    lastName:string;
    id:string;
    active:boolean;
    onDelete: (id:string) => void;
}
const Contactcard:React.FC<Mycomponentprops> = (props) => {
    const {firstName,lastName,id,onDelete,active}=props;
    const [edit,setEdit]=useState<boolean>(false)
    const handleContactEdit=()=>{
        setEdit(true);
    }
    const handleContactDelete=()=>{
        onDelete(id);
    }

  return (
    <>
    {
        edit?
        <Editcontact first={firstName} last={lastName} act={active} ids={id} />:
    <div className="contact_card">
        <div className="names">
            <h3>{`First Name: ${firstName}`}</h3>
            <h3>{`Last Name: ${lastName}`}</h3>
        </div>
        <button onClick={handleContactEdit}>Edit</button>
        <button onClick={handleContactDelete}>Delete</button>
    </div>
    }
    </>
  )
}

export default Contactcard