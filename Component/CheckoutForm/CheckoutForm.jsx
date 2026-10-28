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
import { CircleCheck, CircleX } from "lucide-react";
import { toast } from "@/Component/ui/toast/toast";
import CustomModal from "../Modal/Modal";
import { getLocalStorageItem } from "@/Constants/Api/Api";
import { API_URL } from "@/Constants/host";
const stripePromise = loadStripe(
  "pk_test_51MdIF9SJPxqRN9bb510qJMORkThvx0ZipxzG5nyu4d5WmEE2KHnAt1SC4HEwtTw05G2pAFLts5kvGPyXZ6fWTKSZ00Wt2Als23"
);
function CheckoutForm() {
  const [price, setPrice] = useState();
  const [loading, setLoading] = useState(false);
  const [priceTypes, setPriceTypes] = useState([]);
  const [modalShow, setModalShow] = useState(false);
  const handleModalOpen = (item) => {
    setPrice(item);
    setModalShow(true);
  };
  const storedValue = getLocalStorageItem("UserLoginToken");
  const stripe = useStripe();
  const elements = useElements();
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
        toast.error(stripeError.message || "Card Details are Invalid");
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
        toast.error(confirmPayment.error.message);
      } else {
        toast.success("You have Successfully Subscribed");
      }
      setLoading(false);
    } catch (error) {
      toast.error("An error occurred during payment processing");
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
      <div>
        <div className={styles.pricing}>
          {priceTypes.map((item, index) => (
            <div className={styles.plan} key={index}>
              {item.unit_amount / 100} / {item.recurring.interval_count}{" "}
              {item.recurring.interval}
              <ul className={styles.features}>
                <li>
                  <CircleCheck size={18} className={styles.included} aria-hidden="true" /> Unlimited Websites
                </li>
                <li>
                  <CircleCheck size={18} className={styles.included} aria-hidden="true" /> 1 User
                </li>
                <li>
                  <CircleCheck size={18} className={styles.included} aria-hidden="true" /> 100MB Space/website
                </li>
                <li>
                  <CircleCheck size={18} className={styles.included} aria-hidden="true" /> Continuous deployment
                </li>
                <li>
                  <CircleX size={18} className={styles.excluded} aria-hidden="true" /> No priority support
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
