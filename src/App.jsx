import { useState } from 'react';
import { Toaster } from 'react-hot-toast';
import { AuthProvider } from './context/AuthContext';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';

function App() {
  const [currentPage, setCurrentPage] = useState('login');

  const renderPage = () => {
    switch (currentPage) {
      case 'login':
        return <Login onNavigate={setCurrentPage} />;
      case 'register':
        return <Register onNavigate={setCurrentPage} />;
      case 'home':
      default:
        return <Home onNavigate={setCurrentPage} />;
    }
  };

  return (
    <AuthProvider>
      <div className="App">
        {renderPage()}

        <Toaster
          position="top-right"
          toastOptions={{
            duration: 4000,
            style: {
              background: '#111111',
              color: '#ffffff',
              border: '1px solid #2E2E2E',
            },
            success: {
              iconTheme: {
                primary: '#0B63F6',
                secondary: '#ffffff',
              },
            },
            error: {
              iconTheme: {
                primary: '#F59E0B',
                secondary: '#ffffff',
              },
            },
          }}
        />
      </div>
    </AuthProvider>
  );
}

export default App;