import { Review } from '../../types';
import ReviewItem from '../review-item/review-item';

interface ReviewsListProps {
  reviews: Review[];
}

const MAX_REVIEWS_COUNT = 10;

function ReviewsList({ reviews }: ReviewsListProps): JSX.Element {
  const safeReviews = Array.isArray(reviews) ? reviews : [];
  const sortedReviews = [...safeReviews]
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, MAX_REVIEWS_COUNT);

  return (
    <ul className="reviews__list">
      {sortedReviews.map((review) => (
        <ReviewItem key={review.id} review={review} />
      ))}
    </ul>
  );
}

export default ReviewsList;
