import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Trials } from './Trials';

const queryClient = new QueryClient();

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <div className="flex flex-col space-y-4 p-24">
        <h1 className="text-3xl font-semibold">Clinical Trials</h1>
        <Trials />
      </div>
    </QueryClientProvider>
  );
};

export default App;
