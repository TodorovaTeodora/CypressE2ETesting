it.only('assert property', ()=> {

    function selectDayFromCurrent(day) {

        let date = new Date()
        date.setDate(date.getDate() + day)
        let futureDay = date.getDate()
        let futureMonth = date.toLocaleString('default', {month: 'short'})
        let dateAssert = futureMonth + " " + futureDay + ", " + date.getFullYear()

        cy.get('nb-calendar-navigation').invoke('attr', 'ng-reflect-date').then( dateAttribute => {
            //if the future month is not the current one we have to click on the small right arrow to find it
           if (!dateAttribute.includes(futureMonth)) {
              cy.get('[data-name="chevron-right"]').click()
              selectDayFromCurrent()
           } else {
            cy.get('nb-calnedar-day-picker [class="day-cell ng-star-inserted"]').contains(futureDay).click()
           }
        })
        return dateAssert
    }

    cy.visit('/')
    cy.contains('Forms').click()
    cy.contains('Datepicker').click()

    cy.contains('nb-card', 'Common Datepicker').find('input').then ( input => {
        cy.wrap(input).click()
        let dateAssert = selectDayFromCurrent(1)
        cy.wrap(input).should('have.value', dateAssert)
        //cy.wrap(input).invoke('prop', 'value').should('contain', dateAssert)
        
    })

})

