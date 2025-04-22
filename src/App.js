import { RouterProvider } from 'react-router-dom';
import './App.css';
import router from './routes/router';
import GlobalStyle from './globals/globalStyle';


function App() {
  return (
    <>
      <GlobalStyle />
      <RouterProvider router = {router} />
    </>
  );
}

export default App;
