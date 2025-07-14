import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import FilterDropdown from '@/components/FilterDropdown';

test('calls onFilterChange when region is selected', () => {
  const handleChange = jest.fn();
  render(<FilterDropdown currentFilter="" onFilterChange={handleChange} />);

  const button = screen.getByRole('button');
  fireEvent.click(button);

  const option = screen.getByText('Americas');
  fireEvent.click(option);

  expect(handleChange).toHaveBeenCalledWith('Americas');
});