import { useRef } from "react";
import { ChevronLeft, ChevronRight } from 'lucide-react';
import MovieCarousel from '../cards/MovieCarousel';

const NavigationButton = ({
  direction,
  onClick,
  visible = true,
  disabled = false
}) => {
  if (!visible) return null;

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`
        absolute z-30 top-1/2 -translate-y-1/2
        w-10 h-10 sm:w-12 sm:h-12 bg-black/70 hover:bg-black/90 backdrop-blur-sm
        rounded-full shadow-2xl transition-all duration-200
        flex items-center justify-center border border-white/20
        hover:scale-105 disabled:opacity-30 disabled:cursor-not-allowed
        ${direction === 'left'
          ? '-left-5 hover:-left-4'
          : '-right-5 hover:-right-4'
        }
      `}
      aria-label={`Scroll ${direction}`}
    >
      {direction === 'left' ? (
        <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
      ) : (
        <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
      )}
    </button>
  );
};

export default function MovieSection({
  title = "Movies",
  items = [],
  onItemClick,
  onItemInfo,
  containerClass = "",
  myList = []
}) {
  const scrollerRef = useRef(null);

  const scrollCards = (direction) => {
    if (!scrollerRef.current) return;

    const container = scrollerRef.current;
    const containerWidth = container.clientWidth;

    const cardWidth = containerClass === 'continue-watching' ? 310 : 234;
    const gap = containerClass === 'continue-watching' ? 12 : 20;
    const cardsPerView = Math.floor(containerWidth / (cardWidth + gap));
    const scrollDistance = cardsPerView * (cardWidth + gap);

    const newScrollLeft = direction === 'left'
      ? container.scrollLeft - scrollDistance
      : container.scrollLeft + scrollDistance;

    container.scrollTo({
      left: newScrollLeft,
      behavior: 'smooth'
    });
  };


  const isSpecialContainer = ["continue-watching", "top-rating", "trending", "new-releases"].includes(containerClass);

  const sectionClass = isSpecialContainer
    ? "relative w-full"
    : "relative w-full mb-20";

  const headerClass = isSpecialContainer
    ? "text-lg sm:text-xl md:text-3xl font-extrabold mb-8 text-white"
    : "text-lg sm:text-xl md:text-3xl font-extrabold mb-4 text-white";

  return (
    <section className={sectionClass} aria-labelledby={`${title.replace(/\s+/g, '-').toLowerCase()}-heading`}>
      <header>
        <h2 id={`${title.replace(/\s+/g, '-').toLowerCase()}-heading`} className={headerClass}>
          {title}
        </h2>
      </header>

      <div
        className="relative group"
        role="region"
        aria-label={`${title} carousel`}
      >
        {containerClass !== 'my-list' && (
          <div className="hidden md:block">
            <NavigationButton
              direction="left"
              onClick={() => scrollCards('left')}
              visible={true}
            />
            <NavigationButton
              direction="right"
              onClick={() => scrollCards('right')}
              visible={true}
            />
          </div>
        )}

        <div
          ref={scrollerRef}
          className={`
            flex overflow-x-auto scroll-smooth snap-x snap-mandatory
            pb-4 scrollbar-hide px-4 sm:px-6 md:px-8
            ${containerClass === 'continue-watching'
              ? 'gap-2 sm:gap-3 md:gap-2 lg:gap-3'
              : 'gap-3 sm:gap-4 md:gap-5 lg:gap-6'
            }
          `}
          style={{
            scrollbarWidth: 'none',
            msOverflowStyle: 'none',
          }}
          role="list"
          aria-label={`${title} list`}
        >
          {items.map((item, index) => {
            const key = item.uniqueId || item.id || index;
            let variant = 'default';

            if (containerClass === 'continue-watching') {
              variant = 'continue-watching';
            } else if (containerClass === 'top-rating') {
              variant = 'top-rating';
            } else if (containerClass === 'trending') {
              variant = 'trending';
            } else if (containerClass === 'new-releases') {
              variant = 'new-release';
            }

            const isInMyList = myList.some(myListItem => myListItem.id === item.id);

            return (
              <div key={key} role="listitem" className="snap-start">
                <MovieCarousel
                  item={item}
                  variant={variant}
                  rank={index + 1}
                  trendingPosition={index + 1}
                  onPlay={onItemClick}
                  onInfo={onItemInfo}
                  isInMyList={isInMyList}
                />
              </div>
            );
          })}
        </div>
      </div>

    </section>
  );
}