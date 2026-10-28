import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import App from './App';

test('renders the state explorer dashboard', () => {
  render(<App />);

  expect(screen.getByRole("heading", { name: /state explorer/i })).toBeInTheDocument();
  expect(screen.getByRole("heading", { name: /component tree/i })).toBeInTheDocument();
  expect(screen.getByRole("heading", { name: /state inspector/i })).toBeInTheDocument();
});

test("updates counter state and activity log", async () => {
  render(<App />);

  await userEvent.click(screen.getByRole("button", { name: /increment/i }));

  expect(screen.getAllByText("1").length).toBeGreaterThanOrEqual(2);
  expect(screen.getByText(/counter state updated/i)).toBeInTheDocument();
});

test("updates lifted state in the preview panel", async () => {
  render(<App />);
  const input = screen.getByLabelText(/shared text/i);

  await userEvent.clear(input);
  await userEvent.type(input, "State flows");

  expect(screen.getAllByText("State flows").length).toBeGreaterThan(0);
});
