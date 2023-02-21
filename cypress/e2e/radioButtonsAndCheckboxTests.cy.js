//How to work with radio buttons:

it('radio button', () => {
    it('assert property', ()=> {
        cy.visit('/')
        cy.contains('Forms').click()
        cy.contains('Form Layouts').click()
     
        cy.contains('nb-card', 'Using the grid').find('[type="radiobutton"]').then( radioButttons => {
            cy.wrap(radioButttons)
            .first()
  //using {force:true} we disable the cypress default check for the element to be visible
            .check({force: true})
            .should('be.checked')

            cy.wrap(radioButttons)
            .eq(1)
            .check({force: true})
            .should('not.be.checked')

            cy.wrap(radioButttons)
            .eq(2)
            .check({force: true})
            .should('be.disabled')
        })

    })
})

//How to work with checkboxes:

it('check boxes', () => {
        cy.visit('/')
        cy.contains('Modal & Overlays').click()
        cy.contains('Toastr').click()

 //the check() method only checks but cannot uncheck boxes and radio buttons, to uncheck we use click()
        cy.get('[type="checkbox"]').check({force: true})
        cy.get('[type="checkbox"]').eq(0).click({force: true})

})
