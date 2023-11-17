import AxiosClient from "../AxiosClient";

export default async function createBlog({ title, image, description, user }) {
  return AxiosClient.post(`/api/v1/blog/create-blog`, {
    title,
    image,
    description,
    user,
  }).then((res) => res.data);
}
