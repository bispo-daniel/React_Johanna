import React, { ChangeEvent, useEffect, useState } from "react";
import { EyeOff2Outline, EyeOutline } from "@styled-icons/evaicons-outline";
import { Link, useNavigate, useLocation } from "react-router-dom";

import { useAuthentication, AuthType } from "./api/auth";
import { useAuth } from "@/auth-provider";

type LocationState = {
  email?: string;
  password?: string;
};

function Login() {
  const navigate = useNavigate();
  const location = useLocation();
  const state = location.state as LocationState;

  const [userAuth, setUserAuth] = useState<AuthType>({
    email: state?.email || "",
    password: state?.password || "",
  });

  const { saveTokens } = useAuth();

  const [shouldSendReq, setShouldSendReq] = useState(false);
  const {
    data: tokens,
    isError,
    isSuccess,
    isLoading,
  } = useAuthentication(shouldSendReq, userAuth);

  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    console.log(`shouldSendReq: ${shouldSendReq}`);

    setShouldSendReq(true);

    console.log(`shouldSendReq after set: ${shouldSendReq}`);
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setUserAuth((prevUserAuth) => ({
      ...prevUserAuth,
      [name]: value,
    }));
  };

  useEffect(() => {
    if (isSuccess && !isLoading && tokens && shouldSendReq) {
      const { accessToken, refreshToken } = tokens;

      saveTokens(accessToken, refreshToken);

      setShouldSendReq(false);

      setTimeout(() => {
        navigate("/chat");
      }, 1000);
    }
  }, [isSuccess, isLoading, tokens, navigate, saveTokens]);

  return (
    <div className="min-h-full flex items-center justify-center select-none">
      <div
        className="p-8 rounded shadow-xl max-w-sm w-full bg-[#280c2a]"
        style={{ zIndex: "999" }}
      >
        <form onSubmit={(e) => handleSubmit(e)}>
          <input
            name="email"
            value={userAuth.email}
            type="email"
            className="block w-full border-b focus:border-[#f5ac19] transition-colors ease-linear duration-300 border-white bg-transparent mt-1 px-2 outline-none mb-2"
            placeholder="Email"
            required
            onChange={handleInputChange}
          />
          <div className="focus-within:border-[#f5ac19] border-b w-full mb-8 flex items-center transition-colors ease-linear duration-300 ">
            <input
              name="password"
              value={userAuth.password}
              type={showPassword ? "text" : "password"}
              className="block w-full border-none bg-transparent mt-1 px-2 outline-none"
              placeholder="Senha"
              required
              onChange={handleInputChange}
            />
            {showPassword ? (
              <EyeOff2Outline
                onClick={() => setShowPassword(false)}
                size="20"
              />
            ) : (
              <EyeOutline onClick={() => setShowPassword(true)} size="20" />
            )}
          </div>
          <button
            type="submit"
            className="block w-full bg-white text-[#f5ac19] font-semibold py-2 rounded-md transition duration-300 ease-in-out hover:bg-[#f5ac19] hover:text-white"
          >
            {isLoading ? "Carregando..." : "Entrar"}
          </button>
        </form>
        <div className="mt-4">
          <p>
            Não tem uma conta?{" "}
            <Link to="/signIn" className="text-[#f5ac19] hover:underline">
              Criar
            </Link>
          </p>
        </div>
        {isLoading && (
          <div className="mt-4">
            <div className="progress-bar"></div>
          </div>
        )}
        {(isSuccess || isError) && (
          <div className="mt-4">
            <div
              className={
                "w-full h-[2px] rounded " +
                `${isSuccess ? "bg-[#198754]" : "bg-[#ED4337]"}`
              }
            />
          </div>
        )}
      </div>
    </div>
  );
}

export default Login;
