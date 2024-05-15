import React from "react";
import LogoDefault from "../../../assets/svg/LogoDefault";
import useForm from "../../../hooks/useForm";
import { useMyNotifs } from "../../../utilsComponents/Notif/useNotifs";
import useIdentity from "../../../hooks/useIdentity";
import RowInput from "../RowInput/RowInput";
import "./FormSignIn.sass";

const FormSignInClient = ({ handleSign = () => {} }) => {
  const { formData, handleInputForm } = useForm();
  const { addNotifs, notifs } = useMyNotifs();
  const { signInClient } = useIdentity(addNotifs);

  const handleSubmit = async (e) => {
    e.preventDefault();
    //
    if (formData.numero == undefined) {
      addNotifs("error", "Fill up the num field");
      return;
    }
    //
    let data = {
      ...formData,
      numero: formData.numero.trim(),
    };
    signInClient(data, "/", 1000);
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
        <RowInput title="Numero" type="text" id="numero" name="numero" fullWidth onChange={handleInputForm} />
        <div className="button">
          <button>Login</button>
        </div>
        <div className="sign_up_link">
          {/* <div className="text"> Want to log as a admin ?</div>
          <div
            className="link"
            onClick={() => {
              handleSign("admin-login");
            }}
          >
            Go to admin .
          </div> */}
        </div>
      </form>
    </div>
  );
};

export default FormSignInClient;
