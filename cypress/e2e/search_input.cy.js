describe('Search input', () => {
  it('enters value into the search input and checks the value', () => {
    // Visit the homepage
    cy.visit('/');

    // Enter value into the input field with id "location"
    cy.get('input#location').type('spa'); // Type 'spa' into the input

    // Check that the input value is 'spa'
    cy.get('input#location').should('have.value', 'spa');
  });
});
