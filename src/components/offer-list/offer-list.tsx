import { Offer } from '../../types';
import OfferCard from '../offer-card/offer-card';

interface OfferListProps {
  offers: Offer[];
  onOfferHover?: (offer: Offer | undefined) => void;
  listClassName?: string;
  cardClassName?: string;
  cardVariant?: 'cities' | 'near-places';
}

function OfferList({
  offers,
  onOfferHover,
  listClassName,
  cardClassName,
  cardVariant
}: OfferListProps): JSX.Element {
  return (
    <div className={listClassName ?? 'cities__places-list places__list tabs__content'}>
      {offers.map((offer) => (
        <OfferCard
          key={offer.id}
          offer={offer}
          className={cardClassName}
          variant={cardVariant}
          onMouseEnter={() => onOfferHover?.(offer)}
          onMouseLeave={() => onOfferHover?.(undefined)}
        />
      ))}
    </div>
  );
}

export default OfferList;
