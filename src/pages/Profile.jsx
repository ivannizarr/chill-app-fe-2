import { useState } from 'react';
import { Megaphone, UploadCloud, Pencil, ChevronRight, User, Mail, Lock } from "lucide-react";
import { toast } from 'react-hot-toast';
import { useAuth } from '../context/AuthContext';
import MainLayout from '../components/layout/MainLayout';

function InputField({
  label,
  value,
  type = "text",
  icon: Icon,
  onEdit,
  isEditing,
  onChange
}) {
  return (
    <div className="mb-4">
      <label className="block text-sm text-white/80 mb-2">{label}</label>
      <div className="relative">
        <div className="absolute left-4 top-1/2 -translate-y-1/2 text-white/60">
          <Icon className="w-5 h-5" />
        </div>
        <input
          type={type}
          value={value}
          onChange={onChange}
          readOnly={!isEditing}
          className={`w-full rounded-xl bg-neutral-800/80 border border-neutral-700 focus:border-blue-500 outline-none text-white placeholder:text-neutral-400 pl-12 pr-12 py-4 transition ${
            isEditing ? 'ring-2 ring-blue-500/20' : ''
          }`}
        />
        <button
          onClick={onEdit}
          aria-label={`${isEditing ? 'Simpan' : 'Ubah'} ${label}`}
          className="absolute right-3 top-1/2 -translate-y-1/2 p-2 rounded-lg border border-white/20 text-white/90 hover:bg-white/10 transition-colors"
        >
          <Pencil className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}

function SubscriptionCard({ onSubscribe }) {
  return (
    <div className="rounded-2xl bg-neutral-800/80 border border-white/10 p-6 flex items-start gap-4 shadow-lg">
      <div className="mt-1 shrink-0">
        <div className="w-10 h-10 rounded-full bg-yellow-500/20 flex items-center justify-center border border-yellow-400/40">
          <Megaphone className="w-5 h-5 text-yellow-400" />
        </div>
      </div>
      <div className="flex-1">
        <h3 className="text-base font-semibold text-white mb-1">Saat ini anda belum berlangganan</h3>
        <p className="text-white/80 text-sm leading-relaxed">
          Dapatkan Akses Tak Terbatas ke Ribuan Film dan Series Kesukaan Kamu!
        </p>
        <button
          onClick={onSubscribe}
          className="mt-4 inline-flex items-center justify-center px-5 py-2 rounded-full bg-blue-600 hover:bg-blue-700 text-white font-medium transition-colors"
        >
          Mulai Berlangganan
        </button>
      </div>
    </div>
  );
}

function PosterCard({ movie, onClick }) {
  return (
    <div
      onClick={() => onClick(movie)}
      className="relative w-full aspect-[2/3] rounded-xl overflow-hidden bg-neutral-800 shadow-md hover:shadow-lg hover:scale-105 transition-all duration-300 cursor-pointer"
    >
      <img src={movie.img} alt={movie.title} className="w-full h-full object-cover" />
      {movie.isPremium && (
        <span className="absolute top-2 left-2 text-[10px] md:text-xs font-semibold bg-yellow-500 text-black px-2 py-0.5 rounded-md shadow">
          Premium
        </span>
      )}
      <div className="absolute bottom-0 left-0 right-0 p-2 bg-gradient-to-t from-black via-black/80 to-transparent">
        <h3 className="text-white font-semibold text-xs line-clamp-2">
          {movie.title}
        </h3>
      </div>
    </div>
  );
}

const Profile = ({ onNavigate, myList }) => {
  const { user, login } = useAuth();
  const [editingField, setEditingField] = useState(null);
  const [formData, setFormData] = useState({
    name: user?.name || 'William',
    email: user?.email || 'william1980@gmail.com',
    password: '**************'
  });

  const handleEdit = (field) => {
    if (editingField === field) {
      const updatedUser = {
        ...user,
        [field]: formData[field]
      };
      login(updatedUser);
      setEditingField(null);
      toast.success(`${field === 'name' ? 'Nama' : field === 'email' ? 'Email' : 'Password'} berhasil diubah!`);
    } else {
      setEditingField(field);
    }
  };

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubscribe = () => {
    toast.success('Fitur berlangganan akan segera hadir!');
  };

  const handleSaveAll = () => {
    const updatedUser = {
      ...user,
      ...formData
    };
    login(updatedUser);
    setEditingField(null);
    toast.success('Profil berhasil disimpan!');
  };

  return (
    <MainLayout onNavigate={onNavigate}>
      <main className="min-h-screen bg-[#181A1C] text-white">
        <div className="w-full max-w-[1920px] mx-auto px-4 sm:px-6 md:px-10 lg:px-16 xl:px-20 py-6 sm:py-8 md:py-10">
          <h1 className="hidden lg:block text-xl sm:text-2xl font-semibold mb-4 sm:mb-6">Profil Saya</h1>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8">
            {/* Subscription Card */}
            <aside className="lg:col-span-4 lg:order-2">
              <SubscriptionCard onSubscribe={handleSubscribe} />
            </aside>

            {/* Profile Form */}
            <section className="lg:col-span-8 lg:order-1">
              <h1 className="lg:hidden text-xl sm:text-2xl font-semibold mb-4 sm:mb-6">Profil Saya</h1>
              <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-5 mb-6">
                <div className="relative w-32 h-32">
                  <img
                    src={user?.avatar || "/Assets/img/avatar.png"}
                    alt={user?.name || "User"}
                    className="w-full h-full rounded-full object-cover border-4 border-white/10"
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <button
                    onClick={() => toast.info('Fitur ubah foto akan segera hadir!')}
                    className="px-4 py-2 rounded-full border border-blue-500 text-blue-400 hover:bg-blue-500/10 transition text-sm w-fit"
                  >
                    Ubah Foto
                  </button>
                  <div className="flex items-center gap-2 text-xs text-white/70">
                    <UploadCloud className="w-4 h-4" /> Maksimal 2MB
                  </div>
                </div>
              </div>

              <InputField
                label="Nama Pengguna"
                value={formData.name}
                icon={User}
                onEdit={() => handleEdit('name')}
                isEditing={editingField === 'name'}
                onChange={(e) => handleInputChange('name', e.target.value)}
              />

              <InputField
                label="Email"
                value={formData.email}
                type="email"
                icon={Mail}
                onEdit={() => handleEdit('email')}
                isEditing={editingField === 'email'}
                onChange={(e) => handleInputChange('email', e.target.value)}
              />

              <InputField
                label="Kata Sandi"
                value={editingField === 'password' ? formData.password : '**************'}
                type={editingField === 'password' ? 'text' : 'password'}
                icon={Lock}
                onEdit={() => handleEdit('password')}
                isEditing={editingField === 'password'}
                onChange={(e) => handleInputChange('password', e.target.value)}
              />

              <button
                onClick={handleSaveAll}
                className="mt-2 inline-flex items-center justify-center px-5 py-2.5 rounded-full bg-blue-600 hover:bg-blue-500 transition font-medium"
              >
                Simpan Semua
              </button>
            </section>
          </div>

          {/* List Section */}
          <section className="mt-8 sm:mt-10 md:mt-12">
            <div className="flex items-center justify-between mb-3 sm:mb-4">
              <h2 className="text-xl font-semibold">Daftar Saya</h2>
              <button
                onClick={() => onNavigate('mylist')}
                className="text-white/80 hover:text-white inline-flex items-center gap-1 text-sm transition-colors"
              >
                Lihat Semua <ChevronRight className="w-4 h-4" />
              </button>
            </div>

            {myList.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-white/60 mb-4">Belum ada film dalam daftar Anda</p>
                <button
                  onClick={() => onNavigate('home')}
                  className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
                >
                  Jelajahi Film
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3 md:gap-4 lg:gap-5">
                {myList.slice(0, 6).map((movie) => (
                  <PosterCard
                    key={movie.uniqueId || movie.id}
                    movie={movie}
                    onClick={() => {}}
                  />
                ))}
              </div>
            )}
          </section>
        </div>
      </main>
    </MainLayout>
  );
}

export default Profile;