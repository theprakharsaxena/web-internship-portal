import AxiosClient from "../AxiosClient";

export default async function getSingleBlog({id}) {
  return AxiosClient.get(`/api/v1/blog/get-blog/${id}`).then(
    (res) => res.data
  );
}
