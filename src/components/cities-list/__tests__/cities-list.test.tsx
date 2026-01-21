import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import CitiesList from '../cities-list';

describe('CitiesList', () => {
  it('calls onCityChange on click', async () => {
    const onCityChange = vi.fn();
    const cities = [
      { name: 'Paris', location: { latitude: 1, longitude: 1 } },
      { name: 'Amsterdam', location: { latitude: 2, longitude: 2 } }
    ];
    const user = userEvent.setup();

    render(
      <CitiesList
        cities={cities}
        selectedCity={cities[0]}
        onCityChange={onCityChange}
      />
    );

    await user.click(screen.getByText('Amsterdam'));
    expect(onCityChange).toHaveBeenCalledWith(cities[1]);
  });
});
