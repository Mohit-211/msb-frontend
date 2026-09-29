import React, { useState } from "react";
import styles from "./sub.module.scss";
import CustomModal from "./Modal/Modal";
const Sub = ({ priceTypes,loading,createSubscription,stripe }) => {
  const [modalShow, setModalShow] = useState(false);
  const [price, setPrice] = useState();

  const handleModalOpen = (item) => {
    setPrice(item);
    setModalShow(true);
  };


  return (
    <div>
      <div className={styles.pricing}>
        {priceTypes?.map((item, index) => (
          <div className={styles.plan} key={index}>
            {item.unit_amount / 100} per {item.recurring.interval_count}{" "}
            {item.recurring.interval}
            {/* <div className={styles.price}>{props.amount}</div> */}
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
            <button onClick={() => handleModalOpen(item)}>
              Choose Plan
            </button>
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
        {/* <div className={`${styles.plan} ${styles.popular}`}>
        <span>Most Popular</span>
        <h2>Pro</h2>
        <div className={styles.price}>$10/month</div>
        <ul className={styles.features}>
          <li><i class="fas fa-check-circle"></i> Unlimited Websites</li>
          <li><i class="fas fa-check-circle"></i> 5 Users</li>
          <li><i class="fas fa-check-circle"></i> 512MB Space/website</li>
          <li><i class="fas fa-check-circle"></i> Continuous deployment</li>
          <li><i class="fas fa-check-circle"></i> Email Support</li>
        </ul>
        <button>Buy Now</button>
      </div>
      <div className={styles.plan}>
        <h2>Enterprise</h2>
        <div className={styles.price}>Custom Pricing</div>
        <ul className={styles.features}>
          <li><i class="fas fa-check-circle"></i> Unlimited Websites</li>
          <li><i class="fas fa-check-circle"></i> Unlimited Users</li>
          <li><i class="fas fa-check-circle"></i> Unlimited Space/website</li>
          <li><i class="fas fa-check-circle"></i> Continuous deployment</li>
          <li><i class="fas fa-check-circle"></i> 24/7 Email support</li>
        </ul>
        <button>Contact Us</button>
      </div> */}
      </div>
    </div>
  );
};
export default Sub;
