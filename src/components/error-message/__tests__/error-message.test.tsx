import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import ErrorMessage from '../error-message';

describe('ErrorMessage', () => {
  it('renders message and calls onRetry', async () => {
    const onRetry = vi.fn();
    const user = userEvent.setup();

    render(<ErrorMessage onRetry={onRetry} />);

    expect(screen.getByText(/server is unavailable/i)).toBeInTheDocument();
    await user.click(screen.getByRole('button', { name: /retry/i }));
    expect(onRetry).toHaveBeenCalled();
  });
});
