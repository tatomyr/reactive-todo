/* eslint-disable no-undef */
/// <reference types="Cypress" />

context('Basic flow', () => {
  beforeEach(() => {
    cy.visit('/')
  })
  it(`
    a) adds items
    b) marks a task completed
    c) searches through options and returns back to 'Completed' after the input reset
    d) adds new item from 'Completed' screen
    e) redirects to 'Active' screen & clears the input after triggering a task
  `, async () => {
    // a:
    cy.get('#newTask').type('One')
    cy.get('form#newTask-form').submit()
    cy.get('ol#tasks-list li')
      .should('have.length', 1)
      .contains('One')
    cy.wait(0)
    cy.get('#newTask')
      .should('have.value', '')
      .type('Two')
    cy.get('form#newTask-form').submit()
    cy.get('ol#tasks-list li')
      .should('have.length', 2)
      .contains('Two')
    cy.wait(0)
    cy.get('#newTask')
      .should('have.value', '')
      .type('Three')
    cy.get('form#newTask-form').submit()
    cy.get('ol#tasks-list li')
      .should('have.length', 3)
      .contains('Three')

    cy.wait(0)
    cy.get('#all .counter').should('have.text', '3')
    cy.get('#active .counter').should('have.text', '3')
    cy.get('#completed .counter').should('have.text', '0')

    // b:
    cy.get('ol#tasks-list li:nth-child(2)')
      .contains('Two')
      .click()
    cy.get('.task-details__controls a:first-child').click()
    cy.get('ol#tasks-list li').should('have.length', 2)

    cy.get('#nav-button-completed').click()
    cy.get('#completed').should('have.class', 'active')
    cy.get('ol#tasks-list li')
      .should('have.length', 1)
      .contains('Two')

    cy.wait(0)
    cy.get('#all .counter').should('have.text', '3')
    cy.get('#active .counter').should('have.text', '2')
    cy.get('#completed .counter').should('have.text', '1')

    // c:
    cy.get('#newTask').type('t')
    cy.get('#all').should('have.class', 'active')
    cy.get('ol#tasks-list li')
      .should('have.length', 2)
      .should(([two, three]) => {
        expect(two).to.contain('Two')
        expect(three).to.contain('Three')
      })

    cy.wait(0)
    cy.get('#all .counter').should('have.text', '2')
    cy.get('#active .counter').should('have.text', '1')
    cy.get('#completed .counter').should('have.text', '1')

    cy.get('#clear').click()
    cy.wait(0)
    cy.get('#newTask')
      .should('have.value', '')
      .should('not.have.focus')
    cy.get('#completed').should('have.class', 'active')
    cy.get('#all .counter').should('have.text', '3')
    cy.get('#active .counter').should('have.text', '2')
    cy.get('#completed .counter').should('have.text', '1')

    // d:
    cy.get('#newTask').type('Four')
    cy.get('#all').should('have.class', 'active')
    cy.get('#all .counter').should('have.text', '0')
    cy.get('#active .counter').should('have.text', '0')
    cy.get('#completed .counter').should('have.text', '0')

    cy.get('form#newTask-form').submit()
    cy.wait(0)
    cy.get('#active').should('have.class', 'active')
    cy.get('#all .counter').should('have.text', '4')
    cy.get('#active .counter').should('have.text', '3')
    cy.get('#completed .counter').should('have.text', '1')
    cy.get('#newTask')
      .should('have.value', '')
      .should('not.have.focus')
    cy.get('ol#tasks-list li')
      .should('have.length', 3)
      .contains('Four')

    // e:
    cy.get('#nav-button-completed').click()
    cy.get('#completed').should('have.class', 'active')
    cy.get('#newTask').type('o')
    cy.get('#all').should('have.class', 'active')
    cy.get('ol#tasks-list li')
      .should('have.length', 3)
      .should(([four, two, one]) => {
        expect(four).to.contain('Four')
        expect(two).to.contain('Two')
        expect(one).to.contain('One')
      })
    cy.get('#all .counter').should('have.text', '3')
    cy.get('#active .counter').should('have.text', '2')
    cy.get('#completed .counter').should('have.text', '1')

    cy.get('ol#tasks-list li:last-child')
      .contains('One')
      .click()
    cy.get('.task-details__controls a:first-child').click()
    cy.wait(0)
    cy.get('#active').should('have.class', 'active')
    cy.get('ol#tasks-list li')
      .should('have.length', 2)
      .should(([four, three]) => {
        expect(four).to.contain('Four')
        expect(three).to.contain('Three')
      })
    cy.get('#all .counter').should('have.text', '4')
    cy.get('#active .counter').should('have.text', '2')
    cy.get('#completed .counter').should('have.text', '2')
    cy.get('#newTask')
      .should('have.text', '')
      .should('not.have.focus')
  })
})
