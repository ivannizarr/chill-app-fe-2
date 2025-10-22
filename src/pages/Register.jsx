import { useState } from 'react';
import { toast } from 'react-hot-toast';
import { FcGoogle } from 'react-icons/fc';
import { Eye, EyeOff } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import Button from '../components/ui/Button';

const Register = ({ onNavigate }) => {
  const { register } = useAuth();
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    confirmPassword: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.username || !formData.password || !formData.confirmPassword) {
      toast.error('Semua field harus diisi');
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      toast.error('Password dan konfirmasi password tidak sama');
      return;
    }

    if (formData.password.length < 6) {
      toast.error('Password minimal 6 karakter');
      return;
    }

    register({
      id: Date.now(),
      name: formData.username,
      username: formData.username,
      email: `${formData.username}@chill.com`
    });

    toast.success('Akun berhasil dibuat! Selamat datang di CHILL!');
    onNavigate('home');
  };

  const handleGoogleRegister = () => {
    register({
      id: Date.now(),
      name: 'Google User',
      username: 'googleuser',
      email: 'user@gmail.com'
    });

    toast.success('Daftar dengan Google berhasil!');
    onNavigate('home');
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center relative"
      style={{
        backgroundImage: 'url(/Assets/img/daftar.jpg)',
        backgroundSize: 'cover',
        backgroundPosition: 'center'
      }}
    >
      <div className="absolute inset-0 bg-black/20" />

      <div className="relative z-10 w-full max-w-md mx-4">
        <div className="bg-[#181A1CD6] rounded-2xl p-8 shadow-2xl">
          <div className="text-center mb-8">
            <div className="flex items-center justify-center mb-4">
              <img src="/Assets/img/logo.svg" alt="CHILL" className="h-10" />
            </div>
            <h2 className="text-xl font-semibold text-white mb-2">Daftar</h2>
            <p className="text-gray-300 text-sm">Selamat datang!</p>
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
                className="w-full px-4 py-2 bg-transparent border border-gray-400 rounded-full text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-white focus:border-transparent"
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
                  className="w-full px-4 py-2 pr-12 bg-transparent border border-gray-400 rounded-full text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-white focus:border-transparent"
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

            <div>
              <label className="block text-white text-sm font-medium mb-2">
                Konfirmasi Kata Sandi
              </label>
              <div className="relative">
                <input
                  type={showConfirmPassword ? 'text' : 'password'}
                  name="confirmPassword"
                  placeholder="Masukkan kata sandi"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className="w-full px-4 py-2 pr-12 bg-transparent border border-gray-400 rounded-full text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-white focus:border-transparent"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white"
                >
                  {showConfirmPassword ? (
                    <EyeOff className="w-5 h-5" />
                  ) : (
                    <Eye className="w-5 h-5" />
                  )}
                </button>
              </div>
            </div>

            <div className="text-left text-sm -mt-1">
              <span className="text-gray-300">
                Sudah punya akun?
                <button
                  onClick={() => onNavigate('login')}
                  className="font-semibold text-gray-300 hover:text-white ml-1 underline"
                >
                  Masuk
                </button>
              </span>
            </div>

            <div className="space-y-2">
              <Button
                type="submit"
                variant="ghost"
                size="md"
                className="w-full bg-[#3D4142] hover:bg-gray-700 text-white text-sm"
              >
                Daftar
              </Button>

              <div className="text-center">
                <span className="text-gray-400 text-xs">Atau</span>
              </div>

              <Button
                type="button"
                onClick={handleGoogleRegister}
                variant="ghost"
                size="md"
                className="w-full flex items-center justify-center !bg-transparent border-[0.5px] border-gray-300 text-white hover:!bg-transparent text-sm"
              >
                <FcGoogle className="w-5 h-5 mr-2" />
                Daftar dengan Google
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;