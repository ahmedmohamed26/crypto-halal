export const showToaster = (msg?: string, bg?: string) => {
  return (
    <div
      className=" fixed top-4 start-4 bg-green-500 text-white py-2 px-12 rounded-md shadow-lg text-center font-medium"
      style={{
        backgroundColor: bg === "red" ? "bg-red-500" : "bg-green-500",
      }}
    >
      {msg}
    </div>
  );
};
