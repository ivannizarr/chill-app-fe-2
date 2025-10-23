import { Info } from 'lucide-react';
import { IoMdVolumeHigh } from 'react-icons/io';
import MainLayout from '../components/layout/MainLayout';
import MovieSection from '../components/layout/MovieSection';
import moviesData from '../data/movies.json';

const HERO_CONTENT = {
  title: "Duty After School",
  description: "Sebuah benda tak dikenal mengambil alih dunia. Dalam keputusasaan, Departemen Pertahanan mulai merekrut lebih banyak tentara, termasuk siswa sekolah menengah. Mereka pun segera menjadi pejuang garis depan dalam perang.",
  ageRating: "18+",
  id: 116,
  isPremium: true
};

const Home = ({
  onNavigate,
  myList,
  onAddToMyList,
  onRemoveFromMyList,
  onPlayMovie
}) => {

  const handleMovieAction = (movie, action) => {
    switch(action) {
      case 'addToList':
        onAddToMyList(movie);
        break;
      case 'removeFromList':
        onRemoveFromMyList(movie.id);
        break;
      default:
        console.log('Unknown action:', action);
    }
  };

  return (
    <MainLayout onNavigate={onNavigate}>
      <main className="min-h-screen bg-[#181A1C]">
          <section
            className="relative h-[70vh] md:h-[75vh] lg:h-[80vh] overflow-hidden"
            style={{
              backgroundImage: 'url(/Assets/img/hero.png)',
              backgroundSize: 'cover',
              backgroundPosition: 'center 30%'
            }}
            aria-label="Featured content"
            role="banner"
          >
            <div className="absolute inset-0 bg-gradient-to-t from-[#181A1C]/95 via-black/50 to-transparent" aria-hidden="true" />

            <div className="relative h-full flex items-end">
              <div className="w-full pb-8 sm:pb-12 md:pb-20 lg:pb-24">
                <div className="px-4 sm:px-6 md:px-10 lg:px-16 xl:px-20 w-full">
                  <div className="flex items-end justify-between">
                    <article className="max-w-4xl text-white">
                      <header>
                        <h1 className="text-2xl sm:text-3xl md:text-5xl lg:text-6xl xl:text-7xl font-bold leading-tight mb-4 md:mb-6">
                          {HERO_CONTENT.title}
                        </h1>
                      </header>

                      <p className="text-base md:text-lg lg:text-xl text-white/85 leading-relaxed mb-6 md:mb-8 max-w-3xl line-clamp-2 md:line-clamp-none">
                        {HERO_CONTENT.description}
                      </p>

                      <nav className="flex flex-wrap items-center gap-3 md:gap-4 lg:gap-6" aria-label="Hero actions">
                        <button
                          className="px-4 py-2.5 md:px-6 md:py-3 bg-blue-600 hover:bg-blue-700 text-white text-sm md:text-base font-semibold rounded-full transition-colors duration-200"
                          aria-label={`Play ${HERO_CONTENT.title}`}
                        >
                          Mulai
                        </button>

                        <button
                          className="px-4 py-2.5 md:px-6 md:py-3 bg-white/10 hover:bg-white/20 border border-white/20 text-white text-xs md:text-base font-semibold rounded-full transition-colors duration-200 flex items-center gap-2"
                          aria-label={`More information about ${HERO_CONTENT.title}`}
                        >
                          <Info className="w-4 h-4 md:w-5 md:h-5" aria-hidden="true" />
                          Selengkapnya
                        </button>

                        <span className="px-3 py-2.5 md:px-4 md:py-3 bg-white/10 border border-white/20 text-white text-sm md:text-base font-semibold rounded-full" role="img" aria-label="Age rating 18 plus">
                          {HERO_CONTENT.ageRating}
                        </span>
                      </nav>
                    </article>

                    <aside className="ml-4 md:ml-8" aria-label="Audio controls">
                      <div className="p-2 md:p-3 bg-white/10 border border-white/20 rounded-full">
                        <IoMdVolumeHigh className="w-5 h-5 md:w-6 md:h-6 text-white" aria-hidden="true" />
                      </div>
                    </aside>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <div className="w-full max-w-[1920px] mx-auto mt-4 sm:mt-6 md:mt-0">
            <section className="w-full px-4 sm:px-6 md:px-10 lg:px-16 xl:px-20 pt-1 pb-3 sm:pt-3 sm:pb-4 md:pt-6 md:pb-6" aria-label="Continue watching">
              <MovieSection
                title="Melanjutkan Tonton Film"
                items={moviesData.continueWatching}
                onItemClick={onPlayMovie}
                cardType="horizontal"
                containerClass="continue-watching"
                myList={myList}
              />
            </section>


            <section className="w-full px-4 sm:px-6 md:px-10 lg:px-16 xl:px-20 py-1 sm:py-2 md:py-3" aria-label="Top rating">
              <MovieSection
                title="Top Rating Film dan Series Hari ini"
                items={moviesData.topRating}
                onItemClick={onPlayMovie}
                onItemInfo={(item) => {
                  const isInMyList = myList.some(movie => movie.id === item.id);
                  if (isInMyList) {
                    handleMovieAction(item, 'removeFromList');
                  } else {
                    handleMovieAction(item, 'addToList');
                  }
                }}
                cardType="vertical"
                containerClass="top-rating"
                myList={myList}
              />
            </section>

            <section className="w-full px-4 sm:px-6 md:px-10 lg:px-16 xl:px-20 py-1 sm:py-2 md:py-3" aria-label="Trending movies">
              <MovieSection
                title="Film Trending"
                items={moviesData.trending}
                onItemClick={onPlayMovie}
                onItemInfo={(item) => {
                  const isInMyList = myList.some(movie => movie.id === item.id);
                  if (isInMyList) {
                    handleMovieAction(item, 'removeFromList');
                  } else {
                    handleMovieAction(item, 'addToList');
                  }
                }}
                cardType="vertical"
                containerClass="trending"
                myList={myList}
              />
            </section>

            <section className="w-full px-4 sm:px-6 md:px-10 lg:px-16 xl:px-20 py-1 sm:py-2 md:py-3" aria-label="New releases">
              <MovieSection
                title="Rilis Baru"
                items={moviesData.newReleases}
                onItemClick={onPlayMovie}
                onItemInfo={(item) => {
                  const isInMyList = myList.some(movie => movie.id === item.id);
                  if (isInMyList) {
                    handleMovieAction(item, 'removeFromList');
                  } else {
                    handleMovieAction(item, 'addToList');
                  }
                }}
                cardType="vertical"
                containerClass="new-releases"
                myList={myList}
              />
            </section>
          </div>
        </main>
    </MainLayout>
  );
};

export default Home;