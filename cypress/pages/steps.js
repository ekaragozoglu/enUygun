import homePage from "../fixtures/homePage"
import flightModule from '../fixtures/flightModule';

require('cypress-xpath');

class steps {

    visit(url = "/", timeout = 5000) {
        cy.visit(url, {timeout: timeout});
    }

    findElement(locator) {
        const element = locator.startsWith("/") || locator.startsWith('(') ? cy.xpath(locator) : cy.get(locator);
        element.invoke('attr', 'style', 'border: 2px solid red; box-shadow: 0px 0px 10px 5px rgba(255, 0, 0, 0.5);');
        return element
    }

    clickElement(locator, index = 0) {
        this.findElement(locator).eq(index ? index - 1 : 0).click({force: true});
        cy.wait(500)
    }

    clickText(text) {
        cy.contains(text).click();
    }

    selectAirport(clickLocator, inputLocator, text, targetText, index = 0, delay = 0) {
        this.clickElement(clickLocator);
        this.findElement(inputLocator).eq(index ? index - 1 : 0).clear().type(text, {delay: delay});
        const airportCode = targetText;
        this.clickElement(`//div[@class='city_code'][text()='${airportCode}']`);  
    }

    selectDate(departureMonth, departureDate, returnMonth, returnDate, oneWay) {
        this.clickElement(flightModule.search.departureDateField)
        if(oneWay){
        let isFound = false;
            const checkDepartureMonth = () => {
            cy.xpath(flightModule.search.currentDepartureMonthText)
            .invoke('text')
            .then((text) => {
                if (text.includes(departureMonth)) { 
                    isFound = true;
                    cy.xpath('//td[@aria-label="' + departureDate + '"]').click();
                    cy.wait(500);
                } else {
                    this.clickElement(flightModule.search.nextMonthButton)
                    cy.wait(1000); 
                    checkDepartureMonth(); 
                }
                });
            };
            checkDepartureMonth();
        cy.wait(1000);
        }else{
        this.clickElement(flightModule.search.departureDateField)
        let isFound = false;
            const checkDepartureMonth = () => {
            cy.xpath(flightModule.search.currentDepartureMonthText)
            .invoke('text')
            .then((text) => {
                if (text.includes(departureMonth)) { 
                    isFound = true;
                    cy.xpath('//td[@aria-label="' + departureDate + '"]').click();
                } else {
                    this.clickElement(flightModule.search.nextMonthButton)
                    cy.wait(1000); 
                    checkDepartureMonth(); 
                }
                });
            };
            checkDepartureMonth();
        this.clickElement(flightModule.search.oneWayCheckbox)
        const checkReturnMonth = () => {
            cy.xpath(flightModule.search.currentReturnMonthText)
            .invoke('text')
            .then((text) => {
                if (text.includes(returnMonth)) { 
                isFound = true;
                cy.xpath('//td[@aria-label="' + returnDate + '"]').click();
                cy.wait(500);
                } else {
                this.clickElement(flightModule.search.nextMonthButton)
                cy.wait(1000); 
                checkReturnMonth(); 
                }
            });
        };
        checkReturnMonth();
        cy.wait(1000);
    }
    }

    selectAdultCount(count) {
        const targetAdultCount = count;
        this.clickElement(flightModule.search.passengerAndClassFieldArea);
        this.findElement(flightModule.search.adultCountText).then(($adultCount) => {
            const currentAdultCount = parseInt($adultCount.text(), 10) || 0;
            for (let i = currentAdultCount + 1; i <= targetAdultCount; i++) {
                this.clickElement(flightModule.search.addAdultPassengerButton);
                cy.wait(250);
            }
            this.findElement(flightModule.search.adultCountText).should('have.text', `${targetAdultCount}`);
        });
    }

    selectChildCount(count) {
        const targetChildCount = count;
        this.clickElement(flightModule.search.passengerAndClassFieldArea);
        this.findElement(flightModule.search.childCountText).then(($childCount) => {
            const currenChildCount = parseInt($childCount.text(), 10) || 0;
            for (let i = currenChildCount + 1; i <= targetChildCount; i++) {
                this.clickElement(flightModule.search.addChildPassengerButton);
                cy.wait(250);
            }
            this.findElement(flightModule.search.childCountText).should('have.text', `${targetChildCount}`);
        });
    }

    selectInfantCount(count) {
        const targetInfantCount = count;
        this.clickElement(flightModule.search.passengerAndClassFieldArea);
        this.findElement(flightModule.search.infantCountText).then(($infantCount) => {
            const currenInfantCount = parseInt($infantCount.text(), 10) || 0;
            for (let i = currenInfantCount + 1; i <= targetInfantCount; i++) {
                this.clickElement(flightModule.search.addInfantPassengerButton);
                cy.wait(250);}
            this.findElement(flightModule.search.infantCountText).should('have.text', `${targetInfantCount}`);
        });
    }
    
    dragToDepartureTime(firstHandleStyle, firstHandleRate, secondHandleStyle, secondHandleRate, finalSliderWidthRate) {
        this.findElement(flightModule.filter.firstDepartureTimeHandle)
            .invoke("attr", "style", `left: ${firstHandleStyle}%;`)
            .invoke("attr", "aria-valuenow", `${firstHandleRate}`)
            .click();
        this.findElement(flightModule.filter.departureArrivalTimeSlide)
            .invoke("attr", "aria-valuenow", `${firstHandleRate}`)
        this.findElement(flightModule.filter.secondDepartureTimeHandle)
            .invoke("attr", "style", `left: ${secondHandleStyle}%;`)
            .invoke("attr", "aria-valuenow", `${secondHandleRate}`)
            .click();
        this.findElement(flightModule.filter.departureArrivalTimeSlide)
            .invoke("attr", "aria-valuenow", `${secondHandleRate}`)
        this.findElement(flightModule.filter.departureArrivalTimeSlide)
            .invoke("attr", "style", `left: ${firstHandleStyle}%; width: ${finalSliderWidthRate}%;`);
        cy.wait(1500)    
    }

    checkToDepatureTime(greaterThan, lessThan) {
        this.findElement(flightModule.result.departureTimeOnFlightCard).each(($element) => {
            cy.wrap($element).invoke('text').then((text) => {
                const currentTime = text.trim().replace(':', '');
                cy.log(currentTime);
                expect(Number(currentTime)).to.be.greaterThan(Number(greaterThan));
                expect(Number(currentTime)).to.be.lessThan(Number(lessThan));
              });
            });
    }

    ascendingPriceControl(locator) {
        let previousPrice = Number.NEGATIVE_INFINITY;
        this.findElement(locator).each(($element) => {
          cy.wrap($element).invoke('text').then((text) => {
            const price = Number(text.trim().replace(/[.,TL]/g, ''));
            expect(price).to.be.gte(previousPrice);
                  previousPrice = price;
          });
        });
    }
}
export default new steps()