import { ChangeEvent, ReactNode, useEffect, useState } from "react";
import { Trash, Key } from "@styled-icons/heroicons-outline";
import { ChangePasswordData, usePatchPasswordQuery } from "./api/patchPassword";
import { useAuth } from "@/auth-provider";
import { DeleteAccountData, useDeleteAccountQuery } from "./api/deleteAccount";
import { EyeOff2Outline, EyeOutline } from "styled-icons/evaicons-outline";

type View = "changePassword" | "deleteAccount";

function UserSettings() {
  const [activeView, setActiveView] = useState<View>("changePassword");

  const settingsOptions = [
    {
      title: "Trocar senha",
      icon: <Key size={16} />,
      view: "changePassword" as View,
    },
    {
      title: "Deletar conta",
      icon: <Trash size={16} />,
      view: "deleteAccount" as View,
    },
  ];

  return (
    <main className="min-h-full flex flex-grow overflow-y-auto items-center justify-evenly gap-10 pt-2 pb-4 md:mx-10 select-none flex-col flex-wrap">
      <h1 className="font-semibold text-[#f5ac19] text-2xl w-full text-start">
        Configurações
      </h1>

      <div className="flex flex-grow max-h-[450px] w-[700px] max-w-[90%] rounded">
        <nav className="border-r border-[#fff3] min-w-fit px-3 flex flex-col pt-3">
          {settingsOptions.map(({ title, icon, view }) => (
            <NavButton
              title={title}
              icon={icon}
              toggleView={() => setActiveView(view)}
              active={activeView === view}
            />
          ))}
        </nav>
        <div className="w-full h-full flex-grow flex flex-col items-center gap-4 justify-evenly p-4">
          {activeView === "changePassword" && <ChangePassword />}

          {activeView === "deleteAccount" && <DeleteAccount />}
        </div>
      </div>
    </main>
  );
}

const ChangePassword = () => {
  const [showPassword1, setShowPassword1] = useState(false);
  const [showPassword2, setShowPassword2] = useState(false);
  const [showPassword3, setShowPassword3] = useState(false);

  const [passwords, setPasswords] = useState<Omit<ChangePasswordData, "id">>({
    currentPassword: "",
    newPassword: "",
    newPasswordConfirmation: "",
  });

  const { user } = useAuth();
  const id = user?.id || "0";

  const [shouldCallHook, setShouldCallHook] = useState(false);
  const { isLoading, isSuccess, isError } = usePatchPasswordQuery(
    shouldCallHook,
    { id, ...passwords }
  );

  const [isPasswordVerified, setIsPasswordVerified] = useState(false);

  useEffect(() => {
    setIsPasswordVerified(
      passwords.newPasswordConfirmation === passwords.newPassword
    );
  }, [passwords.newPassword, passwords.newPasswordConfirmation]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    let { name, value } = e.target;

    setPasswords((prevPasswords) => ({
      ...prevPasswords,
      [name]: value,
    }));
  };

  const handleSubmit = () => {
    if (
      !passwords.currentPassword ||
      !passwords.newPassword ||
      !passwords.newPasswordConfirmation
    )
      return;

    setShouldCallHook(true);
  };

  return (
    <div className="w-full flex flex-col justify-center text-start">
      <p className="mb-4 font-semibold">Trocar senha</p>

      <p className="text-sm">
        Para trocar sua senha você deve digitar sua senha atual e sua nova senha
        duas vezes.
      </p>

      <div className="mt-2 w-full flex justify-center flex-col">
        <div className="focus-within:border-[#f5ac19] border-b w-full flex items-center transition-colors ease-linear duration-300">
          <input
            name="currentPassword"
            type={showPassword1 ? "text" : "password"}
            className="block w-full border-none bg-transparent mt-1 px-2 outline-none"
            placeholder="Digite a senha atual..."
            required
            onChange={handleChange}
          />
          {showPassword1 ? (
            <EyeOff2Outline onClick={() => setShowPassword1(false)} size="20" />
          ) : (
            <EyeOutline onClick={() => setShowPassword1(true)} size="20" />
          )}
        </div>
        <div className="w-full flex flex-col md:flex-row gap-2">
          <div className="focus-within:border-[#f5ac19] border-b w-full flex items-center transition-colors ease-linear duration-300">
            <input
              name="newPassword"
              type={showPassword2 ? "text" : "password"}
              className="block w-full border-none bg-transparent mt-1 px-2 outline-none"
              placeholder="Digite a nova senha..."
              required
              onChange={handleChange}
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
          <div className="focus-within:border-[#f5ac19] border-b w-full flex items-center transition-colors ease-linear duration-300">
            <input
              name="newPasswordConfirmation"
              type={showPassword3 ? "text" : "password"}
              className="block w-full border-none bg-transparent mt-1 px-2 outline-none"
              placeholder="Repita a nova senha..."
              required
              onChange={handleChange}
            />
            {showPassword3 ? (
              <EyeOff2Outline
                onClick={() => setShowPassword3(false)}
                size="20"
              />
            ) : (
              <EyeOutline onClick={() => setShowPassword3(true)} size="20" />
            )}
          </div>
        </div>

        {passwords.newPasswordConfirmation && (
          <div className="w-full flex justify-end mt-1">
            <span
              className={`text-xs ${
                isPasswordVerified ? "text-green-500" : "text-red-500"
              }`}
            >
              {isPasswordVerified
                ? "Senha são iguais!"
                : "Senhas são diferentes..."}
            </span>
          </div>
        )}
      </div>

      <button
        type="submit"
        className="block mt-6 w-full bg-white text-[#f5ac19] font-semibold py-1 rounded-md transition duration-300 ease-in-out hover:bg-[#f5ac19] hover:text-white"
        onClick={() => handleSubmit()}
      >
        Salvar
      </button>

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
  );
};

