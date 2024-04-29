import { useTranslations } from "next-intl";

import Footer from "../components/Footer/Footer";
import Navbar from "../components/Navbar/Navbar";
import RegisterForm from "../components/Register/RegisterForm";

import "../../../styles/login.css";

const Register = () => {
  const loginIdioms = useTranslations("Login");
  return (
    <>
      <Navbar />
      <section className="grid grid-cols-2 items-center min-h-screen px-12 py-24 gap-12 bg-[url('/assets/images/imgLogin.png')] [background-size:100vw_100vh] bg-no-repeat bg-fixed">
        <h1 className="text-white text-4xl font-medium max-w-lg text-balance">
          {loginIdioms("login-title")}
        </h1>

        <div className="w-full bg-white flex flex-col py-4 px-12 rounded">
          <RegisterForm />
        </div>
      </section>
      <Footer />
    </>
  );
};

export default Register;
