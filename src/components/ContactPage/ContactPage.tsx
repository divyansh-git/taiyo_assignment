import Addcontact from "./Addcontact/Addcontact"
import Showcontact from "./Showcontact/Showcontact"
import "./ContactPage.css";
const ContactPage = () => {
  return (
    <div className="layout">
        <Addcontact/>
        <Showcontact/>
    </div>
  )
}

export default ContactPage