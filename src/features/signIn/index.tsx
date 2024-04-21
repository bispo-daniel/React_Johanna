import React, { useState } from "react";
import { EyeOff2Outline, EyeOutline } from "@styled-icons/evaicons-outline";
import { Link } from "react-router-dom";
import InputMask from "react-input-mask";

function SignIn() {
  const [isFocused, setIsFocused] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isError, setIsError] = useState(false);
  const [password, setPassword] = useState("");
  const [formattedPhone, setFormattedPhone] = useState("");
  const [formattedDateOfBirth, setFormattedDateOfBirth] = useState("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setIsSuccess(false);
    setIsError(false);
    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
      setIsSuccess(true);
    }, 2000);
  };

  return (
    <div className="min-h-screen flex items-center justify-center select-none">
      <div className="p-8 rounded shadow-xl max-w-[450px] w-full bg-[#280c2a]">
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            className="block w-full border-b focus:border-[#f5ac19] transition-colors ease-linear duration-300 border-white bg-transparent mt-1 px-2 outline-none mb-2"
            placeholder="Nome"
            required
          />
          <input
            type="email"
            className="block w-full border-b focus:border-[#f5ac19] transition-colors ease-linear duration-300 border-white bg-transparent mt-1 px-2 outline-none mb-2"
            placeholder="Email"
            required
          />
          <InputMask
            mask="(99) 99999-9999"
            maskChar=""
            value={formattedPhone}
            onChange={(e) => setFormattedPhone(e.target.value)}
            className="block w-full border-b focus:border-[#f5ac19] transition-colors ease-linear duration-300 border-white bg-transparent mt-1 px-2 outline-none mb-2"
            placeholder="Celular"
            required
            type="text"
          />

          <div className="flex">
            {/* Select for days */}
            <select
              className="rounded  w-1/3 border-b focus:border-[#f5ac19] transition-colors ease-linear duration-300 border-white bg-transparent mt-1 px-2 outline-none mb-2 mr-2"
              required
            >
              <option value="">Dia</option>
              {[...Array(31).keys()].map((day) => (
                <option className="text-black" key={day + 1} value={day + 1}>
                  {day + 1}
                </option>
              ))}
            </select>

            {/* Select for months */}
            <select
              className="rounded  w-1/3 border-b focus:border-[#f5ac19] transition-colors ease-linear duration-300 border-white bg-transparent mt-1 px-2 outline-none mb-2 mr-2"
              required
            >
              <option value="">Mês</option>
              {[
                "Janeiro",
                "Fevereiro",
                "Março",
                "Abril",
                "Maio",
                "Junho",
                "Julho",
                "Agosto",
                "Setembro",
                "Outubro",
                "Novembro",
                "Dezembro",
              ].map((month, index) => (
                <option
                  className="text-black"
                  key={index + 1}
                  value={index + 1}
                >
                  {month}
                </option>
              ))}
            </select>

            {/* Select for years */}
            <select
              className="rounded  w-1/3 border-b focus:border-[#f5ac19] transition-colors ease-linear duration-300 border-white bg-transparent mt-1 px-2 outline-none mb-2"
              required
            >
              <option value="">Ano</option>
              {[...Array(71).keys()].map((year) => (
                <option
                  className="text-black"
                  key={year + 1950}
                  value={year + 1950}
                >
                  {year + 1950}
                </option>
              ))}
            </select>
          </div>
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
            {isLoading ? "Loading..." : "Sign In"}
          </button>
        </form>
        <div className="mt-4">
          <p>
            Já possui uma conta?{" "}
            <Link to="/login" className="text-[#f5ac19] hover:underline">
              Entrar
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

export default SignIn;
