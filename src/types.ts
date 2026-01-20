export type Location = {
  latitude: number;
  longitude: number;
};

export type City = {
  name: string;
  location: Location;
};

export type User = {
  name: string;
  avatarUrl: string;
  isPro: boolean;
};

export type Host = {
  name: string;
  avatarUrl: string;
  isPro: boolean;
};

export type Offer = {
  id: string;
  title: string;
  type: 'apartment' | 'room' | 'house' | 'hotel';
  price: number;
  rating: number;
  isPremium: boolean;
  isFavorite: boolean;
  previewImage: string;
  location: Location;
  city: City;
  bedrooms: number;
  maxAdults: number;
  description: string;
  goods: string[];
  host: Host;
  images: string[];
};

export type Review = {
  id: string;
  comment: string;
  date: string;
  rating: number;
  user: User;
};
