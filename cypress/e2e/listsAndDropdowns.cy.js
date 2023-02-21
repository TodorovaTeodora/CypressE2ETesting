it('lists and dropdowns', () => {
    cy.visit('/')
  
    //  // we use the nav tag as a parent element to locate the child element - select menu where the select button is
    // cy.get('nav nb-select').click()
    // //next we need to locate our selection options, the menu itself is located inside a separate div 
    // cy.get('.options-list').contains('Dark').click()
    // cy.get('nav nb-select').should('contain', 'Dark')
    // //to verify that after a theme is selected the background colour of the nav header changes, we can look at its value in css Styles
    // //to assert the colour we have to convert the css format from HEX to RGB
    // cy.get('nb-layout-header nav').should('have.css', 'nackground-color', 'rgb(34, 43, 69)')
    
    //how to go through the entire list of options: from the dropdown menu we click to see the whole list
    cy.get('nav nb-select').then ( dropdown => {
        cy.wrap(dropdown).click()
    //we get the whole list of 4 options and then we iterate through them and get each by its text, trim() is to remove the space before each text value
        cy.get('.options-list nb-options').each( (listItem, index) => {
           const itemText = listItem.text().trim()

           const colors = {
            "Light": "rgb(255, 255, 255)",
            "Dark": "rgb(34, 43, 69)",
            "Cosmic": "rgb(50, 50, 89)",
            "Corporate": "rgb(255, 255, 255)"
           }
           //we cannot use select() to select an option in this case because the tag name is nb-select, not select
           cy.wrap(listItem).click()
           cy.wrap(dropdown).should('contain', 'itemText')
           cy.get('nb-layout-header nav').should('have.css', 'background-color', colors[itemText])
            //we skip this step for the last element
           if(index < 3) {
               cy.wrap(dropdown).click()
           } 
        })
    })
})
