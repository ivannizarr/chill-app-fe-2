import MovieCard from './MovieCard';
import Badge from '../ui/Badge';

const MovieCarousel = ({ item, variant = 'default' }) => {
  const isHorizontal = variant === 'continue-watching';

  const cardWidth = isHorizontal
    ? 'w-[240px] sm:w-[270px] md:w-[290px] lg:w-[310px]'
    : 'w-[140px] sm:w-[160px] md:w-[200px] lg:w-[220px] xl:w-[234px]';

  const aspectRatio = isHorizontal ? 'aspect-video' : 'aspect-[2/3]';

  return (
    <MovieCard
      item={item}
      aspectRatio={aspectRatio}
      width={cardWidth}
      className="group"
    >
      {() => (
        <>
          {isHorizontal && (
            <div className="absolute bottom-0 left-0 right-0 h-1 bg-black/50">
              <div
                className="h-full bg-blue-500 transition-all duration-300"
                style={{ width: `${item.progress || 0}%` }}
              />
            </div>
          )}

          {!isHorizontal && (
            <div className="absolute top-2 left-2 right-2 z-10 flex justify-between items-start">
              <div className="flex flex-col gap-2">
                {item.isPremium && (
                  <Badge variant="premium" size="xs">Premium</Badge>
                )}
              </div>
              {variant === 'trending' && (
                <Badge variant="top10" size="xs">Top 10</Badge>
              )}
            </div>
          )}

          {isHorizontal ? (
            <div className="absolute bottom-2 left-4 right-4">
              <div className="flex items-center justify-between">
                <h3 className="text-white font-semibold text-sm truncate flex-1 mr-2">
                  {item.title}
                </h3>
                <div className="flex items-center gap-1 text-xs text-white/70 flex-shrink-0">
                  <span>⭐</span>
                  <span>{item.rating}</span>
                </div>
              </div>
            </div>
          ) : (
            <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black via-black/80 to-transparent">
              <h3 className="text-white font-semibold text-sm line-clamp-2">
                {item.title}
              </h3>
              <p className="text-white/70 text-xs mt-1">
                {variant === 'trending' ? 'Top 10' : `${item.genre} • ${item.year}`}
              </p>
            </div>
          )}
        </>
      )}
    </MovieCard>
  );
};

export default MovieCarousel;