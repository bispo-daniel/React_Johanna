import { JohannaImg } from "@/assets";
import { Link } from "react-router-dom";

function Home() {
  return (
    <main className="min-h-full flex flex-grow overflow-y-auto items-center justify-evenly gap-10 pt-4 md:mx-10 select-none flex-col md:flex-row">
      <div className="h-full flex flex-col items-start max-w-[500px] md:py-10">
        <h1 className="text-2xl mb-4 font-semibold text-[#f5ac19]">
          Conheça a Johanna
        </h1>
        <p className="text-start font-light text-sm">
          Criada com o intuito de ajudar pessoas com dúvidas em relação ao curso
          de{" "}
          <span className="transition-all hover:text-[#f5ac19] duration-300">
            PSICOLOGIA
          </span>
          , Johanna é mais que uma simples assistente virtual. Faça seu{" "}
          <Link
            to="/login"
            className="underline transition-all hover:text-[#f5ac19] duration-300"
          >
            cadastro
          </Link>{" "}
          e converse imediatamente com ela!
        </p>
      </div>

      <img
        src={JohannaImg}
        alt=""
        className="rounded-full w-[250px] pb-4"
        style={{ zIndex: "999" }}
        draggable="false"
      />
    </main>
  );
}

export default Home;
