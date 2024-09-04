import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import Terminal from '../Components/Terminal';
import WelcomeMessage from '../Components/WelcomeMessage';

describe('Terminal Component', () => {
   test('renders the input field', () => {
    render(<Terminal />);
    expect(screen.getByRole('textbox')).toBeInTheDocument();
  });

  test('displays the input command in the history after submission', async () => {
    render(<Terminal />);
    const input = screen.getByRole('textbox');
    fireEvent.change(input, { target: { value: 'test command' } });
    fireEvent.submit(input);

    // Attendre que la commande soit ajoutée à l'historique
await screen.findByText('> test command');
  });

  test('executes the "help" command and displays the correct response', async () => {
    render(<Terminal />);
    const input = screen.getByRole('textbox');
    fireEvent.change(input, { target: { value: 'help' } });
    fireEvent.submit(input);

    // Attendre que la réponse "Available commands" soit affichée
    await screen.findByText(/Available commands: help, clear/);
  });

  test('clears the history when "clear" command is executed', async () => {
    render(<Terminal />);
    const input = screen.getByRole('textbox');
    fireEvent.change(input, { target: { value: 'test command' } });
    fireEvent.submit(input);

    // Attendre que la commande soit dans l'historique
await screen.findByText('> test command');

    fireEvent.change(input, { target: { value: 'clear' } });
    fireEvent.submit(input);

    // Attendre que l'historique soit vidé
    await waitFor(() => expect(screen.queryByText('> test command')).not.toBeInTheDocument());
  });

  test('executes an unknown command and displays the default message', async () => {
    render(<Terminal />);
    const input = screen.getByRole('textbox');
    fireEvent.change(input, { target: { value: 'unknown' } });
    fireEvent.submit(input);

    // Attendre que la commande inconnue soit affichée
    await screen.findByText('> Unknown command');
  });
});
