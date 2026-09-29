import React, { useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import {
  CardElement,
  Elements,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import styles from "./CheckoutForm.module.scss";
import { useEffect } from "react";
import DescriptionAlerts from "@/Constants/alert/alert";
import CustomModal from "../Modal/Modal";
import { Button } from "react-bootstrap";
import { getLocalStorageItem } from "@/Constants/Api/Api";
import { API_URL } from "@/Constants/host";
const stripePromise = loadStripe(
  "pk_test_51MdIF9SJPxqRN9bb510qJMORkThvx0ZipxzG5nyu4d5WmEE2KHnAt1SC4HEwtTw05G2pAFLts5kvGPyXZ6fWTKSZ00Wt2Als23"
);
function CheckoutForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [price, setPrice] = useState();
  const [loading, setLoading] = useState(false);
  const [priceTypes, setPriceTypes] = useState([]);
  const [selectedPrice, setSelectedPrice] = useState("");
  const [alert, setAlert] = useState(false);
  const [modalShow, setModalShow] = useState(false);
  const [alertConfig, setAlertConfig] = useState({
    text: "",
  });
  const handleModalOpen = (item) => {
    setPrice(item);
    setModalShow(true);
  };
  const storedValue = getLocalStorageItem("UserLoginToken");
  const [errors, setErrors] = useState();
  const stripe = useStripe();
  const elements = useElements();
  const validateForm = () => {
    const newErrors = {};
    if (!name) newErrors.name = "Name is required";
    if (!email) newErrors.email = "Email is required";
    if (!selectedPrice) newErrors.price_id = "Please Select a price type!";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  const card = elements?.getElement(CardElement);
  const createSubscription = async (name, email, priceId) => {
    setLoading(true);
    try {
      if (!stripe || !elements) {
        setLoading(false);
        return;
      }
      const cardElement = elements.getElement(CardElement);
      const { error: stripeError, paymentMethod } =
        await stripe.createPaymentMethod({
          type: "card",
          card: cardElement,
          billing_details: {
            name,
            email,
          },
        });
      if (stripeError) {
        setAlert(true);
        setAlertConfig({
          text: stripeError.message || "Card Details are Invalid",
          icon: "error",
        });
        setLoading(false);
        return;
      }
      const response = await fetch(
        `${API_URL}/payment/stripe/create-subscription`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "x-access-token": storedValue,
          },
          body: JSON.stringify({
            paymentMethod: paymentMethod.id,
            name,
            email,
            priceId: priceId,
          }),
        }
      );
      const responseData = await response.json();
      const { clientSecret } = responseData;
      const confirmPayment = await stripe.confirmCardPayment(clientSecret);
      if (confirmPayment.error) {
        setAlert(true);
        setAlertConfig({
          text: confirmPayment.error.message,
          icon: "error",
        });
      } else {
        setAlert(true);
        setAlertConfig({
          text: "You have Successfully Subscribed",
          icon: "success",
        });
      }
      setLoading(false);
    } catch (error) {
      setAlert(true);
      setAlertConfig({
        text: "An error occurred during payment processing",
        icon: "error",
      });
      setLoading(false);
      console.error("Error creating subscription:", error);
    }
  };
  // for price
  useEffect(() => {
    const fetchPaymentTypes = async () => {
      try {
        const response = await fetch(
          `${API_URL}/payment/stripe/price/list`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              "x-access-token": storedValue,
            },
          }
        );
        const types = await response.json();
        setPriceTypes(types.data.sort((a, b) => a.unit_amount - b.unit_amount));
      } catch (error) {
        console.log(error, "error")
      }
    };
    fetchPaymentTypes();
  }, []);
  return (
    <>
      {alert ? (
        <DescriptionAlerts text={alertConfig.text} icon={alertConfig.icon} />
      ) : null}
      <div>
        <div className={styles.pricing}>
          {priceTypes.map((item, index) => (
            <div className={styles.plan} key={index}>
              {item.unit_amount / 100} / {item.recurring.interval_count}{" "}
              {item.recurring.interval}
              <ul className={styles.features}>
                <li>
                  <i class="fas fa-check-circle"></i> Unlimited Websites
                </li>
                <li>
                  <i class="fas fa-check-circle"></i> 1 User
                </li>
                <li>
                  <i class="fas fa-check-circle"></i> 100MB Space/website
                </li>
                <li>
                  <i class="fas fa-check-circle"></i> Continuous deployment
                </li>
                <li>
                  <i class="fas fa-times-circle"></i> No priority support
                </li>
              </ul>
              <button onClick={() => handleModalOpen(item)}>Choose Plan</button>
            </div>
          ))}
          <CustomModal
            price={price}
            loading={loading}
            createSubscription={createSubscription}
            stripe={stripe}
            show={modalShow}
            onHide={() => setModalShow(false)}
          />
        </div>
      </div>
    </>
  );
}
const StripePayment = () => {
  return (
    <Elements stripe={stripePromise}>
      <CheckoutForm />
    </Elements>
  );
};
export default StripePayment;
