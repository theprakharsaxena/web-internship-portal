import { useQuery } from "@tanstack/react-query";
import getallblogs from "../services/blog/getallBlogs";

export function useQueryGetAllBlogs() {
  const query = useQuery({
    queryKey: ["all-blogs"],
    queryFn: () => getallblogs(),
  });
  return query;
}
