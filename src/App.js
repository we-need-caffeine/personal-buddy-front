import { RouterProvider } from "react-router-dom";
import "./App.css";
import router from "./routes/router";
import GlobalStyle from "./globals/globalStyle";
import { ThemeProvider } from "styled-components";
import theme from "./globals/theme";
import { ProfileCardProvider } from "./context/ProfileCardContext";
import { HeaderProvider } from "./context/HeaderContext";
import { ChatProvider } from "./context/ChatContext";
import { CalendarProvider } from "./context/CalendarContext";

function App() {
  return (
    <>
      <ThemeProvider theme={theme}>
        <GlobalStyle />
        <HeaderProvider>
          <ProfileCardProvider>
            <ChatProvider>
              <CalendarProvider>
                <RouterProvider router={router} />
              </CalendarProvider>
            </ChatProvider>
          </ProfileCardProvider>
        </HeaderProvider>
      </ThemeProvider>
    </>
  );
}

export default App;
