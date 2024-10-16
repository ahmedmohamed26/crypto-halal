import axiosInstance from "./axios";
import { showToaster } from "./toasters";

const login = async (email: string, password: string) => {
  try {
    const response = await axiosInstance.post("login", {
      email,
      password,
    });

    const { token } = response.data.data;
    localStorage.setItem("token", token);
    window.location.href = "/";
  } catch (error: any) {
    showToaster(error.message, "red");
  }
};

export default login;
