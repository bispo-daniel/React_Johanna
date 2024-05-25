import { JohannaImg } from "@/assets";

function Users() {
  return (
    <main className="min-h-full flex flex-grow overflow-y-auto items-center justify-evenly gap-10 pt-4 md:mx-10 select-none flex-col md:flex-row">
      <img
        src={JohannaImg}
        alt=""
        className="rounded-full w-[250px] pb-4"
        style={{ zIndex: "999" }}
        draggable="false"
        loading="eager"
      />

      <img
        src={JohannaImg}
        alt=""
        className="rounded-full w-[250px] pb-4"
        style={{ zIndex: "999" }}
        draggable="false"
        loading="eager"
      />

      <img
        src={JohannaImg}
        alt=""
        className="rounded-full w-[250px] pb-4"
        style={{ zIndex: "999" }}
        draggable="false"
        loading="eager"
      />
    </main>
  );
}

export default Users;
