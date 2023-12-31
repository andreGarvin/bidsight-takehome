import {
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";

// components
import App from "components/App";

const queryClient = new QueryClient();

export default function() {
  return (
    <QueryClientProvider client={queryClient}>
      <App />
    </QueryClientProvider>
  );
}
