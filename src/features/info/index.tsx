import { JohannaGif } from "@/assets";

function Info() {
  return (
    <main className="min-h-full flex flex-grow overflow-y-auto items-center justify-evenly gap-10 pt-4 md:mx-10 select-none flex-col md:flex-row">
      <div className="h-full flex flex-col items-start max-w-[500px] md:py-10">
        <h1 className="text-2xl mb-4 font-semibold text-[#f5ac19]">Sobre</h1>
        <p className="text-start font-light text-sm">
          Johanna foi desenvolvida como parte de um projeto universitário para
          auxiliar pessoas interessadas no curso de psicologia da UniDrummond e
          que possuem dúvidas sobre ele.
        </p>
        <p className="text-start font-light text-sm pt-1">
          Nossa equipe trabalhou para fornecer dados suficientes para que
          Johanna tenha respostas para todas as perguntas, inclusive aquelas
          relacionadas à instituição de ensino.
        </p>
        <p className="text-start font-light text-sm pt-2">
          Ela é uma aprendiz contínua, então sinta-se à vontade para ensiná-la a
          qualquer momento.
        </p>
        <p className="text-start font-light text-sm pt-2">
          Em relação ao website:
        </p>
        <p className="text-start font-light text-sm pt-2">
          No frontend, foi escolhido React Vite em TypeScript.
        </p>
        <p className="text-start font-light text-sm pt-1">
          O backend foi dividido em duas partes:
        </p>
        <p className="text-start font-light text-sm pt-1">
          Uma API REST em Java, responsável pela autenticação e manipulação dos
          usuários.
        </p>
        <p className="text-start font-light text-sm pt-1">
          Uma API WEB SOCKET em NodeJS, que integra a API da OpenAI e entrega
          respostas instantâneas para o cliente.
        </p>
        <p className="text-start font-light text-sm pt-1">
          Para armazenar todos os dados relevantes à aplicação, foi utilizado um
          banco de dados MySQL.
        </p>
      </div>

      <img
        src={JohannaGif}
        className="rounded-full w-[250px] mb-8 md:mb-0"
        style={{ zIndex: "999" }}
        draggable="false"
        loading="eager"
      />
    </main>
  );
}

export default Info;
