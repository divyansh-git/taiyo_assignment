import Addcontact from "./Addcontact/Addcontact"
import Showcontact from "./Showcontact/Showcontact"
import "./ContactPage.css";
const ContactPage = () => {
  return (
    <div className="layout">  {/*This is divided into two sections, upper and lower using flexbox. */}
        <Addcontact/>         {/*Addcontacts Section allows adding contact using a form*/}
        <Showcontact/>        {/*Bottom Grid for showing the added contacts*/}
    </div>
  )
}

export default ContactPage