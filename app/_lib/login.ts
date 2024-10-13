import axiosInstance from "./axios";

const login = async (email: string, password: string) => {
  try {
    const response = await axiosInstance.post("login", {
      email,
      password,
    });
    console.log(response);
    // const { token } = response.data;
    // localStorage.setItem("token", token);
    // window.location.href = "/";
  } catch (error) {
    console.error("Login failed:", error);
  }
};

export default login;
