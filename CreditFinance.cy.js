/// <reference types="Cypress" />
import 'cypress-file-upload'

describe('credit-finance', () =>{

    beforeEach('function', () =>{
        cy.on('uncaught:exception', (err, runnable) => {

            return false
        })
        cy.visit("https://mccoymart.com/")
        cy.get("a[class='home-offering-card home-shop-card d-block  test-irshad......']").should('be.visible').click()
        cy.url().should('eq','https://mccoymart.com/credit-finance/')
        cy.get("div[class='bannerBtnWrapper'] button[type='button']").click()
        cy.get(".customSelectBtn").trigger('mouseover').click()
        cy.get("li[value='10-50 Lacs']").should('be.visible').click()
        cy.get("#name").type("Testing101")
    })

    it('credit already applied', () =>{
        const mnumber = "9205489292"
        cy.get("#mobile").type(mnumber)
        cy.get("#save").click()
        if(mnumber.length < 10){
            cy.get("#mobile_message").should('have.text','Please enter your mobile.')
        }
        else{
            cy.get(".alert-title-msg").should('have.text','You have already applied for credit finance. We will contact you soon')
        }
    })
    it('credit not applied', () =>{
        const mnumber = "5552223456"
        cy.get("#mobile").type(mnumber)
        cy.get("#save").click()
        cy.wait(3000)
        if(mnumber.length < 10){
            cy.get("#mobile_message").should('have.text','Please enter your mobile.')
        }
        else{
            cy.get("#mobile_otp").type("8118")
            cy.get("#save_otp").click()
            cy.get(".alert-title-msg").should('have.text','Wrong OTP')
            // cy.xpath("//h5[normalize-space()='Thank you']").should('have.text','Thank you')
            // cy.get("a[class='formBtnOrange']").click()
        }
    })
    it('user clicks on resend button', () =>{
        const mnumber = "77700323456"
        cy.get("#mobile").type(mnumber)
        cy.get("#save").click()
        cy.wait(3000)
        if(mnumber.length < 10){
            cy.get("#mobile_message").should('have.text','Please enter your mobile.')
        }
        else{
            cy.get("#mobile_otp").type("8118")
            cy.get("#save_otp").click()
            cy.wait(3000)
            cy.get(".alert-title-msg").should('have.text','Wrong OTP')
            cy.get("button[class='changeMobileNumberBtn resend_otp']").click()
            cy.wait(3000)
            cy.get("#mobile_otp").type("3451")
            cy.get("#save_otp").click()
            cy.wait(3000)
            cy.get(".alert-title-msg").should('have.text','Wrong OTP')
        }
    })
})
