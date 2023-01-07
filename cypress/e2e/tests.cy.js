/* global describe beforeEach cy it */
/// <reference types="cypress" />




describe('Tic Tac Toe', () => {

  // before each test, return to our home page
  beforeEach(() => {
    cy.visit('http://localhost:8080');
  });


  // test to see if board renders
  it('board loads', () => {
    cy.contains('Tic Tac Toe');
  });


  xdescribe('Interaction', () => {

    // clicking button
    it('clicking a section should change it to O', () => {
      cy.get('button[name="0"]').click()
        .should('contain','O');
    });

    // clicking twice... still O, not X
    it('cannot click the same spot twice', () => {
      cy.get('button[name="0"]').click().click()
        .should('contain', 'O');
    });

    // turns alternate
    it('turns should alternate', () => {
      // O's turn makes an O
      cy.contains('O\'s turn');
      cy.get('button[name="0"]').click().contains('O');
      
      // X's turn makes an X
      cy.contains('X\'s turn');
      cy.get('button[name="1"]').click().contains('X');
    });

  });


  xdescribe('Victory', () => {
    
    // test to check if game can be won
    it('player X can win', () => {
      cy.get('button[name="0"]').click();
      cy.get('button[name="3"]').click();
      cy.get('button[name="1"]').click();
      cy.get('button[name="4"]').click();
      cy.get('button[name="8"]').click();
      cy.get('button[name="5"]').click();
      cy.contains('Player X won the game!');
    });
    
    // O WINS:
    it('player O can win', () => {
      cy.win();
      cy.contains('Player O won the game!');
    });

    // AFTER O WINS:
    it('reset button apperas when game is run', () => {
      cy.win();
      cy.contains('New Game');
    });

    // AFTER O WINS:
    it('cannot continue to play when game ends', () => {
      cy.win();
      cy.contains('button[name="7"]', 'X').should('not.exist')
    });

    // AFTER O WINS:
    it('reset button resets game', () => {
      cy.win();
      
      cy.contains('button[name="0"]', 'O').should('exist');
      cy.get('button[name="reset"]').click();
      cy.contains('button[name="0"]', 'O').should('not.exist');
    });

  });

  describe('Stalemate', () => {

    it('filling all squares with no win should result in a stalemate', () => {
      
      cy.get('button[name="0"]').click();
      cy.get('button[name="1"]').click();
      cy.get('button[name="2"]').click();
      cy.get('button[name="3"]').click();
      cy.get('button[name="4"]').click();
      cy.get('button[name="8"]').click();
      cy.get('button[name="5"]').click();
      cy.get('button[name="6"]').click();
      cy.get('button[name="7"]').click();

      cy.get('.gameMessage')
        .should('contain', 'Stalemate')
        .and('be.visible');
    });

  });


});