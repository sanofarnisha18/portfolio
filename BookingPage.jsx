import { useReducer } from "react";
import BookingForm from "../components/BookingForm";
import { fetchAPI } from "../utils/api";

const updateTimes = (state, date) => {
  return fetchAPI(date);
};

function BookingPage() {
  const initializeTimes = fetchAPI(new Date());

  const [availableTimes, dispatch] = useReducer(
    updateTimes,
    initializeTimes
  );

  return (
    <BookingForm
      availableTimes={availableTimes}
      dispatch={dispatch}
    />
  );
}

export default BookingPage;