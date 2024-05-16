import { JohannaGif } from "@/assets";

function Info() {
  return (
    <main className="min-h-full flex flex-grow overflow-y-auto items-center justify-evenly gap-10 pt-4 md:mx-10 select-none flex-col md:flex-row">
      <div className="h-full flex flex-col items-start max-w-[500px] md:py-10">
        <h1 className="text-2xl mb-4 font-semibold text-[#f5ac19]">
          Sobre nós
        </h1>
        <p className="text-start font-light text-sm">
          A Johanna foi criada como parte de um projeto universitário.{" "}
        </p>
        <p className="text-start font-light text-sm pt-1">
          A intenção é ajudar pessoas interessadas no curso de psicologia e que
          têm dúvidas sobre ele. Nossa equipe trabalhou para fornecer dados
          suficientes para que a Johanna tenha resposta para todas as suas
          perguntas.
        </p>
        <p className="text-start font-light text-sm pt-2">
          Ela é uma aprendiz contínua. Portanto, sinta-se à vontade para
          ensiná-la a qualquer momento...
        </p>
        <p className="text-start font-light text-sm pt-2">
          A equipe é composta por 5 rapazes:
        </p>
        <p className="text-start font-light text-sm pt-1">
          Rodrigo - Principalmente responsável pelo backend deste projeto.
        </p>
        <p className="text-start font-light text-sm pt-1">
          Daniel - O cara que fez a interface que você está lendo.
        </p>
        <p className="text-start font-light text-sm pt-1">
          Pedro, Julio e Gustavo - Responsáveis pelas outras partes do projeto.
        </p>
        <p className="text-start font-light text-sm pt-2">
          No frontend, React Vite em TypeScript foi a escolha.
        </p>
        <p className="text-start font-light text-sm pt-1">
          O backend foi feito em Java e integra-se com o Fine-Tuning da Open AI
          e um banco de dados MySQL.
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
