import React, { useContext } from 'react'
import { AuthContext } from '../components/AuthContext'
import "./checkout.css"

const Checkout = () => {

    const { user } = useContext(AuthContext);

    const bookingInfo = JSON.parse(sessionStorage.getItem("BookingInfo"));
    const paymentMethod = sessionStorage.getItem("PaymentMethod");
    const car = JSON.parse(sessionStorage.getItem("Car"));

    const addBookingForUser = async (id) => {

        const data = { ...bookingInfo, paymentMethod: paymentMethod, carId: car._id};
        await fetch(`http://localhost:3000/api/book/${id}`, {

            method: 'POST',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json'
            },
        })
            .then((res) => res.json()).then((data) => {
                sessionStorage.removeItem("BookingInfo");
                sessionStorage.removeItem("PaymentMethod");
                sessionStorage.removeItem("Car");
                alert(data.message);
            });
    }

    const handleBook = async () => {
        // Implement the booking functionality
       await addBookingForUser(user.id);
    }

    if (!user) {
        return (
            <div>
                <h1>Please login to checkout</h1>
            </div>
        )
    }
    else {
        return (
            <div className='checkout-container'>
                <h1>Checkout</h1>

                <div className="booking-info">
                    <h2>Car Information</h2>
                    <table className="vertical-table">
                        <tbody>
                            <tr>
                                <th>Brand</th>
                                <td>{car.brand}</td>
                            </tr>
                            <tr>
                                <th>Car Name</th>
                                <td>{car.carName}</td>
                            </tr>
                            <tr>
                                <th>Model</th>
                                <td>{car.model}</td>
                            </tr>
                            <tr>
                                <th>Price</th>
                                <td>{car.price}</td>
                            </tr>
                            <tr>
                                <th>Speed</th>
                                <td>{car.speed}</td>
                            </tr>
                            <tr>
                                <th>GPS</th>
                                <td>{car.gps ? "Yes" : "No"}</td>
                            </tr>
                            <tr>
                                <th>Seat Type</th>
                                <td>{car.seatType}</td>
                            </tr>
                            <tr>
                                <th>Automatic</th>
                                <td>{car.automatic ? "Yes" : "No"}</td>
                            </tr>
                            <tr>
                                <th>Description</th>
                                <td>{car.description}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                <div className="booking-info">
                    <h2>Booking Information</h2>
                    <table className="vertical-table">
                        <tbody>
                            <tr>
                                <th>First Name</th>
                                <td>{bookingInfo.firstName}</td>
                            </tr>
                            <tr>
                                <th>Last Name</th>
                                <td>{bookingInfo.lastName}</td>
                            </tr>
                            <tr>
                                <th>Email</th>
                                <td>{bookingInfo.email}</td>
                            </tr>
                            <tr>
                                <th>Phone Number</th>
                                <td>{bookingInfo.phoneNumber}</td>
                            </tr>
                            <tr>
                                <th>From Address</th>
                                <td>{bookingInfo.fromAddress}</td>
                            </tr>
                            <tr>
                                <th>To Address</th>
                                <td>{bookingInfo.toAddress}</td>
                            </tr>
                            <tr>
                                <th>Persons</th>
                                <td>{bookingInfo.persons}</td>
                            </tr>
                            <tr>
                                <th>Luggage</th>
                                <td>{bookingInfo.luggage}</td>
                            </tr>
                            <tr>
                                <th>Journey Date</th>
                                <td>{bookingInfo.journeyDate}</td>
                            </tr>
                            <tr>
                                <th>Journey Time</th>
                                <td>{bookingInfo.journeyTime}</td>
                            </tr>
                            <tr>
                                <th>Notes</th>
                                <td>{bookingInfo.notes}</td>
                            </tr>
                            <tr>
                                <th>Payment Method</th>
                                <td>{paymentMethod}</td>
                            </tr>
                        </tbody>
                    </table>

                    <button className="btn btn-primary m-2" onClick={handleBook} >Confirm Booking</button>
                </div>

            </div>
        )
    }
}

export default Checkout