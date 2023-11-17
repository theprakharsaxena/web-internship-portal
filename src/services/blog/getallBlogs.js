import AxiosClient from "../AxiosClient";

export default async function getallblogs() {
  return AxiosClient.get(`/api/v1/blog/all-blog`).then(
    (res) => res.data
  );
}
