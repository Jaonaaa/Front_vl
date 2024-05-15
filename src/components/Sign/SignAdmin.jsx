import React, { useEffect, useState } from "react";
import FormSignIn from "./FormSignIn/FormSignIn";
import FormSignUp from "./FormSignUp/FormSignUp";
import { motion } from "framer-motion";
import { getUserPresp } from "../../hooks/useIdentity";
import { useNavigate } from "react-router-dom";
import { alaivoGet } from "../../utils/Alaivo";
import "./Sign.sass";
import FormSignInClient from "./FormSignIn/FormSignInClient";

const loginVariants = {
  initial: {
    opacity: 0,
    y: 50,
  },
  animate: {
    opacity: 1,
    y: 0,
    transition: {
      opacity: {
        delay: 0.18,
      },
      duration: 0.18,
      delayChildren: 1,
      ease: "easeInOut",
    },
  },
  exit: {
    opacity: 0,
  },
};

const SignAdmin = () => {
  const [login, setLogin] = useState("admin-login");
  const nav = useNavigate();

  useEffect(() => {
    if (getUserPresp() !== undefined) nav("/");
  }, []);

  const handleSign = (log) => {
    setLogin(log);
  };

  return (
    <motion.div id="sign_container" variants={loginVariants} initial="initial" animate="animate" exit="exit">
      {login === "admin-login" && <FormSignIn handleSign={handleSign} />}
    </motion.div>
  );
};

export default SignAdmin;
