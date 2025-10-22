import { Play, Trash2, Plus } from 'lucide-react';
import { toast } from 'react-hot-toast';
import MainLayout from '../components/layout/MainLayout';

const MyList = ({ onNavigate, myList, onRemoveFromMyList, onPlayMovie }) => {

  const handleRemoveMovie = (movie) => {
    if (onRemoveFromMyList) {
      onRemoveFromMyList(movie.id);
    }
  };

  const handlePlayMovie = (movie) => {
    if (onPlayMovie) {
      onPlayMovie(movie);
    }
  };

  return (
    <MainLayout onNavigate={onNavigate}>
      <main className="min-h-screen bg-[#181A1C]">
        <div className="w-full max-w-[1920px] mx-auto">
          {/* Header Section */}
          <section className="px-4 sm:px-6 md:px-10 lg:px-16 xl:px-20 pt-8 pb-6">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div>
                <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-2">
                  Daftar Saya
                </h1>
                <p className="text-white/70 text-sm md:text-base">
                  {myList.length} film dalam daftar Anda
                </p>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-3">
                <button
                  onClick={() => onNavigate('home')}
                  className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-lg transition-colors duration-200 flex items-center gap-2"
                >
                  <Plus className="w-4 h-4" />
                  Tambah Film
                </button>

                {myList.length > 0 && (
                  <button
                    onClick={() => {
                      if (window.confirm('Hapus semua film dari daftar Anda?')) {
                        myList.forEach(movie => handleRemoveMovie(movie));
                        toast.success('Semua film telah dihapus dari daftar Anda');
                      }
                    }}
                    className="px-4 py-2 bg-red-600/20 hover:bg-red-600/30 text-red-400 text-sm font-medium rounded-lg border border-red-600/30 transition-colors duration-200 flex items-center gap-2"
                  >
                    <Trash2 className="w-4 h-4" />
                    Hapus Semua
                  </button>
                )}
              </div>
            </div>
          </section>

          {/* Movies Grid */}
          <section className="px-4 sm:px-6 md:px-10 lg:px-16 xl:px-20 pb-8">
            {myList.length === 0 ? (
              // Empty State
              <div className="flex flex-col items-center justify-center min-h-[400px] text-center">
                <div className="w-24 h-24 bg-white/10 rounded-full flex items-center justify-center mb-6">
                  <Play className="w-10 h-10 text-white/50" />
                </div>
                <h2 className="text-xl md:text-2xl font-bold text-white mb-2">
                  Daftar Anda Masih Kosong
                </h2>
                <p className="text-white/70 text-sm md:text-base mb-6 max-w-lg">
                  Mulai tambahkan film favorit Anda dengan menekan tombol dibawah ini.
                </p>
                <button
                  onClick={() => onNavigate('home')}
                  className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-colors duration-200"
                >
                  Jelajahi Film
                </button>
              </div>
            ) : (

              <div>
                {/* Custom Grid Layout for My List */}
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 md:gap-6">
                  {myList.map((movie, index) => (
                    <div key={movie.uniqueId || movie.id || index} className="flex flex-col">
                      <div className="relative group">
                        <div
                          className="relative w-full aspect-[2/3] rounded-xl overflow-hidden bg-neutral-900 cursor-pointer transition-all duration-300 transform-gpu hover:scale-105"
                          onClick={() => handlePlayMovie(movie)}
                        >
                          <img
                            src={movie.img}
                            alt={`${movie.title} poster`}
                            className="w-full h-full object-cover transition-all duration-300 hover:scale-110"
                            loading="lazy"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-transparent opacity-60" />

                          {/* Remove Button - Top Right */}
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              handleRemoveMovie(movie);
                            }}
                            className="absolute top-2 right-2 w-8 h-8 bg-black/70 hover:bg-red-600/90 rounded-full flex items-center justify-center transition-all duration-200 border border-white/20 opacity-0 group-hover:opacity-100"
                            aria-label="Remove from My List"
                          >
                            <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                          </button>

                          {/* Movie Info - Bottom */}
                          <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-black via-black/80 to-transparent">
                            <h3 className="text-white font-semibold text-sm line-clamp-2 mb-1">
                              {movie.title}
                            </h3>
                            <p className="text-white/70 text-xs">
                              {movie.genre} • {movie.year}
                            </p>
                          </div>

                          {/* Premium Badge */}
                          {movie.isPremium && (
                            <div className="absolute top-2 left-2">
                              <span className="px-2 py-1 bg-yellow-500 text-black text-xs font-bold rounded">
                                Premium
                              </span>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

              </div>
            )}
          </section>
        </div>
      </main>
    </MainLayout>
  );
};

export default MyList;