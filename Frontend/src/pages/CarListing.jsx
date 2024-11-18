import React, { useEffect, useState } from "react";
import { Container, Row, Col } from "reactstrap";
import Helmet from "../components/Helmet/Helmet";
import CommonSection from "../components/UI/CommonSection";
import CarItem from "../components/UI/CarItem";
import { AddCar } from "../components/Admin/AddCar";

const CarListing = () => {
  const [sortBy, setSortBy] = useState(""); // State variable to hold sorting option
  const [sortedCars, setSortedCars] = useState(null); // State variable to hold sorted car data

  const [cars, setCars] = useState(null);
  const [editCar, setEditCar] = useState({
    brand: "",
    rating: 0,
    carName: "",
    model: "",
    price: 0,
    speed: 0,
    gps: false,
    seatType: "",
    automatic: false,
    description: "",
    file: null,
  });

  useEffect(() => {

    const fetchCars = async () => {

      const response = await fetch("http://localhost:3000/api/cars");
      const data = await response.json();
      console.log(data); 
      setCars(data);
      setSortedCars(data);
    }

    fetchCars();
  }, [])

  const handleEdit = async(id) => {
    const car = cars.find(car => car._id === id);
    setEditCar(car);
  }


  const handleDelete = async (id) => {

    if (!confirm("Are you sure you want to delete this car?")) {
      return;
    }

    const response = await fetch(`http://localhost:3000/api/cars/${id}`, {
        method: 'DELETE'
    }).then((res) => res.json()).then((data) => {
        alert(data.message);
        setSortedCars(sortedCars.filter(car => car._id !== id));
    });
}

  // Function to handle sorting logic
  const handleSort = (e) => {
    const selectedSortBy = e.target.value;
    setSortBy(selectedSortBy);

    let sortedCarsCopy = [...sortedCars];

    if (selectedSortBy === "low") {
      sortedCarsCopy.sort((a, b) => a.price - b.price);
    } else if (selectedSortBy === "high") {
      sortedCarsCopy.sort((a, b) => b.price - a.price);
    }

    setSortedCars(sortedCarsCopy);
  };

  return (
    <Helmet title="Cars">
      <CommonSection title="Car Listing" />

      <section>
        <Container>
          <Row>
            <Col lg="12">
              <div className="d-flex align-items-center gap-3 mb-5">
                <span className="d-flex align-items-center gap-2">
                  <i className="ri-sort-asc"></i> Sort By
                </span>

                <select value={sortBy} onChange={handleSort}>
                  <option value="">Select</option>
                  <option value="low">Low to High</option>
                  <option value="high">High to Low</option>
                </select>
              </div>
            </Col>

            {sortedCars && sortedCars.map((item) => (
              <CarItem delete={handleDelete} edit={handleEdit} item={item} key={item._id} />
            ))}
          </Row>

          <AddCar curr={editCar} />
        </Container>
      </section>
    </Helmet>
  );
};

export default CarListing;
