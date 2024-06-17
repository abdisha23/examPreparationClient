export const base_url = "https://examprep-v33s.onrender.com/api/";

const getTokenFromLocalStorage = () => {
  const user = localStorage.getItem("user");
  return user ? JSON.parse(user).token : null;
};

export const config = {
  headers: {
    Authorization: `Bearer ${getTokenFromLocalStorage() || ""}`,
    Accept: "application/json",
    'Content-Type': 'multipart/form-data',
  },
};