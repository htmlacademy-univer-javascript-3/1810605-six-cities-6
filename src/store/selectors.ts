import { createSelector } from '@reduxjs/toolkit';
import { RootState } from './index';
import { SortType } from './slices/offers-slice';

const selectOffersState = (state: RootState) => state.offers;
const selectOfferState = (state: RootState) => state.offer;
const selectUserState = (state: RootState) => state.user;
const selectFavoritesState = (state: RootState) => state.favorites;

export const selectCity = createSelector(selectOffersState, (state) => state.city);
export const selectOffers = createSelector(selectOffersState, (state) => state.items);
export const selectSortType = createSelector(selectOffersState, (state) => state.sortType);
export const selectActiveOfferId = createSelector(selectOffersState, (state) => state.activeOfferId);
export const selectIsOffersLoading = createSelector(selectOffersState, (state) => state.isLoading);
export const selectIsOffersLoadError = createSelector(selectOffersState, (state) => state.hasError);

export const selectFilteredOffers = createSelector(
  [selectOffers, selectCity],
  (offers, city) => offers.filter((offer) => offer.city.name === city.name)
);

export const selectSortedOffers = createSelector(
  [selectFilteredOffers, selectSortType],
  (offers, sortType) => {
    switch (sortType) {
      case 'Price: low to high':
        return [...offers].sort((a, b) => a.price - b.price);
      case 'Price: high to low':
        return [...offers].sort((a, b) => b.price - a.price);
      case 'Top rated first':
        return [...offers].sort((a, b) => b.rating - a.rating);
      case 'Popular':
      default:
        return offers;
    }
  }
);

export const selectOffer = createSelector(selectOfferState, (state) => state.offer);
export const selectNearbyOffers = createSelector(selectOfferState, (state) => state.nearbyOffers);
export const selectComments = createSelector(selectOfferState, (state) => state.comments);
export const selectIsOfferLoading = createSelector(selectOfferState, (state) => state.isOfferLoading);
export const selectIsOfferNotFound = createSelector(selectOfferState, (state) => state.isOfferNotFound);
export const selectIsCommentsLoading = createSelector(selectOfferState, (state) => state.isCommentsLoading);
export const selectIsCommentPosting = createSelector(selectOfferState, (state) => state.isCommentPosting);
export const selectIsCommentPostError = createSelector(selectOfferState, (state) => state.isCommentPostError);

export const selectAuthorizationStatus = createSelector(selectUserState, (state) => state.authorizationStatus);
export const selectUser = createSelector(selectUserState, (state) => state.user);

export const selectFavoriteOffers = createSelector(selectFavoritesState, (state) => state.items);

export type { SortType };
