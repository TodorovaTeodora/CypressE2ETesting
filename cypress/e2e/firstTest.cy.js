
it('first test', () => {
cy.visit('/')
  
cy.contains('nb-card', 'Using the Grid').then( firstForm => {
const emailLabelFirst = firstForm.find('[for="inputEmail1"]').text()
const passwordLabelFirst = firstForm.find('[for="inputPassword2"]').text()
expect(emailLabelFirst).to.equal('Email')
expect(passwordLabelFirst).to.equal('Password')

cy.contains('nb-card', 'Basic form').then( secondForm => {
    const passwordSecondText = secondForm.find('[for="exampleInputEmail1"]').text()
    expect(passwordLabelFirst).to.equal(passwordSecondText)
    cy.wrap(secondForm).find('[for="emailInputPassword1"]').should('contain', 'Password')
    })

  })

})

it('invoke command', () => {
cy.visit('/')
cy.contains('Forms').click()
cy.contains('Form Layouts').click()

//1
cy.get('[for="exampleInputEmail1"]').should('contain', 'Email address')

//2
cy.get('[for="exampleInputEmail1"]').invoke('text').then( label => {
    expect(label).to.equal('Email address')
})

//3
cy.get('[for="exampleInputEmail1"]').invoke('text').then( text => {
    expect(text).to.equal('Email address')
 })

cy.contains('nb-card', 'Basic form')
   .find('nb-checkbox')
   .click()
   .find('.custom-checkbox')
   .invoke('attr', 'class')
   .then( classValue => {
    expect(classValue).to.contain('checked')
   })
})

it('assert property', ()=> {
cy.visit('/')
cy.contains('Forms').click()
cy.contains('Datepicker').click()

//first we find the parent element, next we find and click on the input field to be able to select a date from the calendar
cy.contains('nb-card', 'Common Datepicker').find('input').then( input => {
    cy.wrap(input).click()
    //below is the locator of the whole calendar field
    cy.get('nb-calendar-day-cell').contains('17').click()
    cy.wrap(input).invoke('prop', 'value').should('contain', 'Feb 17 2023')

    })
})
