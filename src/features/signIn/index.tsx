import React, { ChangeEvent, useEffect, useState } from "react";
import { EyeOff2Outline, EyeOutline } from "@styled-icons/evaicons-outline";
import { Link, useNavigate } from "react-router-dom";
import InputMask from "react-input-mask";
import { useCreateUserQuery, CreateUserType } from "./api/postUser";

function SignIn() {
  const [shouldCallHook, setShouldCallHook] = useState(false);
  const [user, setUser] = useState<CreateUserType>({
    email: "",
    password: "",
    username: "",
    telephone: "",
    dataDeNascimento: "",
  });

  const { isLoading, isSuccess, isError } = useCreateUserQuery(
    shouldCallHook,
    user
  );

  const [isPassInputFocused1, setIsPassInputFocused1] = useState(false);
  const [isPassInputFocused2, setIsPassInputFocused2] = useState(false);

  const [showPassword1, setShowPassword1] = useState(false);
  const [showPassword2, setShowPassword2] = useState(false);

  const [verificationPassword, setVerificationPassword] = useState("");
  const [isPasswordVerified, setIsPasswordVerified] = useState(false);

  useEffect(() => {
    setIsPasswordVerified(verificationPassword === user.password);
  }, [verificationPassword, user.password]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!isPasswordVerified) return;

    handleDateChange();

    setShouldCallHook(true);
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  };

  const [day, setDay] = useState("");
  const [month, setMonth] = useState("");
  const [year, setYear] = useState("");

  const handleDateChange = () => {
    const formattedDate = `${day.padStart(2, "0")}/${month.padStart(
      2,
      "0"
    )}/${year}`;
    setUser((prevUser) => ({
      ...prevUser,
      dataDeNascimento: formattedDate,
    }));
  };

  useEffect(() => {
    if (!isLoading) {
      setShouldCallHook(false);
    }
  }, [isLoading]);

  const navigate = useNavigate();

  useEffect(() => {
    if (isSuccess)
      setTimeout(() => {
        navigate("/login");
      }, 1000);
  }, [isSuccess]);

  return (
    <div className="min-h-full flex items-center justify-center select-none">
      <div className="p-8 rounded shadow-xl max-w-[450px] w-full bg-[#280c2a]">
        <form onSubmit={handleSubmit}>
          <input
            name="username"
            type="text"
            className="block w-full border-b focus:border-[#f5ac19] transition-colors ease-linear duration-300 border-white bg-transparent mt-1 px-2 outline-none mb-2"
            placeholder="Nome"
            required
            onChange={handleChange}
          />
          <input
            name="email"
            type="email"
            className="block w-full border-b focus:border-[#f5ac19] transition-colors ease-linear duration-300 border-white bg-transparent mt-1 px-2 outline-none mb-2"
            placeholder="Email"
            required
            onChange={handleChange}
          />
          <InputMask
            name="telephone"
            type="text"
            mask="(99) 99999-9999"
            maskChar=""
            className="block w-full border-b focus:border-[#f5ac19] transition-colors ease-linear duration-300 border-white bg-transparent mt-1 px-2 outline-none mb-2"
            placeholder="Celular"
            required
            onChange={handleChange}
          />

          <div className="flex">
            {/* Select for days */}
            <select
              className="rounded  w-1/3 border-b focus:border-[#f5ac19] transition-colors ease-linear duration-300 border-white bg-transparent mt-1 px-2 outline-none mb-2 mr-2"
              required
              onChange={(e) => setDay(e.target.value)}
            >
              <option value="" className="hidden">
                Dia
              </option>
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
              onChange={(e) => setMonth(e.target.value)}
            >
              <option value="" className="hidden">
                Mês
              </option>
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
              onChange={(e) => setYear(e.target.value)}
            >
              <option value="" className="hidden">
                Ano
              </option>
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
              "border-b w-full mb-2 flex items-center transition-colors ease-linear duration-300 " +
              `${isPassInputFocused1 ? "border-[#f5ac19] " : "border-white"}`
            }
          >
            <input
              name="password"
              type={showPassword1 ? "text" : "password"}
              className="block w-full border-none bg-transparent mt-1 px-2 outline-none"
              placeholder="Senha"
              required
              onFocus={() => setIsPassInputFocused1(true)}
              onBlur={() => setIsPassInputFocused1(false)}
              onChange={handleChange}
            />
            {showPassword1 ? (
              <EyeOff2Outline
                onClick={() => setShowPassword1(false)}
                size="20"
              />
            ) : (
              <EyeOutline onClick={() => setShowPassword1(true)} size="20" />
            )}
          </div>

          <div
            className={
              "border-b w-full flex items-center transition-colors ease-linear duration-300 " +
              `${isPassInputFocused2 ? "border-[#f5ac19] " : "border-white"}`
            }
          >
            <input
              type={showPassword2 ? "text" : "password"}
              className="block w-full border-none bg-transparent mt-1 px-2 outline-none"
              placeholder="Repita a Senha"
              required
              onFocus={() => setIsPassInputFocused2(true)}
              onBlur={() => setIsPassInputFocused2(false)}
              onChange={(e) => setVerificationPassword(e.target.value)}
            />
            {showPassword2 ? (
              <EyeOff2Outline
                onClick={() => setShowPassword2(false)}
                size="20"
              />
            ) : (
              <EyeOutline onClick={() => setShowPassword2(true)} size="20" />
            )}
          </div>

          {verificationPassword && (
            <div className="w-full flex justify-end mt-1">
              <span
                className={`text-[12px] ${
                  isPasswordVerified ? "text-green-500" : "text-red-500"
                }`}
              >
                {isPasswordVerified
                  ? "Senha são iguais!"
                  : "Senhas são diferentes..."}
              </span>
            </div>
          )}

          <button
            type="submit"
            className="block mt-6 w-full bg-white text-[#f5ac19] font-semibold py-2 rounded-md transition duration-300 ease-in-out hover:bg-[#f5ac19] hover:text-white"
          >
            {isLoading ? "Carregando..." : "Cadastrar"}
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
