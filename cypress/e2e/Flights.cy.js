import steps from "../pages/steps"
import homePage from "../fixtures/homePage"
import flightModule from "../fixtures/flightModule"

Cypress.on('uncaught:exception', (err, runnable) => {
    return false
})
describe("Flight Scenarios", () => {
it("Case-1 SAW-ESB flight", () => {
    steps.clickElement(homePage.flightText)
    steps.selectAirport(flightModule.search.inputDepartureCity, flightModule.search.inputDepartureCity, "İstanbul", "IST")
    steps.selectAirport(flightModule.search.inputArrivalCity, flightModule.search.inputArrivalCity, "Ankara", "ESB")
    steps.selectDate("Mart", "Cumartesi, 30 Mart 2024", "Haziran", "Pazar, 30 Haziran 2024", false);
    steps.selectAdultCount(2);
    steps.selectChildCount(1);
    steps.selectInfantCount(1);
    steps.clickText("Ekonomi")
    steps.clickElement(flightModule.search.OkButtonOnDropdown)
    steps.clickElement(flightModule.search.searchButton)
    steps.clickElement(flightModule.filter.departureArrivalTimeFilter)
    steps.dragToDepartureTime(41.6956, 600, 75.0521, 1080, 33.3565)
    steps.checkToDepatureTime("1000", "1800")
})
it("Case-2 SAW-ESB flight with TK as ascending price listing", () => {
    steps.clickElement(homePage.flightText)
    steps.selectAirport(flightModule.search.inputDepartureCity, flightModule.search.inputDepartureCity, "İstanbul", "IST")
    steps.selectAirport(flightModule.search.inputArrivalCity, flightModule.search.inputArrivalCity, "Ankara", "ESB")
    steps.selectDate("Mart", "Cumartesi, 30 Mart 2024", "Haziran", "Pazar, 30 Haziran 2024", false);
    steps.selectAdultCount(2);
    steps.selectChildCount(1);
    steps.selectInfantCount(1);
    steps.clickText("Ekonomi")
    steps.clickElement(flightModule.search.OkButtonOnDropdown)
    steps.clickElement(flightModule.search.searchButton)
    steps.clickElement(flightModule.filter.departureArrivalTimeFilter)
    steps.dragToDepartureTime(41.6956, 600, 75.0521, 1080, 33.3565)
    steps.clickElement(flightModule.filter.airlinesFilter)
    steps.clickElement(flightModule.filter.selectTK)
    steps.clickElement(flightModule.result.sortAsCheapest)
    steps.ascendingPriceControl(flightModule.result.ticketPrice)
})
})