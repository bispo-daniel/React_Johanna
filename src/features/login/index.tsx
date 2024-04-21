import React, { useState } from "react";
import { EyeOff2Outline, EyeOutline } from "@styled-icons/evaicons-outline";
import { Link } from "react-router-dom";

function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [isFocused, setIsFocused] = useState(false);

  // implement react-query
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isError, setIsError] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("handlesubmit has been called");

    setIsSuccess(false);
    setIsError(false);
    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
      setIsSuccess(true);
    }, 10000);
  };

  return (
    <div className="min-h-screen flex items-center justify-center select-none">
      <div className="p-8 rounded shadow-xl max-w-sm w-full bg-[#280c2a]">
        <form onSubmit={(e) => handleSubmit(e)}>
          <input
            type="email"
            className="block w-full border-b focus:border-[#f5ac19] transition-colors ease-linear duration-300 border-white bg-transparent mt-1 px-2 outline-none mb-2"
            placeholder="Email"
            required
          />
          <div
            className={
              "border-b w-full mb-8 flex items-center transition-colors ease-linear duration-300 " +
              `${isFocused ? "border-[#f5ac19] " : "border-white"}`
            }
          >
            <input
              type={showPassword ? "text" : "password"}
              className="block w-full border-none bg-transparent mt-1 px-2 outline-none"
              placeholder="Senha"
              required
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
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
            {isLoading ? "Loading..." : "Login"}
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
