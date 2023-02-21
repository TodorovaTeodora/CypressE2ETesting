const { beforeEach } = require("node:test");
const { onDatePickerPage } = require("../support/page_objects/datepickerPage");
const { onFormLayoutsPage } = require("../support/page_objects/formLayoutsPage");
const { onNavigationPage, navigateTo } = require("../support/page_objects/navigationPage");
const { onSmartTablePage } = require("../support/page_objects/smartTablePage");

describe('Test with Page Objects', ()=> {

beforeEach('open application', ()=> {
    cy.visit('/')
})

it('verify navigations across the pages', ()=> {
    navigateTo.formLayoutsPage()
    navigateTo.datepickerPage()
    navigateTo.smartTablePage()
    navigateTo.toolTipPage()
    navigateTo.toasterPage()
})
  
it.only('should submit Inline and Basic form and select tomorrow date in the calendar', ()=> {
    navigateTo.formLayoutsPage()
    // fill in the Forms
    onFormLayoutsPage.submitInlineFormWithNameAndEmail('John', 'test@test.com')
    onFormLayoutsPage.submitBasicFromWithEmailAndPassword('test@test.com', 'password')
    //Go to datepicker and select the date:
    navigateTo.datepickerPage()
    onDatePickerPage.selectCommonDatepickerDateFromToday(1)
    onDatePickerPage.selectDatepickerWithRangeFromToday(7, 14)
    navigateTo.smartTablePage()
    onSmartTablePage.addNewRecordWithFirstAndLastName('John', 'Peterson')
    onSmartTablePage.updateAgeByFirstName('Jamie', '30')
    onSmartTablePage.deleteRowByIndex(1)

    })

})
