import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Offer, Review } from '../../types';

export type OfferState = {
  offer: Offer | null;
  nearbyOffers: Offer[];
  comments: Review[];
  isOfferLoading: boolean;
  isOfferNotFound: boolean;
  isNearbyOffersLoading: boolean;
  isCommentsLoading: boolean;
  isCommentPosting: boolean;
  isCommentPostError: boolean;
};

const initialState: OfferState = {
  offer: null,
  nearbyOffers: [],
  comments: [],
  isOfferLoading: false,
  isOfferNotFound: false,
  isNearbyOffersLoading: false,
  isCommentsLoading: false,
  isCommentPosting: false,
  isCommentPostError: false
};

const offerSlice = createSlice({
  name: 'offer',
  initialState,
  reducers: {
    setOffer: (state, action: PayloadAction<Offer | null>) => {
      state.offer = action.payload;
    },
    setNearbyOffers: (state, action: PayloadAction<Offer[]>) => {
      state.nearbyOffers = action.payload;
    },
    setComments: (state, action: PayloadAction<Review[]>) => {
      state.comments = action.payload;
    },
    setOfferLoading: (state, action: PayloadAction<boolean>) => {
      state.isOfferLoading = action.payload;
    },
    setOfferNotFound: (state, action: PayloadAction<boolean>) => {
      state.isOfferNotFound = action.payload;
    },
    setNearbyOffersLoading: (state, action: PayloadAction<boolean>) => {
      state.isNearbyOffersLoading = action.payload;
    },
    setCommentsLoading: (state, action: PayloadAction<boolean>) => {
      state.isCommentsLoading = action.payload;
    },
    setCommentPosting: (state, action: PayloadAction<boolean>) => {
      state.isCommentPosting = action.payload;
    },
    setCommentPostError: (state, action: PayloadAction<boolean>) => {
      state.isCommentPostError = action.payload;
    }
  }
});

export const {
  setOffer,
  setNearbyOffers,
  setComments,
  setOfferLoading,
  setOfferNotFound,
  setNearbyOffersLoading,
  setCommentsLoading,
  setCommentPosting,
  setCommentPostError
} = offerSlice.actions;

export default offerSlice.reducer;
