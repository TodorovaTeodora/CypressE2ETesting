
it('Web tables', () => {
cy.visit('/')
cy.contains('Tables & Data')
cy.contains('Smart Table').click()

//1. Edit a row: to find the pencil editting tool first we find the table body, then we search for the row that includes 'Larry'
//finally we click on the pencil tool and find Age column to edit the age of Larry
cy.get('tbody').contains('tr', 'Larry').then( tableRow => {
    cy.wrap(tableRow).find('.nb-edit').click()
    cy.wrap(tableRow).find('[placeholder="Age"]').clear().type('25')
//when we click on the pencil tool after editting it turns into a checkmark
    cy.wrap(tableRow).find('.nb-checkmark').click()
    cy.wrap(tableRow).find('td').eq(6).should('contain', '25')
    })
})

//2. To add a new row we need to click on the '+' button then we fill in the data in the new row and click on the checkmark to save it
//to find the '+' button first we find the row it is located on, which is in the table head, then we find the location of the First name column in new row
cy.get('thead').find('.nb-plus').click()
//the new row is the 3rd one in the table head and we need to use the index of the column we are searching for
cy.get('thead').find('tr').eq(2).then( tableRow => {
    cy.wrap(tableRow).find('[placeholder="First name"]').type('John')
    cy.wrap(tableRow).find('[placeholder="Last name"]').type('Peterson')
    cy.wrap(tableRow).find('.nb-checkmark').click()
})
//we find all the rows of the table body and then the first column(the new one we just filled in) to verify its content
cy.get('tbody tr').find('td').first().then( tableColumns => {
    cy.wrap(tableColumns).eq(2).should('contain', 'John')
    cy.wrap(tableColumns).eq(3).should('contain', 'Peterson')
})

//3. Check what columns appear after we filter our search by Age input
//first we locate the table head, then we iterate over all the table rows, and find the column Age by index:
const age = [20, 30, 40, 200]
cy.wrap(age).each( age => {
cy.get('thead [placeholder="Age"]').clear().type(age)
cy.wait(500)
cy.get('tbody tr').each( tableRow => {
   if(age == 200) {
cy.wrap(tableRow).should('contain', 'No data found')
   } else {
    cy.wrap(tableRow).find('td').eq(6).should('contain', age)
   }
    
   })
})



