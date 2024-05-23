import axios from "axios"
import { useQuery } from "@tanstack/react-query";

export const fetchTopHeadlines = (param: any) => {
  return useQuery({
    queryKey: ["headlines", param],
    queryFn: async () => {
      const response = await axios.get(`${import.meta.env.VITE_API}/top-headlines`, {
        params: {
          ...param,
          apiKey: import.meta.env.VITE_API_KEY,
        },
      })
      return response.data.articles
    },
  })
}