import '@mantine/core/styles.css';
import { MantineProvider } from '@mantine/core';
import UrlShortenerForm from "./components/UrlShortenerForm";

function App() {

  return (
    <MantineProvider>
      <UrlShortenerForm />
    </MantineProvider>
  );
}

export default App