interface ButtonProps {
  title: string;
  icon: ReactNode;
  toggleView: () => void;
  active: boolean;
}

const NavButton = ({ title, icon, toggleView, active }: ButtonProps) => {
  const screenWidth = window.screen.availWidth;
  const isMobile = screenWidth < 768;

  return (
    <button
      className="text-sm px-2 py-1 hover:bg-[#fff1] rounded flex items-end"
      onClick={toggleView}
    >
      <span className={`${!isMobile && "pr-2"} ${active && "text-[#f5ac19]"}`}>
        {icon}
      </span>
      {!isMobile && <span className="hidden md:block">{title}</span>}
    </button>
  );
};

const DeleteAccount = () => {
  const [showPassword1, setShowPassword1] = useState(false);
  const [showPassword2, setShowPassword2] = useState(false);

  const [passwords, setPasswords] = useState<Omit<DeleteAccountData, "id">>({
    password: "",
    passwordConfirmation: "",
  });

  const { user } = useAuth();
  const id = user?.id || "0";

  const [shouldCallHook, setShouldCallHook] = useState(false);
  const { isLoading, isSuccess, isError } = useDeleteAccountQuery(
    shouldCallHook,
    { id, ...passwords }
  );

  const [isPasswordVerified, setIsPasswordVerified] = useState(false);

  useEffect(() => {
    setIsPasswordVerified(
      passwords.password === passwords.passwordConfirmation
    );
  }, [passwords.password, passwords.passwordConfirmation]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    let { name, value } = e.target;

    setPasswords((prevPasswords) => ({
      ...prevPasswords,
      [name]: value,
    }));
  };

  const handleSubmit = () => {
    if (!passwords.password || !passwords.passwordConfirmation) return;

    setShouldCallHook(true);
  };

  return (
    <div className="w-full flex flex-col justify-center text-start">
      <p className="mb-4 font-semibold">Deletar sua conta</p>

      <p className="text-sm">
        Para excluir sua conta você deve digitar sua senha e confirmar.
      </p>
      <p className="text-xs text-red-500 indent-4">
        • Sua conta será excluída permanentemente.
      </p>

      <p className="text-sm mt-2">Confirme a exclusão:</p>
      <div className="w-full flex flex-col md:flex-row gap-2">
        <div className="focus-within:border-[#f5ac19] border-b w-full flex items-center transition-colors ease-linear duration-300">
          <input
            name="password"
            type={showPassword1 ? "text" : "password"}
            className="block w-full border-none bg-transparent mt-1 px-2 outline-none"
            placeholder="Digite sua senha..."
            required
            onChange={handleChange}
          />
          {showPassword1 ? (
            <EyeOff2Outline onClick={() => setShowPassword1(false)} size="20" />
          ) : (
            <EyeOutline onClick={() => setShowPassword1(true)} size="20" />
          )}
        </div>

        <div className="focus-within:border-[#f5ac19] border-b w-full flex items-center transition-colors ease-linear duration-300">
          <input
            name="passwordConfirmation"
            type={showPassword2 ? "text" : "password"}
            className="block w-full border-none bg-transparent mt-1 px-2 outline-none"
            placeholder="Repita sua senha..."
            required
            onChange={handleChange}
          />
          {showPassword2 ? (
            <EyeOff2Outline onClick={() => setShowPassword2(false)} size="20" />
          ) : (
            <EyeOutline onClick={() => setShowPassword2(true)} size="20" />
          )}
        </div>
      </div>

      {passwords.passwordConfirmation && (
        <div className="w-full flex justify-end mt-1">
          <span
            className={`text-xs ${
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
        className="block mt-6 w-full bg-white text-[#f5ac19] font-semibold py-1 rounded-md transition duration-300 ease-in-out hover:bg-[#f5ac19] hover:text-white"
        onClick={() => handleSubmit()}
      >
        Deletar
      </button>

      {isLoading && (
        <div className="kkk mt-4">
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
  );
};

export default UserSettings;
