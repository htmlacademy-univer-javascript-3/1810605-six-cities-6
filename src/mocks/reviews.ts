import { Review } from '../types';

export const reviews: Review[] = [
  {
    id: '1',
    comment: 'A quiet cozy and picturesque that hides behind a river by the unique lightness of Amsterdam. The building is green and from 18th century.',
    date: '2019-04-24T00:00:00.000Z',
    rating: 4.0,
    user: {
      name: 'Max',
      avatarUrl: '/img/avatar-max.jpg',
      isPro: false
    }
  },
  {
    id: '2',
    comment: 'Beautiful space, fantastic location and atmosphere, really a wonderful place to stay, highly recommended!',
    date: '2023-11-15T10:30:00.000Z',
    rating: 5.0,
    user: {
      name: 'Angelina',
      avatarUrl: '/img/avatar-angelina.jpg',
      isPro: true
    }
  },
  {
    id: '3',
    comment: 'The house is very good, very happy, stayed for 3 days, the room is clean and comfortable.',
    date: '2024-01-10T14:20:00.000Z',
    rating: 4.5,
    user: {
      name: 'Oliver',
      avatarUrl: '/img/avatar-max.jpg',
      isPro: false
    }
  },
  {
    id: '4',
    comment: 'Good location, not far from the metro. Host was very friendly and helpful. The apartment was clean and cozy.',
    date: '2024-02-05T09:15:00.000Z',
    rating: 4.0,
    user: {
      name: 'Sophie',
      avatarUrl: '/img/avatar-angelina.jpg',
      isPro: true
    }
  },
  {
    id: '5',
    comment: 'We loved it so much, the house, the veiw, the location just great.. Highly reccomend :)',
    date: '2024-03-18T16:45:00.000Z',
    rating: 5.0,
    user: {
      name: 'John',
      avatarUrl: '/img/avatar-max.jpg',
      isPro: false
    }
  }
];
