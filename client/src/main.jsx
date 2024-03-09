import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import theme from "./theme.js";
import { BrowserRouter } from 'react-router-dom'
import { ThemeProvider } from '@mui/material'
import AuthProvider from './providers/AuthProvider.jsx'
import NotificationProvider from './providers/NotificationProvider.jsx';
import MusicProvider from './providers/MusicProvider.jsx';
import SocketProvider from './providers/SocketProvider.jsx';
import CheckoutModalProvider from './providers/CheckoutModalProvider.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <ThemeProvider theme={theme}>
      <AuthProvider>
        <NotificationProvider>
          <MusicProvider>
            <SocketProvider>
              <CheckoutModalProvider>
                <App />
              </CheckoutModalProvider>
            </SocketProvider>
          </MusicProvider>
        </NotificationProvider>
      </AuthProvider>
    </ThemeProvider>
  </BrowserRouter>
)
