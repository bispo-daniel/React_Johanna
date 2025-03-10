import { User, useUsersQuery } from "./api/getUsers";

function Users() {
  const { data: users, isFetching, isSuccess, isError } = useUsersQuery();

  const usersList = users || [];

  return (
    <main className="min-h-screen flex flex-grow flex-wrap overflow-y-auto items-center md:items-start justify-evenly gap-10 py-4 md:mx-12 select-none flex-col md:flex-row">
      <div className="grow shrink-0 w-full text-start pl-12">
        <h1 className="font-semibold text-[#f5ac19] text-2xl ">Usuários</h1>
      </div>
      {!isFetching &&
        isSuccess &&
        usersList.map(({ id, status, username, email, role }) => (
          <UserCard
            key={id}
            status={status}
            username={username}
            email={email}
            // age={age}
            // telephone={telephone}
            role={role}
          />
        ))}
      {isFetching && !isSuccess && (
        <>
          <Skeleton />
          <Skeleton />
          <Skeleton />
          <Skeleton />
          <Skeleton />
          <Skeleton />
          <Skeleton />
          <Skeleton />
        </>
      )}
      {!isFetching && !isSuccess && isError && <p>Ocorreu algum erro...</p>}
    </main>
  );
}

const UserCard: React.FC<Omit<User, "id" | "active" | "age" | "telephone">> = ({
  username,
  role,
  email,
  status,
}) => {
  const active = status === "ACTIVE";

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
        {/* <p className="text-sm indent-2">{age}y</p> */}
        <p className="text-sm indent-2">{email}</p>
        <p className="text-sm indent-2">
          {role === "ADMIN" ? "Administrador" : "Aluno"}
        </p>
      </div>
    </div>
  );
};

const Skeleton = () => {
  return (
    <div className="p-4 rounded-lg shadow-md bg-[#280C2A] relative w-[280px] h-[104px] border-none hover:scale-105 transition-all duration-300 animate-pulse">
      <div className="absolute top-0 right-0 shadow-2xl">
        <div
          className="w-10 h-[18px] shadow-2xl bg-gradient-to-r from-gray-700 to-gray-500"
          style={{
            clipPath: "polygon(100% 0, 100% 100%, 20% 100%, 0 0)",
            borderTopRightRadius: "8px",
          }}
        ></div>
      </div>

      <div className="text-white text-start flex flex-col gap-1">
        <span className="block font-semibold h-4 rounded-full bg-gradient-to-r from-gray-700 to-gray-500 w-48 mb-4"></span>
        <p className="h-3 rounded-full bg-gradient-to-r from-gray-700 to-gray-500 w-48 ml-2 mb-2"></p>
        <p className="h-3 rounded-full bg-gradient-to-r from-gray-700 to-gray-500 w-14 ml-2"></p>
      </div>
    </div>
  );
};

export default Users;
