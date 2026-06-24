import { Star } from 'lucide-react';

interface StarRatingProps {
  rating: number;
  maxStars?: number;
  size?: number;
  interactive?: boolean;
  onChange?: (rating: number) => void;
}

export function StarRating({
  rating,
  maxStars = 5,
  size = 20,
  interactive = false,
  onChange
}: StarRatingProps) {
  return (
    <div className="flex items-center gap-1">
      {Array.from({ length: maxStars }).map((_, index) => {
        const starValue = index + 1;
        const isFilled = starValue <= rating;
        
        return (
          <button
            key={index}
            type="button"
            disabled={!interactive}
            onClick={() => interactive && onChange?.(starValue)}
            className={`${interactive ? 'cursor-pointer hover:scale-110 transition-transform' : 'cursor-default'} focus:outline-none`}
            title={interactive ? `Avaliar com ${starValue} estrelas` : undefined}
          >
            <Star
              size={size}
              className={`${
                isFilled
                  ? 'fill-[#F59E0B] text-[#F59E0B]'
                  : 'text-gray-300'
              }`}
            />
          </button>
        );
      })}
    </div>
  );
}
