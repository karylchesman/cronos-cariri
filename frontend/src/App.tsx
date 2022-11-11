import { BrowserRouter } from "react-router-dom";
import { ThemeProvider } from 'styled-components';
import GlobalStyles from './styles/global';
import { AppContextProvider } from "./context/AppContextProvider";
import AppRoutes from './routes';
import { light } from './styles/themes/light';

function App() {
  return (
    <ThemeProvider theme={light}>
      <BrowserRouter>
        <AppContextProvider>
          <AppRoutes />
        </AppContextProvider>
      </BrowserRouter>
      <GlobalStyles />
    </ThemeProvider>
  );
}

export default App;
