import React, { useEffect, useState } from "react";
import masterCard from "../../assets/all-images/master-card.jpg";
import { useNavigate } from "react-router-dom";
import "../../styles/payment-method.css";

const PaymentMethod = ({
  selectedPayment,
  handlePaymentChange,
  handleCheckout,
}) => {
  
  return (
    <>
      <div className="payment">
        <label htmlFor="bank-transfer" className="d-flex align-items-center gap-2">
          <input
            type="radio"
            id="bank-transfer"
            value="bank-transfer"
            checked={selectedPayment === "bank-transfer"}
            onChange={handlePaymentChange}
          />
          Direct Bank Transfer
        </label>
      </div>

      <div className="payment mt-3">
        <label htmlFor="cheque" className="d-flex align-items-center gap-2">
          <input
            type="radio"
            id="cheque"
            value="cheque"
            checked={selectedPayment === "cheque"}
            onChange={handlePaymentChange}
          />
          Cheque Payment
        </label>
      </div>

      <div className="payment mt-3 d-flex align-items-center justify-content-between">
        <label htmlFor="master-card" className="d-flex align-items-center gap-2">
          <input
            type="radio"
            id="master-card"
            value="master-card"
            checked={selectedPayment === "master-card"}
            onChange={handlePaymentChange}
          />
          Master Card
        </label>
        <img src={masterCard} alt="Master Card" />
      </div>

      <div className="payment mt-3 d-flex align-items-center justify-content-between">
        <label htmlFor="paypal" className="d-flex align-items-center gap-2" style={{
            paddingBottom: '10px',
            }}>
          <input
            type="radio"
            id="paypal"
            value="paypal"
            checked={selectedPayment === "paypal"}
            onChange={handlePaymentChange}
          />
          Paypal
        </label>
      </div>
      
      <button
         className="btnn btn-success"
          type="button" 
          style={{
            
            paddingTop: '10px',
            paddingBottom: '10px',
            paddingLeft: '30px',
            paddingRight: '30px',
            fontSize: '18px',
            fontWeight: 'bold',
            borderRadius: '8px',
           
            border: 'none',
            
            transition: 'background-color 0.3s ease'
          }}
          onClick={handleCheckout}
          >
           Checkout
          </button>
      
    </>
  );
};

export default PaymentMethod;
