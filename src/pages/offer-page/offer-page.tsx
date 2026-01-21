import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate, useParams } from 'react-router-dom';
import { AuthorizationStatus } from '../../types';
import ReviewForm from '../../components/review-form/review-form';
import ReviewsList from '../../components/reviews-list/reviews-list';
import Map from '../../components/map/map';
import OfferList from '../../components/offer-list/offer-list';
import { RootState, AppDispatch } from '../../store';
import Header from '../../components/header/header';
import Spinner from '../../components/spinner/spinner';
import { fetchOfferAction, fetchNearbyOffersAction, fetchCommentsAction } from '../../store/api-actions';

function OfferPage(): JSX.Element {
  const { id } = useParams<{ id: string }>();
  const dispatch = useDispatch<AppDispatch>();
  const currentOffer = useSelector((state: RootState) => state.offer);
  const nearbyOffers = useSelector((state: RootState) => state.nearbyOffers);
  const comments = useSelector((state: RootState) => state.comments);
  const isOfferLoading = useSelector((state: RootState) => state.isOfferLoading);
  const isOfferNotFound = useSelector((state: RootState) => state.isOfferNotFound);
  const authorizationStatus = useSelector((state: RootState) => state.authorizationStatus);

  useEffect(() => {
    if (id) {
      dispatch(fetchOfferAction(id));
      dispatch(fetchNearbyOffersAction(id));
      dispatch(fetchCommentsAction(id));
    }
  }, [dispatch, id]);

  if (!id) {
    return <Navigate to="/404" />;
  }
  if (isOfferNotFound) {
    return <Navigate to="/404" />;
  }
  if (isOfferLoading || !currentOffer) {
    return <Spinner />;
  }
  const images = Array.isArray(currentOffer.images) ? currentOffer.images : [];

  return (
    <div className="page">
      <Header />

      <main className="page__main page__main--offer">
        <section className="offer">
          <div className="offer__gallery-container container">
            <div className="offer__gallery">
              {images.slice(0, 6).map((image) => (
                <div key={image} className="offer__image-wrapper">
                  <img className="offer__image" src={image} alt="Photo studio" />
                </div>
              ))}
            </div>
          </div>
          <div className="offer__container container">
            <div className="offer__wrapper">
              {currentOffer.isPremium && (
                <div className="offer__mark">
                  <span>Premium</span>
                </div>
              )}
              <div className="offer__name-wrapper">
                <h1 className="offer__name">
                  {currentOffer.title}
                </h1>
                <button className={`offer__bookmark-button button ${currentOffer.isFavorite ? 'offer__bookmark-button--active' : ''}`} type="button">
                  <svg className="offer__bookmark-icon" width="31" height="33">
                    <use xlinkHref="#icon-bookmark"></use>
                  </svg>
                  <span className="visually-hidden">{currentOffer.isFavorite ? 'In bookmarks' : 'To bookmarks'}</span>
                </button>
              </div>
              <div className="offer__rating rating">
                <div className="offer__stars rating__stars">
                  <span style={{ width: `${(currentOffer.rating / 5) * 100}%` }}></span>
                  <span className="visually-hidden">Rating</span>
                </div>
                <span className="offer__rating-value rating__value">{currentOffer.rating}</span>
              </div>
              <ul className="offer__features">
                <li className="offer__feature offer__feature--entire">
                  {currentOffer.type.charAt(0).toUpperCase() + currentOffer.type.slice(1)}
                </li>
                <li className="offer__feature offer__feature--bedrooms">
                  {currentOffer.bedrooms} Bedroom{currentOffer.bedrooms > 1 ? 's' : ''}
                </li>
                <li className="offer__feature offer__feature--adults">
                  Max {currentOffer.maxAdults} adult{currentOffer.maxAdults > 1 ? 's' : ''}
                </li>
              </ul>
              <div className="offer__price">
                <b className="offer__price-value">&euro;{currentOffer.price}</b>
                <span className="offer__price-text">&nbsp;night</span>
              </div>
              <div className="offer__inside">
                <h2 className="offer__inside-title">What&apos;s inside</h2>
                <ul className="offer__inside-list">
                  {(currentOffer.goods ?? []).map((good) => (
                    <li key={good} className="offer__inside-item">
                      {good}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="offer__host">
                <h2 className="offer__host-title">Meet the host</h2>
                <div className="offer__host-user user">
                  <div className={`offer__avatar-wrapper ${currentOffer.host.isPro ? 'offer__avatar-wrapper--pro' : ''} user__avatar-wrapper`}>
                    <img className="offer__avatar user__avatar" src={currentOffer.host.avatarUrl} width="74" height="74" alt="Host avatar" />
                  </div>
                  <span className="offer__user-name">
                    {currentOffer.host.name}
                  </span>
                  {currentOffer.host.isPro && (
                    <span className="offer__user-status">
                      Pro
                    </span>
                  )}
                </div>
                <div className="offer__description">
                  <p className="offer__text">
                    {currentOffer.description}
                  </p>
                </div>
              </div>
              <section className="offer__reviews reviews">
                <h2 className="reviews__title">Reviews &middot; <span className="reviews__amount">{comments.length}</span></h2>
                <ReviewsList reviews={comments} />
                {authorizationStatus === AuthorizationStatus.Auth && currentOffer && (
                  <ReviewForm offerId={currentOffer.id} />
                )}
              </section>
            </div>
          </div>
          <Map
            city={currentOffer.city}
            points={[...nearbyOffers, currentOffer]}
            activePointId={currentOffer.id}
            className="offer__map map"
          />
        </section>
        <div className="container">
          <section className="near-places places">
            <h2 className="near-places__title">Other places in the neighbourhood</h2>
            <OfferList
              offers={nearbyOffers}
              listClassName="near-places__list places__list"
              cardVariant="near-places"
            />
          </section>
        </div>
      </main>
    </div>
  );
}

export default OfferPage;
