import { QueryClient } from "react-query";

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      // retry: false,
      // refetchOnWindowFocus: false,
      retry(failureCount: any, error: any) {
        return error.status === 401 && failureCount < 3;
      },
    },
  },
});
