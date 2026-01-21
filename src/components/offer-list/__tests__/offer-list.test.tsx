import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import OfferList from '../offer-list';

describe('OfferList', () => {
  it('renders list of offers', () => {
    const offers = [
      {
        id: '1',
        title: 'First',
        type: 'apartment' as const,
        price: 120,
        rating: 4.5,
        isPremium: false,
        isFavorite: false,
        previewImage: '/img/a.jpg',
        location: { latitude: 1, longitude: 1 },
        city: { name: 'Paris', location: { latitude: 1, longitude: 1 } },
        bedrooms: 1,
        maxAdults: 2,
        description: 'Test',
        goods: [],
        host: { name: 'Host', avatarUrl: '/img/a.jpg', isPro: false },
        images: []
      },
      {
        id: '2',
        title: 'Second',
        type: 'room' as const,
        price: 80,
        rating: 4,
        isPremium: false,
        isFavorite: false,
        previewImage: '/img/b.jpg',
        location: { latitude: 1, longitude: 1 },
        city: { name: 'Paris', location: { latitude: 1, longitude: 1 } },
        bedrooms: 1,
        maxAdults: 2,
        description: 'Test',
        goods: [],
        host: { name: 'Host', avatarUrl: '/img/a.jpg', isPro: false },
        images: []
      }
    ];

    render(
      <BrowserRouter>
        <OfferList offers={offers} />
      </BrowserRouter>
    );

    expect(screen.getByText('First')).toBeInTheDocument();
    expect(screen.getByText('Second')).toBeInTheDocument();
  });
});
