import { Offer } from '../types';

export const offers: Offer[] = [
  {
    id: '1',
    title: 'Beautiful & luxurious apartment at great location',
    type: 'apartment',
    price: 120,
    rating: 4.8,
    isPremium: true,
    isFavorite: false,
    previewImage: '/img/apartment-01.jpg',
    location: {
      latitude: 52.3909553943508,
      longitude: 4.85309666406198
    },
    city: {
      name: 'Amsterdam',
      location: {
        latitude: 52.37454,
        longitude: 4.897976
      }
    },
    bedrooms: 3,
    maxAdults: 4,
    description: 'A quiet cozy and picturesque that hides behind a a river by the unique lightness of Amsterdam. The building is green and from 18th century.',
    goods: ['Wi-Fi', 'Washing machine', 'Towels', 'Heating', 'Coffee machine', 'Baby seat', 'Kitchen', 'Dishwasher', 'Cabel TV', 'Fridge'],
    host: {
      name: 'Angelina',
      avatarUrl: '/img/avatar-angelina.jpg',
      isPro: true
    },
    images: [
      '/img/room.jpg',
      '/img/apartment-01.jpg',
      '/img/apartment-02.jpg',
      '/img/apartment-03.jpg',
      '/img/studio-01.jpg',
      '/img/apartment-01.jpg'
    ]
  },
  {
    id: '2',
    title: 'Wood and stone place',
    type: 'room',
    price: 80,
    rating: 4.0,
    isPremium: false,
    isFavorite: true,
    previewImage: '/img/room.jpg',
    location: {
      latitude: 52.369553943508,
      longitude: 4.85309666406198
    },
    city: {
      name: 'Amsterdam',
      location: {
        latitude: 52.37454,
        longitude: 4.897976
      }
    },
    bedrooms: 1,
    maxAdults: 2,
    description: 'Cozy and warm room with wooden furniture and stone walls. Perfect for a couple looking for a romantic getaway.',
    goods: ['Wi-Fi', 'Heating', 'Kitchen', 'Cable TV', 'Washing machine'],
    host: {
      name: 'Oliver',
      avatarUrl: '/img/avatar-max.jpg',
      isPro: false
    },
    images: [
      '/img/room.jpg',
      '/img/apartment-02.jpg',
      '/img/apartment-03.jpg'
    ]
  },
  {
    id: '3',
    title: 'Canal View Prinsengracht',
    type: 'apartment',
    price: 132,
    rating: 4.5,
    isPremium: false,
    isFavorite: false,
    previewImage: '/img/apartment-02.jpg',
    location: {
      latitude: 52.3909553943508,
      longitude: 4.929309666406198
    },
    city: {
      name: 'Amsterdam',
      location: {
        latitude: 52.37454,
        longitude: 4.897976
      }
    },
    bedrooms: 2,
    maxAdults: 3,
    description: 'A stylish apartment with a beautiful view of the Prinsengracht canal. Modern amenities and classic Dutch architecture.',
    goods: ['Wi-Fi', 'Heating', 'Kitchen', 'Dishwasher', 'Washing machine', 'Coffee machine'],
    host: {
      name: 'Sophie',
      avatarUrl: '/img/avatar-angelina.jpg',
      isPro: true
    },
    images: [
      '/img/apartment-02.jpg',
      '/img/apartment-01.jpg',
      '/img/room.jpg',
      '/img/apartment-03.jpg'
    ]
  },
  {
    id: '4',
    title: 'Nice, cozy, warm big bed apartment',
    type: 'apartment',
    price: 180,
    rating: 5.0,
    isPremium: true,
    isFavorite: true,
    previewImage: '/img/apartment-03.jpg',
    location: {
      latitude: 52.3809553943508,
      longitude: 4.939309666406198
    },
    city: {
      name: 'Amsterdam',
      location: {
        latitude: 52.37454,
        longitude: 4.897976
      }
    },
    bedrooms: 4,
    maxAdults: 6,
    description: 'Large and luxurious apartment with spacious bedrooms and a cozy living area. Perfect for families or groups of friends.',
    goods: ['Wi-Fi', 'Washing machine', 'Towels', 'Heating', 'Coffee machine', 'Baby seat', 'Kitchen', 'Dishwasher', 'Cable TV', 'Fridge', 'Air conditioning'],
    host: {
      name: 'Max',
      avatarUrl: '/img/avatar-max.jpg',
      isPro: true
    },
    images: [
      '/img/apartment-03.jpg',
      '/img/studio-01.jpg',
      '/img/apartment-01.jpg',
      '/img/apartment-02.jpg',
      '/img/room.jpg'
    ]
  }
];
