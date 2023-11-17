import AxiosClient from "../AxiosClient";

export default async function signupapi({ username, email, password }) {
  return AxiosClient.post(`/api/v1/user/register`, {
    username,
    email,
    password,
  }).then((res) => res.data);
}
