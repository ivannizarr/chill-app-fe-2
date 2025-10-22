import { Play, Trash2, Plus, X } from 'lucide-react';
import MainLayout from '../components/layout/MainLayout';

const MyList = ({ onNavigate, myList, onRemoveFromMyList, onClearMyList }) => {

  const handleRemoveMovie = (movie) => {
    if (onRemoveFromMyList) {
      onRemoveFromMyList(movie.id);
    }
  };


  return (
    <MainLayout onNavigate={onNavigate}>
      <main className="min-h-screen bg-[#181A1C]">
        <div className="w-full max-w-[1920px] mx-auto">
          {/* Header Section */}
          <section className="px-4 sm:px-6 md:px-10 lg:px-16 xl:px-20 pt-8 pb-6">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              {/* Title */}
              <div>
                <h1 className="text-xl sm:text-2xl font-semibold mb-2">
                  Daftar Saya
                </h1>
                <p className="text-white/70 text-sm md:text-base">
                  {myList.length} film dalam daftar Anda
                </p>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-2 md:gap-3 flex-nowrap">
                <button
                  onClick={() => onNavigate('home')}
                  className="flex-1 md:flex-none min-w-0 px-3 md:px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-xs md:text-sm font-medium rounded-lg transition-colors duration-200 flex items-center justify-center gap-1 md:gap-2 whitespace-nowrap"
                >
                  <Plus className="w-3 h-3 md:w-4 md:h-4 flex-shrink-0" />
                  <span className="hidden md:inline">Tambah Film</span>
                  <span className="md:hidden">Tambah</span>
                </button>

                {myList.length > 0 && (
                  <button
                    onClick={() => {
                      if (window.confirm('Hapus semua film dari daftar Anda?')) {
                        onClearMyList();
                      }
                    }}
                    className="flex-1 md:flex-none min-w-0 px-3 md:px-4 py-2 bg-red-600/20 hover:bg-red-600/30 text-red-400 text-xs md:text-sm font-medium rounded-lg border border-red-600/30 transition-colors duration-200 flex items-center justify-center gap-1 md:gap-2 whitespace-nowrap"
                  >
                    <Trash2 className="w-3 h-3 md:w-4 md:h-4 flex-shrink-0" />
                    <span className="hidden md:inline">Hapus Semua</span>
                    <span className="md:hidden">Hapus</span>
                  </button>
                )}
              </div>
            </div>
          </section>

          {/* Movies Grid */}
          <section className="px-4 sm:px-6 md:px-10 lg:px-16 xl:px-20 pb-8">
            {myList.length === 0 ? (
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
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 md:gap-6">
                  {myList.map((movie, index) => (
                    <div key={movie.uniqueId || movie.id || index} className="flex flex-col">
                      <div className="relative group">
                        <div
                          className="relative w-full aspect-[2/3] rounded-xl overflow-hidden bg-neutral-900 transition-all duration-300 transform-gpu hover:scale-105"
                        >
                          <img
                            src={movie.img}
                            alt={`${movie.title} poster`}
                            className="w-full h-full object-cover transition-all duration-300 hover:scale-110"
                            loading="lazy"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-transparent opacity-60" />

                          {/* Remove Button - Centered */}
                          <div className="absolute inset-0 flex items-center justify-center z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                handleRemoveMovie(movie);
                              }}
                              className="w-12 h-12 bg-black/80 hover:bg-red-600/90 rounded-full flex items-center justify-center transition-all duration-200 border border-white/30"
                              aria-label="Remove from My List"
                            >
                              <X className="w-6 h-6 text-red-400" />
                            </button>
                          </div>

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