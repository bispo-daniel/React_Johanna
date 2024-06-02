import { ChangeEvent, ReactNode, useEffect, useState } from "react";
import { Trash, Key } from "@styled-icons/heroicons-outline";

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
    <main className="user-settings min-h-screen flex flex-grow flex-wrap overflow-y-auto items-center justify-evenly gap-10 py-4 md:mx-12 select-none flex-col">
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
  const [passwords, setPasswords] = useState({
    currentPassword: "",
    newPassword: "",
    newPasswordConfirmation: "",
  });

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

  return (
    <div className="w-full flex flex-col justify-center text-start">
      <p className="mb-4 font-semibold">Trocar senha</p>

      <div className="w-full flex justify-center flex-col">
        <input
          name="currentPassword"
          type="text"
          className="block w-full border-b focus:border-[#f5ac19] transition-colors ease-linear duration-300 border-white bg-transparent mt-1 px-2 outline-none mb-2"
          placeholder="Digite a senha atual..."
          required
          onChange={handleChange}
        />
        <div className="w-full flex flex-col md:flex-row gap-2">
          <input
            name="newPassword"
            type="text"
            className="block w-full border-b focus:border-[#f5ac19] transition-colors ease-linear duration-300 border-white bg-transparent mt-1 px-2 outline-none mb-2"
            placeholder="Digite a nova senha..."
            required
            onChange={handleChange}
          />
          <input
            name="newPasswordConfirmation"
            type="text"
            className="block w-full border-b focus:border-[#f5ac19] transition-colors ease-linear duration-300 border-white bg-transparent mt-1 px-2 outline-none mb-2"
            placeholder="Repita a nova senha..."
            required
            onChange={handleChange}
          />
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
      >
        Salvar
      </button>
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
      <span className={`${!isMobile && "pr-2"} ${active && "text-[#f5ac19]"}`}>{icon}</span>
      {!isMobile && <span className="hidden md:block">{title}</span>}
    </button>
  );
};

const DeleteAccount = () => {
  return (
    <div className="flex flex-col mr-2 flex-grow w-full items-start">
      <p className="mb-4 font-semibold">Deletar sua conta</p>

      <p className="text-sm">
        Para excluir sua conta você deve digitar sua senha e confirmar.
      </p>
      <p className="text-xs text-red-500 indent-4">
        • Sua conta será excluída permanentemente.
      </p>

      <button
        type="submit"
        className="block mt-6 w-full bg-white text-[#f5ac19] font-semibold py-1 rounded-md transition duration-300 ease-in-out hover:bg-[#f5ac19] hover:text-white"
      >
        Deletar
      </button>
    </div>
  );
};

export default UserSettings;
