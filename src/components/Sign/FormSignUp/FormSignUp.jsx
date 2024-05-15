import LogoDefault from "../../../assets/svg/LogoDefault";
import RowInput from "../RowInput/RowInput";
import UseHandleForm from "./UseHandleForm";
import { FormSignUpData } from "./formData";
import Select from "../../../utilsComponents/Select/Select";
import useIdentity from "../../../hooks/useIdentity";
import { useMyNotifs } from "../../../utilsComponents/Notif/useNotifs";
import "./FormSignUp.sass";

function isValidEmail(email) {
  // Regular expression for validating email addresses
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

const FormSignUp = ({ handleSign = () => {} }) => {
  const { addNotifs, notifs } = useMyNotifs();
  const { signUp } = useIdentity(addNotifs);
  const maxStep = 2;
  //
  const handleSubmit = (formData) => {
    if (
      formData.firstname + "" === "" ||
      formData.lastname + "" === "" ||
      formData.firstname === undefined ||
      formData.lastname === undefined
    ) {
      addNotifs("error", "Please, fill up all fields");
      return false;
    }
    signUp(formData, "/", 5000);
  };

  const validEmailAndPassword = (formData) => {
    const passwordLength = 4;
    if (!isValidEmail(formData.email)) {
      addNotifs("error", "Email not valid");
      return false;
    }
    if ((formData.password + "").length < passwordLength) {
      addNotifs("error", "Password need to be upper 3  letter minimum");
      return false;
    }
    return true;
  };

  const { formData, moveStep, handleForm, handleInputForm, step } = UseHandleForm(FormSignUpData.length, [
    validEmailAndPassword,
    handleSubmit,
  ]);

  return (
    <div className="sign_up_form">
      {notifs.map((notif) => notif)}
      <div className="logo">
        <LogoDefault />
      </div>
      <div className="title">Sign up</div>
      <div className="subtitle">Come with us to build an incredible journey.</div>
      <div className="slider">
        {[...Array(FormSignUpData.length).keys()].map((d, k) => (
          <div
            className={`slide ${step === d + 1 ? "slide_on" : ""}`}
            key={d}
            onClick={() => {
              moveStep(d + 1);
            }}
          ></div>
        ))}
      </div>
      <form action="" method="post" onSubmit={handleForm}>
        {FormSignUpData.map((row, k) => {
          return k + 1 === step
            ? row.inputs.map((input, k_input) => {
                return input.component === "input" ? (
                  <RowInput {...input} key={k_input} value={formData[input.name]} id={input.name} onChange={handleInputForm} />
                ) : (
                  <Select {...input} key={k_input} onChange={handleInputForm} id={input.name} />
                );
              })
            : "";
        })}
        <div className="button">
          <button> {step === maxStep ? "Validate " : "Next "} </button>
        </div>

        <div className="sign_up_link">
          {/* <div className="text">Already have an account ?</div>
          <div className="link" onClick={handleSign}>
            Sign in.
          </div> */}
        </div>
      </form>
    </div>
  );
};

export default FormSignUp;
