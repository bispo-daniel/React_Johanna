import { useState } from "react";

type User = {
  id: number;
  active: boolean;
  username: string;
  age: number;
  telephone: string;
  role: "ADMIN" | "ALUNO";
};

function Users() {
  const [users, _setUsers] = useState<User[]>([
    {
      id: 0,
      active: true,
      username: "Douglas",
      age: 19,
      telephone: "(11) 98445-3823",
      role: "ADMIN",
    },
    {
      id: 1,
      active: false,
      username: "Richard",
      age: 22,
      telephone: "(11) 93421-3328",
      role: "ALUNO",
    },
    {
      id: 2,
      active: true,
      username: "Eliano",
      age: 20,
      telephone: "(11) 98325-3812",
      role: "ADMIN",
    },
    {
      id: 3,
      active: true,
      username: "Alana",
      age: 24,
      telephone: "(11) 93445-1234",
      role: "ALUNO",
    },
    {
      id: 4,
      active: false,
      username: "Patricia",
      age: 37,
      telephone: "(11) 93245-3212",
      role: "ADMIN",
    },
    {
      id: 5,
      active: true,
      username: "Caroline",
      age: 43,
      telephone: "(11) 98432-3323",
      role: "ALUNO",
    },
    {
      id: 6,
      active: true,
      username: "Pedro",
      age: 33,
      telephone: "(11) 98423-5675",
      role: "ADMIN",
    },
    {
      id: 7,
      active: false,
      username: "Paulo",
      age: 23,
      telephone: "(11) 91222-3574",
      role: "ALUNO",
    },
    {
      id: 8,
      active: true,
      username: "Diogo",
      age: 45,
      telephone: "(11) 94211-0101",
      role: "ADMIN",
    },
    {
      id: 9,
      active: true,
      username: "Alice",
      age: 25,
      telephone: "(11) 92334-1233",
      role: "ALUNO",
    },
    {
      id: 10,
      active: false,
      username: "Igor",
      age: 17,
      telephone: "(11) 92211-3338",
      role: "ADMIN",
    },
    {
      id: 11,
      active: true,
      username: "Maria",
      age: 44,
      telephone: "(11) 91212-3012",
      role: "ALUNO",
    },
    {
      id: 12,
      active: true,
      username: "Joana",
      age: 23,
      telephone: "(11) 98231-3324",
      role: "ADMIN",
    },
    {
      id: 13,
      active: false,
      username: "Julia",
      age: 22,
      telephone: "(11) 98325-1152",
      role: "ALUNO",
    },
    {
      id: 14,
      active: true,
      username: "Renato",
      age: 18,
      telephone: "(11) 98844-2211",
      role: "ADMIN",
    },
  ]);

  return (
    <main className="min-h-full flex flex-grow flex-wrap overflow-y-auto items-center justify-evenly gap-10 py-4 md:mx-10 select-none flex-col md:flex-row">
      <div className="grow shrink-0 w-full text-start pl-12">
        <h1 className="font-semibold text-[#f5ac19] text-2xl ">Usuários</h1>
      </div>
      {users.map(({ id, active, username, age, telephone, role }) => (
        <UserCard
          key={id}
          active={active}
          username={username}
          age={age}
          telephone={telephone}
          role={role}
        />
      ))}
    </main>
  );
}

const UserCard: React.FC<Omit<User, "id">> = ({
  active,
  username,
  age,
  telephone,
  role,
}) => {
  return (
    <div className="p-4 rounded-lg shadow-md bg-[#280C2A] relative w-[280px] hover:scale-105 transition-all duration-300">
      <div className="absolute top-0 right-0 shadow-2xl">
        <div
          className={`w-10 h-[18px] shadow-2xl bg-gradient-to-r ${
            active ? "from-green-700 to-green-500" : "from-red-700 to-red-500"
          }`}
          style={{
            clipPath: "polygon(100% 0, 100% 100%, 20% 100%, 0 0)",
            borderTopRightRadius: "8px",
          }}
        ></div>
      </div>

      <div className="text-white text-start flex flex-col gap-1">
        <span className="block font-semibold">{username}</span>
        <p className="text-sm indent-2">{age}y</p>
        <p className="text-sm indent-2">{telephone}</p>
        <p className="text-sm indent-2">
          {role === "ADMIN" ? "Administrador" : "Aluno"}
        </p>
      </div>
    </div>
  );
};

export default Users;
