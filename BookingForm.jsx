import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { submitAPI } from "../utils/api";

function BookingForm({ availableTimes, dispatch }) {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    date: "",
    time: "",
    guests: 1,
    occasion: "Birthday",
  });

  const [errors, setErrors] = useState({});

  const validate = () => {
    let newErrors = {};

    if (!formData.date) {
      newErrors.date = "Date is required";
    }

    if (!formData.time) {
      newErrors.time = "Time is required";
    }

    if (formData.guests < 1 || formData.guests > 10) {
      newErrors.guests =
        "Guests must be between 1 and 10";
    }

    return newErrors;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value,
    });

    if (name === "date") {
      dispatch(value);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const validationErrors = validate();

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    if (submitAPI(formData)) {
      navigate("/confirmed");
    }
  };

  return (
    <section className="booking-container">
      <h2>Book a Table</h2>

      <form onSubmit={handleSubmit}>
        <label htmlFor="date">
          Choose Date
        </label>
        <input
          type="date"
          id="date"
          name="date"
          value={formData.date}
          onChange={handleChange}
          aria-label="Choose Date"
        />
        {errors.date && (
          <p>{errors.date}</p>
        )}

        <label htmlFor="time">
          Choose Time
        </label>
        <select
          id="time"
          name="time"
          value={formData.time}
          onChange={handleChange}
          aria-label="Choose Time"
        >
          <option value="">
            Select Time
          </option>

          {availableTimes.map((time) => (
            <option key={time} value={time}>
              {time}
            </option>
          ))}
        </select>

        {errors.time && (
          <p>{errors.time}</p>
        )}

        <label htmlFor="guests">
          Number of Guests
        </label>
        <input
          type="number"
          id="guests"
          name="guests"
          min="1"
          max="10"
          value={formData.guests}
          onChange={handleChange}
          aria-label="Number of Guests"
        />

        {errors.guests && (
          <p>{errors.guests}</p>
        )}

        <label htmlFor="occasion">
          Occasion
        </label>

        <select
          id="occasion"
          name="occasion"
          value={formData.occasion}
          onChange={handleChange}
        >
          <option>Birthday</option>
          <option>Anniversary</option>
        </select>

        <button type="submit">
          Reserve Table
        </button>
      </form>
    </section>
  );
}

export default BookingForm;