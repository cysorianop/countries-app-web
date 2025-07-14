import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import SearchBar from '@/components/SearchBar';
import userEvent from '@testing-library/user-event';

test('calls onSearch when form is submitted', async () => {
  const handleSearch = jest.fn();
  render(<SearchBar onSearch={handleSearch} />);

  const input = screen.getByPlaceholderText(/search for a country/i);
  await userEvent.type(input, 'Colombia{enter}');

  expect(handleSearch).toHaveBeenCalledWith('Colombia');
});