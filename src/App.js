import { RouterProvider } from 'react-router-dom';
import './App.css';
import router from './routes/router';
import GlobalStyle from './globals/globalStyle';
import { ThemeProvider } from 'styled-components';
import theme from './globals/theme';


function App() {
  return (
    <>
      <ThemeProvider theme={theme}>
        <GlobalStyle />
        <RouterProvider router = {router} />
      </ThemeProvider>
    </>
  );
}

export default App;
