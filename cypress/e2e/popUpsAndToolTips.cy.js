it('tooltips', () => {
    cy.visit('/')
    cy.contains('Modal and Overlays').click()
    cy.contains('Tooltip').click()
    
    //we find the button Default using the parent element and the text of the botton
    cy.contains('nb-card', 'Colored Tooltip')
        .contains('Default').click()
        //after we click on the botton we can locate the tooltip
        cy.get('nb-tooltip').should('contain', 'This is a tooltip')


    //when we click on a dialog botton the dialog box shows up, we find the locator of this box then we click on 
    //if we delete a row from our smart table a dialog box will show up with a message "Are you sure you want to delete?"
it('dialog box', () => {
    cy.visit('/')
    cy.contains('Tables & Data').click()
    cy.contains('Smart Table').click()
        
    //we locate the bin element located inside the table body and click on it:
    cy.get('tbody tr').first().find('.nb-trash').click()
    //if the alert window doesn't show up the stub will be an empty object of window:confirm so when we try to make a get call we won't have a message
    const stub = cy.stub()
    cy.on('window:confirm', stub)
    cy.get('tbody tr').first().find('.nb-trash').click().then( () => {
        expect(stub.getCall(0).to.be.calledWith('Are you sure you want to delete?'))
    })

    //if we want to select cancel on the alert
    cy.get('tbody tr').first().find('.nb-trash').click()
    cy.on('window:confirm', (confirm) => false)

   })

})
