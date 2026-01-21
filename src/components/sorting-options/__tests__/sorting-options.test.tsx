import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import SortingOptions from '../sorting-options';

describe('SortingOptions', () => {
  it('calls onSortTypeChange on option click', async () => {
    const onSortTypeChange = vi.fn();
    const user = userEvent.setup();

    render(
      <SortingOptions
        sortType="Popular"
        onSortTypeChange={onSortTypeChange}
      />
    );

    await user.click(screen.getByText('Popular', { selector: '.places__sorting-type' }));
    await user.click(screen.getByText('Price: low to high', { selector: '.places__option' }));
    expect(onSortTypeChange).toHaveBeenCalledWith('Price: low to high');
  });
});
