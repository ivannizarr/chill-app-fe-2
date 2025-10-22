import { useState } from 'react';
import { toast } from 'react-hot-toast';
import { FcGoogle } from 'react-icons/fc';
import { Eye, EyeOff } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import Button from '../components/ui/Button';

const Login = ({ onNavigate }) => {
  const { login } = useAuth();
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.username || !formData.password) {
      toast.error('Username dan kata sandi harus diisi');
      return;
    }

    login({
      id: Date.now(),
      name: formData.username,
      username: formData.username,
      email: `${formData.username}@chill.com`
    });

    toast.success('Selamat datang kembali!');
    onNavigate('home');
  };

  const handleGoogleLogin = () => {
    login({
      id: Date.now(),
      name: 'Google User',
      username: 'googleuser',
      email: 'user@gmail.com'
    });

    toast.success('Login dengan Google berhasil!');
    onNavigate('home');
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center relative"
      style={{
        backgroundImage: 'url(/Assets/img/masuk.jpg)',
        backgroundSize: 'cover',
        backgroundPosition: 'center'
      }}
    >
      <div className="absolute inset-0 bg-black/20" />

      <div className="relative z-10 w-full max-w-md mx-4">
        <div className="bg-[#181A1CD6] backdrop-blur-md rounded-2xl p-8 shadow-2xl">
          <div className="text-center mb-8">
            <div className="flex items-center justify-center mb-4">
              <img src="/Assets/img/logo.svg" alt="CHILL" className="h-10" />
            </div>
            <h2 className="text-xl font-semibold text-white mb-2">Masuk</h2>
            <p className="text-gray-300 text-sm">Selamat datang kembali!</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-white text-sm font-medium mb-2">
                Username
              </label>
              <input
                type="text"
                name="username"
                placeholder="Masukkan username"
                value={formData.username}
                onChange={handleChange}
                className="w-full px-4 py-2 bg-transparent border border-gray-400 rounded-full text-white text-sm placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-white focus:border-transparent"
                required
              />
            </div>

            <div>
              <label className="block text-white text-sm font-medium mb-2">
                Kata Sandi
              </label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  placeholder="Masukkan kata sandi"
                  value={formData.password}
                  onChange={handleChange}
                  className="w-full px-4 py-2 pr-12 bg-transparent border border-gray-400 rounded-full text-white text-sm placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-white focus:border-transparent"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white"
                >
                  {showPassword ? (
                    <EyeOff className="w-5 h-5" />
                  ) : (
                    <Eye className="w-5 h-5" />
                  )}
                </button>
              </div>
            </div>

            <div className="flex justify-between items-center text-sm -mt-1">
              <span className="text-gray-300">
                Belum punya akun?
                <button
                  onClick={() => onNavigate('register')}
                  className="font-semibold text-gray-300 hover:text-white ml-1 underline"
                >
                  Daftar
                </button>
              </span>
              <button
                type="button"
                onClick={() => onNavigate('forgot')}
                className="text-gray-300 hover:text-white"
              >
                Lupa kata sandi?
              </button>
            </div>

            <div className="space-y-2">
              <Button
                type="submit"
                variant="primary"
                size="md"
                className="w-full !bg-[#3D4142] hover:!bg-gray-700 text-white text-sm"
              >
                Masuk
              </Button>

              <div className="text-center">
                <span className="text-gray-400 text-xs">Atau</span>
              </div>

              <Button
                type="button"
                onClick={handleGoogleLogin}
                variant="ghost"
                size="md"
                className="w-full flex items-center justify-center !bg-transparent border-[0.5px] border-gray-300 text-white hover:!bg-transparent text-sm"
              >
                <FcGoogle className="w-5 h-5 mr-2" />
                Masuk dengan Google
              </Button>
            </div>
          </form>

        </div>
      </div>
    </div>
  );
};

export default Login;