// LeagueCreation.test.js
test('league creation form submits successfully', () => {
    render(<LeagueCreation />);
    fireEvent.change(screen.getByLabelText(/League Name/i), { target: { value: 'New League' } });
    fireEvent.click(screen.getByText(/Create League/i));
    expect(screen.getByText(/League created successfully!/i)).toBeInTheDocument();
  });
  