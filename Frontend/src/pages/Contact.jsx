import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Container, Row, Col, Form, FormGroup, Input } from "reactstrap";
import Helmet from "../components/Helmet/Helmet";
import CommonSection from "../components/UI/CommonSection";

import "../styles/contact.css";
import { AuthContext } from "../components/AuthContext";

const socialLinks = [
  {
    url: "#",
    icon: "ri-facebook-line",
  },
  {
    url: "#",
    icon: "ri-instagram-line",
  },
  {
    url: "#",
    icon: "ri-linkedin-line",
  },
  {
    url: "#",
    icon: "ri-twitter-line",
  },
];

const Contact = () => {
  const navigate = useNavigate();

  const {user, sendMessage} = useContext(AuthContext);

  const [{name, email, message}, setValues] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleSend = async (e) => {
    e.preventDefault();

    if(user)
    {
      console.log(name, email, message);
      await sendMessage(name, email, message);
      setValues({
        name: "",
        email: "",
        message: "",
      });
    }
    else
    {
      alert("You need to login first to send message");
      navigate("/login");
    }
  }

  return (
    <Helmet title="Contact">
      <CommonSection title="Contact" />
      <section>
        <Container>
          <Row>
            <Col lg="7" md="7">
              <h6 className="fw-bold mb-4">Get In Touch</h6>

              <Form onSubmit={handleSend}>
                <FormGroup className="contact__form">
                  <Input value={name} onChange={(e) => {setValues({ name : e.target.value, email, message})}} placeholder="Your Name" type="text" />
                </FormGroup>
                <FormGroup className="contact__form">
                  <Input value={email} onChange={(e) => {setValues({email : e.target.value, message, name})}} placeholder="Email" type="email" />
                </FormGroup>
                <FormGroup className="contact__form">
                  <textarea
                  value={message} onChange={(e) => {setValues({message : e.target.value, email, name})}}
                    rows="5"
                    placeholder="Message"
                    className="textarea"
                  ></textarea>
                </FormGroup>

                <button className=" contact__btn" type="submit">
                  Send Message
                </button>
              </Form>
            </Col>

            <Col lg="5" md="5">
              <div className="contact__info">
                <h6 className="fw-bold">Contact Information</h6>
                <p className="section__description mb-0">
                  India
                </p>
                <div className=" d-flex align-items-center gap-2">
                  <h6 className="fs-6 mb-0">Phone:</h6>
                  <p className="section__description mb-0">91-5152xxxxx</p>
                </div>

                <div className=" d-flex align-items-center gap-2">
                  <h6 className="mb-0 fs-6">Email:</h6>
                  <p className="section__description mb-0">wheeldeal@gmail.com</p>
                </div>

                <h6 className="fw-bold mt-4">Follow Us</h6>

                <div className=" d-flex align-items-center gap-4 mt-3">
                  {socialLinks.map((item, index) => (
                    <Link
                      to={item.url}
                      key={index}
                      className="social__link-icon"
                    >
                      <i className={item.icon}></i>
                    </Link>
                  ))}
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
    </Helmet>
  );
};

export default Contact;
