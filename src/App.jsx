import { useState, useEffect, useRef } from 'react';
import { toast, Toaster } from 'react-hot-toast';
import { AuthProvider } from './context/AuthContext';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import MyList from './pages/MyList';
import Profile from './pages/Profile';

function App() {
  const [currentPage, setCurrentPage] = useState(() => {
    return localStorage.getItem('currentPage') || 'login';
  });
  const [myList, setMyList] = useState(() => {
    const saved = localStorage.getItem('myList');
    return saved ? JSON.parse(saved) : [];
  });
  const toastTimeoutRef = useRef(null);

  useEffect(() => {
    localStorage.setItem('currentPage', currentPage);
  }, [currentPage]);

  useEffect(() => {
    localStorage.setItem('myList', JSON.stringify(myList));
  }, [myList]);


  const addToMyList = (movie) => {
    const isAlreadyInList = myList.some(item => item.id === movie.id);

    if (isAlreadyInList) {
      toast.error('Film sudah ada di daftar Anda!');
      return;
    }

    const movieToAdd = {
      ...movie,
      addedAt: new Date().toISOString(),
      uniqueId: `mylist-${movie.id}-${Date.now()}`
    };

    setMyList(prevList => [movieToAdd, ...prevList]);
    toast.success(`${movie.title} ditambahkan ke Daftar Saya`);
  };

  const removeFromMyList = (movieId) => {
    setMyList(prevList => {
      const movie = prevList.find(item => item.id === movieId);
      const updatedList = prevList.filter(item => item.id !== movieId);

      if (movie) {
        if (toastTimeoutRef.current) {
          clearTimeout(toastTimeoutRef.current);
        }

        toastTimeoutRef.current = setTimeout(() => {
          toast.success(`${movie.title} dihapus dari Daftar Saya`);
        }, 10);
      }

      return updatedList;
    });
  };

  const clearMyList = () => {
    setMyList([]);
    toast.success('Semua film telah dihapus dari daftar Anda');
  };

  const renderPage = () => {
    console.log('Current page:', currentPage);
    switch (currentPage) {
      case 'login':
        return <Login onNavigate={setCurrentPage} />;
      case 'register':
        return <Register onNavigate={setCurrentPage} />;
      case 'mylist':
        return (
          <MyList
            onNavigate={setCurrentPage}
            myList={myList}
            onRemoveFromMyList={removeFromMyList}
            onClearMyList={clearMyList}
          />
        );
      case 'profile':
        return (
          <Profile
            onNavigate={setCurrentPage}
            myList={myList}
          />
        );
      case 'home':
      default:
        return (
          <Home
            onNavigate={setCurrentPage}
            myList={myList}
            onAddToMyList={addToMyList}
            onRemoveFromMyList={removeFromMyList}
          />
        );
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