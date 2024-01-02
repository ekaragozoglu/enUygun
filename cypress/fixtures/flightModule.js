export default {
    search: {
        roundTrip: "#oneWayCheckbox",
        inputDepartureCity: "#OriginInput",
        inputArrivalCity: "#DestinationInput",
        currentDepartureMonthText: "(//div[@class='CalendarMonth_caption CalendarMonth_caption_1'])[2]//strong",
        currentReturnMonthText: "(//div[@class='CalendarMonth_caption CalendarMonth_caption_1'])[3]//strong",
        nextMonthButton: "//div[@aria-label='Move forward to switch to the next month.']",
        departureDateField: "#DepartureDate",
        returnDateField: "#ReturnDate",
        oneWayCheckbox: "#oneWayCheckbox",
        passengerAndClassFieldArea: "//button[@data-testid='passengerSelectButtonMulti']",
        addAdultPassengerButton: "//button[@data-testid='passengerCountIncrease-0']",
        addChildPassengerButton: "//button[@data-testid='passengerCountIncrease-1']",
        addInfantPassengerButton: "//button[@data-testid='passengerCountIncrease-2']",
        searchButton: "//button[@data-testid='formSubmitButton']",
        adultCountText: "//div[@data-testid='passengerTypeItem-0']//span[@class='PassengerBox__type__count']",
        childCountText: "//div[@data-testid='passengerTypeItem-1']//span[@class='PassengerBox__type__count']",
        infantCountText: "//div[@data-testid='passengerTypeItem-2']//span[@class='PassengerBox__type__count']",
        OkButtonOnDropdown: "//button[@data-testid='okButtonMulti']"
    },
    filter: {
        departureArrivalTimeFilter: "//div[@class='ctx-filter-departure-return-time card-header']",
        firstDepartureTimeHandle: "//div[@data-testid='departureDepartureTimeSlider']//div[@class='rc-slider-handle rc-slider-handle-1']",
        secondDepartureTimeHandle: "//div[@data-testid='departureDepartureTimeSlider']//div[@class='rc-slider-handle rc-slider-handle-2']",
        departureArrivalTimeSlide: "//div[@data-testid='departureDepartureTimeSlider']//div[@class='rc-slider-track rc-slider-track-1']",
        airlinesFilter: "//div[@class='ctx-filter-airline card-header']",
        selectTK:"//label[@for='TKairlines']"
    },
   result: {
        departureTimeOnFlightCard: "//div[@data-testid='departureTime']",
        sortAsCheapest:"//div[@class='result-sorting__list']//span[text()='En ucuz']",
        ticketPrice:"//div[@data-testid='flightInfoPrice']"
   }
};