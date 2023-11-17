import axios from "axios";

export default async function uploadImage({ cloudName, tempFormData }) {
  const formData = tempFormData;
  return axios
    .post(`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`, formData)
    .then((res) => res.data);
}
