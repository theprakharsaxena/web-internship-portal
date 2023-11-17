import AxiosClient from "../AxiosClient";

export default async function updateBlog({ title, image, description, user }) {
  return AxiosClient.put(`/api/v1/blog/update-blog/${user}`, {
    title,
    image,
    description,
    user,
  }).then((res) => res.data);
}
