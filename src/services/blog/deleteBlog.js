import AxiosClient from "../AxiosClient";

export default async function deleteBlog({id}) {
  return AxiosClient.delete(`/api/v1/blog/delete-blog/${id}`).then(
    (res) => res.data
  );
}
