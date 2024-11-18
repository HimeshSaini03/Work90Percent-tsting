import React, { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../components/AuthContext'
import "./checkout.css"

const Bookings = () => {

    const { user, admin } = useContext(AuthContext);

    const [bookings, setBookings] = useState(null);

    useEffect(() => {
        const getBookings = async () => {
            await fetch(`http://localhost:3000/api/book/all/${user.id}`).
                then((res) => res.json()).then((data) => {
                    setBookings(data);
                    console.log(data);
                }).catch((error) => {
                    console.error('Error fetching bookings:', error);
                });
        };

        if (user)
            getBookings();
    }, [user]);

    if (!user) {
        console.log("No user");
        return (
            <div>
                <h1>Please login to view bookings</h1>
            </div>
        )
    }
    else {
        console.log("User", user);
        return (
            <div>
                <h1 className='display-1 fw-bold text-center'>Bookings</h1>

                <div className='booking row'>
                    {bookings && bookings.map((bookingInfo, index) => (
                        <div className='col d-flex flex-column align-items-center' key={bookingInfo._id}>
                            <h3 className='text-decoration-underline'>{"Booking :- " + (index + 1)}</h3>
                            {admin && <div className='m-2 btn btn-danger d-flex justify-content-center'>Delete <i className='ri-delete-bin-line'></i></div>}
                            <div className='booking-item'>
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
                                            <td>{bookingInfo.paymentMethod}</td>
                                        </tr>
                                    </tbody>
                                </table>

                            </div>
                        </div>
                    ))}
                </div>
            </div>
        )
    }
}

export default Bookings