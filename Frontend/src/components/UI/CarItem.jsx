import React, { useContext } from "react";
import { Col, Row } from "reactstrap";
import { Link } from "react-router-dom";
import "../../styles/car-item.css";
import { AuthContext } from "../AuthContext";

const CarItem = (props) => {

  const {admin} = useContext(AuthContext);

  const { _id, imgUrl, model, carName, automatic, speed, price } = props.item;

  console.log(props);

  return (
    <Col lg="4" md="4" sm="6" className="mb-5">
      <div className="car__item">
        <div className="car__img">
          <img src={`http://localhost:3000/${imgUrl}`} alt="" className="w-100" />
        </div>

        <div className="car__item-content mt-4">
          <h4 className="section__title text-center">{carName}</h4>
          <h6 className="rent__price text-center mt-">
            Rs.{price}.00 <span>/ Day</span>
          </h6>

          <div className="car__item-info d-flex align-items-center justify-content-between mt-3 mb-4">
            <span className=" d-flex align-items-center gap-1">
              <i className="ri-car-line"></i> {model}
            </span>
            <span className=" d-flex align-items-center gap-1">
              <i className="ri-settings-2-line"></i> {automatic}
            </span>
            <span className=" d-flex align-items-center gap-1">
              <i className="ri-timer-flash-line"></i> {speed}
            </span>
          </div>

          <Row className="gap-2">
            <Row>
                <Link className="text-white text-center text-decoration-none w-50 car__item-btn car__btn-rent" to={`/cars/${_id}`}>Rent</Link>

                <Link className="text-white text-center text-decoration-none w-50 car__item-btn car__btn-details" to={`/cars/${_id}`}>Details</Link>
            </Row>

            {admin && <Row>
              <button onClick={() => props.edit(props.item._id)} className="text-white w-50 car__item-btn car__btn-details">
                Edit <i className="ri-edit-line"></i>
              </button>

              <button onClick={() => props.delete(props.item._id)} className="text-white w-50 car__item-btn car__btn-rent">
                Delete <i className="ri-delete-bin-line"></i>
              </button>
            </Row>}
          </Row>

        </div>
      </div>
    </Col>
  );
};

export default CarItem;
