import React, { useContext, useEffect, useState } from 'react'
import "./AddCar.css";
import { Button, Form, FormGroup, Input, Label } from 'reactstrap';
import { AuthContext } from '../AuthContext';


export const AddCar = ({curr}) => {

    const { admin } = useContext(AuthContext);

    const [currId, setCurrId] = useState(null);

    const [
        { brand, rating, carName, model, price, speed, gps, seatType, automatic, description, file },
        setValues
    ] = useState({
        brand: curr.brand,
        rating: curr.rating,
        carName: curr.carName,
        model: curr.model,
        price: curr.price,
        speed: curr.speed,
        gps: curr.gps,
        seatType: curr.seatType,
        automatic: curr.automatic,
        description: curr.description,
        file: curr.file
    })

    useEffect(() => {
        setCurrId(curr._id);
        setValues({
            brand: curr.brand,
            rating: curr.rating,
            carName: curr.carName,
            model: curr.model,
            price: curr.price,
            speed: curr.speed,
            gps: curr.gps,
            seatType: curr.seatType,
            automatic: curr.automatic,
            description: curr.description,
            file: curr.file
        })
    }, [curr])

    const handleSubmit = async (e) => {

        e.preventDefault();

        const formData = new FormData();
        formData.append("brand", brand);
        formData.append("rating", rating);
        formData.append("carName", carName);
        formData.append("model", model);
        formData.append("price", price);
        formData.append("speed", speed);
        formData.append("gps", gps);
        formData.append("seatType", seatType);
        formData.append("automatic", automatic);
        formData.append("description", description);
        formData.append("file", file);

        if (currId == null || currId == undefined) 
        { 
            const response = await fetch("http://localhost:3000/api/cars", {
                method: 'POST',
                body: formData
            });

            const data = await response.json();
            console.log(data);
        } 
        else
        {
            const response = await fetch(`http://localhost:3000/api/cars/${currId}`, {
                method: 'PUT',
                body: formData
            });

            const data = await response.json();
            console.log(data);
        }

        setValues({
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
            file: null
        })
    };

    if (admin) {
        return (
            <div>
                <h1>Add Car</h1>

                <Form>
                    {/* Brand Name */}
                    <FormGroup>
                        <Label for="brand">
                            Brand Name
                        </Label>
                        <Input
                            id="brand"
                            value={brand}
                            name="brand"
                            onChange={(e) => setValues((prev) => ({ ...prev, brand: e.target.value }))}
                            placeholder="Enter the Car Brand Name"
                            type="text"
                        />
                    </FormGroup>
                    {/* Car Name */}
                    <FormGroup>
                        <Label for="carName">
                            Car Name
                        </Label>
                        <Input
                            id="carName"
                            value={carName}
                            name="carName"
                            onChange={(e) => setValues((prev) => ({ ...prev, carName: e.target.value }))}
                            placeholder="Enter the Car Name"
                            type="text"
                        />
                    </FormGroup>
                    <FormGroup>
                        <Label for="price">
                            Rent Price
                        </Label>
                        <Input
                            onChange={(e) => setValues((prev) => ({ ...prev, price: e.target.value < 1 ? 1 : e.target.value }))}
                            id="price"
                            value={price}
                            name="price"
                            min={1}
                            placeholder="Enter the Car Price"
                            type="number"
                        />
                    </FormGroup>
                    <FormGroup>
                        <Label for="model">
                            Model Number
                        </Label>
                        <Input
                            id="model"
                            value={model}
                            name="model"
                            onChange={(e) => setValues((prev) => ({ ...prev, model: e.target.value }))}
                            placeholder="Enter the Car Model Number"
                            type="text"
                        />
                    </FormGroup>
                    <FormGroup>
                        <Label for="rating">
                            Rating
                        </Label>
                        <Input
                            id="rating"
                            value={rating}
                            name="rating"
                            onChange={(e) => setValues((prev) => ({ ...prev, rating: e.target.value < 0 ? 0 : e.target.value }))}
                            placeholder="Enter the Car Rating"
                            type="number"
                        />
                    </FormGroup>
                    <FormGroup>
                        <Label for="speed">
                            Speed
                        </Label>
                        <Input
                            id="speed"
                            value={speed}
                            name="speed"
                            onChange={(e) => setValues((prev) => ({ ...prev, speed: e.target.value < 0 ? 0 : e.target.value }))}
                            placeholder="Enter the Car Speed"
                            type="number"
                        />
                    </FormGroup>
                    {/* GPS */}
                    <FormGroup className='d-flex gap-2'>
                        <Label for="gps">
                            GPS
                        </Label>
                        <Input
                            id="gps"
                            name="gps"
                            type="checkbox"
                            onChange={(e) => setValues((prev) => ({ ...prev, gps: e.target.checked }))}
                        />
                    </FormGroup>
                    {/* Seat Type */}
                    <FormGroup>
                        <Label for="seatType">
                            Seat Type
                        </Label>
                        <Input
                            id="seatType"
                            value={seatType}
                            name="seatType"
                            onChange={(e) => setValues((prev) => ({ ...prev, seatType: e.target.value }))}
                            placeholder="Enter the Seat Type"
                            type="text"
                        />
                    </FormGroup>
                    {/* Automatic */}
                    <FormGroup className='d-flex gap-2'>
                        <Label for="automatic">
                            Automatic
                        </Label>
                        <Input
                            id="automatic"
                            name="automatic"
                            type="checkbox"
                            onChange={(e) => setValues((prev) => ({ ...prev, automatic: e.target.checked }))}
                        />
                    </FormGroup>
                    {/* Description */}
                    <FormGroup>
                        <Label for="description">
                            Description
                        </Label>
                        <Input
                            id="description"
                            value={description}
                            name="description"
                            onChange={(e) => setValues((prev) => ({ ...prev, description: e.target.value }))}
                            placeholder="Enter the Car Description"
                            type="text"
                        />
                    </FormGroup>
                    <FormGroup>
                        <Label for="exampleFile">
                            File
                        </Label>
                        <Input
                            onChange={(e) => setValues((prev) => ({ ...prev, file: e.target.files[0] }))}
                            id="exampleFile"
                            name="file"
                            type="file"
                        />
                    </FormGroup>
                    <Button onClick={handleSubmit}>
                        Submit
                    </Button>
                </Form>
            </div>
        )
    }
    else {
        return <></>;
    }
}
