// Registration.test.js
import { render, fireEvent, screen } from '@testing-library/react';
import Registration from './Registration';

test('displays error for empty form submission', () => {
  render(<Registration />);
  fireEvent.click(screen.getByText(/Register/i));
  expect(screen.getByText(/Username is required/i)).toBeInTheDocument();
});

test('successful registration redirects to dashboard', async () => {
  render(<Registration />);
  fireEvent.change(screen.getByLabelText(/Username/i), { target: { value: 'newuser' } });
  fireEvent.change(screen.getByLabelText(/Password/i), { target: { value: 'password' } });
  fireEvent.click(screen.getByText(/Register/i));
  expect(await screen.findByText(/Welcome/i)).toBeInTheDocument();
});
