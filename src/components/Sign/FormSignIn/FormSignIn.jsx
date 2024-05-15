import React from "react";
import LogoDefault from "../../../assets/svg/LogoDefault";
import RowInput from "../RowInput/RowInput";
// import Divider from "../Divider/Divider";
// import ButtonLogo from "../ButtonLogo/ButtonLogo";
// import GoogleIcon from "../../../assets/svg/GoogleIcon";
// import AppleIcon from "../../../assets/svg/AppleIcon";
import useForm from "../../../hooks/useForm";
import { useMyNotifs } from "../../../utilsComponents/Notif/useNotifs";
import useIdentity from "../../../hooks/useIdentity";
import "./FormSignIn.sass";

const FormSignIn = ({ handleSign = () => {} }) => {
  const { formData, handleInputForm } = useForm();
  const { addNotifs, notifs } = useMyNotifs();
  const { signIn } = useIdentity(addNotifs);

  const handleSubmit = async (e) => {
    e.preventDefault();
    let data = {
      ...formData,
      email: formData.email.trim(),
      password: formData.password.trim(),
    };
    signIn(data, "/", 1000);
  };
  return (
    <div className="sign_in_form">
      {notifs.map((notif) => notif)}
      <div className="logo">
        <LogoDefault />
      </div>
      <div className="title">Sign in</div>
      <div className="subtitle">Let's build up with us in this incredible journey.</div>
      <form action="" method="post" onSubmit={handleSubmit}>
        <RowInput title="Email" type="email" id="email" name="email" fullWidth onChange={handleInputForm} />
        <RowInput title="Password" type="password" id="password" name="password" fullWidth onChange={handleInputForm} />
        <div className="button">
          <button>Login</button>
        </div>

        <div className="sign_up_link">
          {/* <div className="text"> Want to log as a customer ?</div>
          <div
            className="link"
            onClick={() => {
              handleSign("client-login");
            }}
          >
            Go to customer .
          </div> */}
        </div>
      </form>
    </div>
  );
};

export default FormSignIn;
