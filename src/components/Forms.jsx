import { useState } from "react";
import { motion } from "framer-motion";
import ThankYou from "./ThankYou";

export default function Forms(props) {
  const [isYearly, setIsYearly] = useState(false);
  const hasError = (field) => props.errors[field]?.trim();

  const plans = [
    {
      key: "arcade",
      title: "Arcade",
      price: isYearly ? 90 : 9,
      icon: "🎮",
      discount: isYearly ? "2 months Free" : null,
    },
    {
      key: "advanced",
      title: "Advanced",
      price: isYearly ? 120 : 12,
      icon: "🕹️",
      discount: isYearly ? "2 months Free" : null,
    },
    {
      key: "pro",
      title: "Pro",
      price: isYearly ? 150 : 15,
      icon: "🎯",
      discount: isYearly ? "2 months Free" : null,
    },
  ];

  const addonsList = [
    {
      key: "online",
      title: "Online service",
      desc: "Access to multiplayer games",
      price: {
        monthly: 1,
        yearly: 10,
      },
    },
    {
      key: "storage",
      title: "Larger storage",
      desc: "Extra 1TB of cloud save",
      price: {
        monthly: 2,
        yearly: 20,
      },
    },
    {
      key: "profile",
      title: "Customizable profile",
      desc: "Custom theme on your profile",
      price: {
        monthly: 2,
        yearly: 20,
      },
    },
  ];

  const isYear = props.formData.billing === "yearly";

  function handleSelect(plan) {
    props.setFormData((prev) => ({
      ...prev,
      plan: plan,
    }));
  }

  function handleToggle(addon) {
    props.setFormData((prev) => ({
      ...prev,
      addons: {
        ...prev.addons,
        [addon]: !prev.addons[addon],
      },
    }));
  }

  function handleYearMonthToggle() {
    setIsYearly(!isYearly);
    props.setFormData((prev) => ({
      ...prev,
      billing: prev.billing === "monthly" ? "yearly" : "monthly",
    }));
  }

  // const isYearly = props.formData.billing === "yearly";

  const selectedPlan = plans.find((p) => p.key === props.formData.plan);

  const planPrice = selectedPlan?.price || 0;

  const addonsTotal = addonsList
    .filter((a) => props.formData.addons[a.key])
    .reduce((total, a) => {
      const price = isYear ? a.price.yearly : a.price.monthly;
      return total + price;
    }, 0);

  const total = planPrice + addonsTotal;

  // console.log(planPrice);
  // console.log(addonsTotal);
  // console.log(total);

  // console.log(props);
  return (
    <>
      <form className={`allForms ${props.isCompleted ? "noForm" : "showForm"}`}>
        {props.form === 1 && (
          <>
            <div className="segment">
              <div className="seg">
                <h1>Personal Info</h1>
                <p>
                  Please provide your name, email address, and phone number.
                </p>
              </div>

              <motion.div
                initial={{ opacity: 0, y: -50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ ease: "easeIn", duration: 0.8 }}
                className="form-container"
              >
                <div className="form-group">
                  <label className="inputTop">Name</label>

                  <input
                    className={`${hasError("name") ? "runa" : " "}`}
                    type="text"
                    placeholder="e.g. Stephen King"
                    name="name"
                    value={props.formData.name}
                    onChange={props.handleChange}
                  />

                  <span className="formErrors">{props.errors.name}</span>
                </div>

                <div className="form-group">
                  <label>Email Address</label>
                  <input
                    className={`${hasError("email") ? "runa" : " "}`}
                    type="email"
                    placeholder="e.g. stephenking@lorem.com"
                    name="email"
                    value={props.formData.email}
                    onChange={props.handleChange}
                  />
                  <span className="formErrors">{props.errors.email}</span>
                </div>

                <div className="form-group">
                  <label>Phone Number</label>
                  <input
                    className={`${hasError("phone") ? "runa" : " "}`}
                    type="tel"
                    placeholder="e.g. +1 234 567 890"
                    name="phone"
                    value={props.formData.phone}
                    onChange={props.handleChange}
                  />
                  <span className="formErrors">{props.errors.phone}</span>
                </div>
              </motion.div>
            </div>
          </>
        )}

        {props.form === 2 && (
          <>
            <div className="segment">
              <div className="seg">
                <h1>Select your plan</h1>
                <p>You have the option of monthly or yearly billing.</p>
              </div>

              <motion.div
                initial={{ opacity: 0, y: -50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ ease: "easeIn", duration: 0.8 }}
                className="plans-container"
              >
                {plans.map((plan) => (
                  <div
                    key={plan.key}
                    className={`plan-card ${
                      props.formData.plan === plan.key ? "active" : ""
                    }`}
                    onClick={() => handleSelect(plan.key)}
                  >
                    <div className="plan-icon">{plan.icon}</div>

                    <div className="plan-info">
                      <h3>{plan.title}</h3>
                      <p>${plan.price}</p>
                      <span>{plan.discount}</span>
                    </div>
                  </div>
                ))}
              </motion.div>

              <div className="billing-toggle">
                <span className={!isYearly ? "active1" : ""}>Monthly</span>

                <div
                  className={`toggle-switch ${isYearly ? "yearly" : ""}`}
                  onClick={handleYearMonthToggle}
                >
                  <div className="toggle-circle"></div>
                </div>

                <span className={isYearly ? "active1" : ""}>Yearly</span>
              </div>
            </div>
          </>
        )}

        {props.form === 3 && (
          <>
            <div className="segment">
              <div className="seg">
                <h1>Pick Add-ons</h1>
                <p>Add-ons help enhance your gaming experience.</p>
              </div>

              <motion.div
                initial={{ opacity: 0, y: -50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ ease: "easeIn", duration: 0.8 }}
                className="addons-container"
              >
                {addonsList.map((addon) => (
                  <label
                    key={addon.key}
                    className={`addon-card ${
                      props.formData.addons[addon.key] ? "active" : ""
                    }`}
                  >
                    <input
                      type="checkbox"
                      checked={props.formData.addons[addon.key]}
                      onChange={() => handleToggle(addon.key)}
                    />

                    <div className="checkmark">
                      {props.formData.addons[addon.key] && "✔"}
                    </div>

                    <div className="addon-content">
                      <h4>{addon.title}</h4>
                      <p>{addon.desc}</p>
                    </div>

                    <div className="addon-price">
                      +$
                      {isYearly ? addon.price.yearly : addon.price.monthly}/
                      {isYearly ? "yr" : "mo"}
                    </div>
                  </label>
                ))}
              </motion.div>
            </div>
          </>
        )}

        {props.form === 4 && (
          <>
            <div className="segment nutin">
              <div className="seg">
                <h1>Finishing up</h1>
                <p>Double-check everything looks OK before confirming.</p>
              </div>

              <motion.div
                initial={{ opacity: 0, y: -50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ ease: "easeIn", duration: 0.8 }}
                className="addons-contain"
              >
                <div className="addons">
                  {plans
                    .filter((plan) => props.formData.plan === plan.key)
                    .map((plan) => (
                      <div key={plan.key} className="summaryHead">
                        <div className="plan-header">
                          <h3
                            className="price"
                            style={{ color: "#03295a", marginTop: "10px" }}
                          >
                            {plan.title}
                            {isYear ? "(Yearly)" : "(Monthly)"}
                          </h3>
                          <button
                            className="change-btn"
                            style={{
                              color: "grey",
                              textDecoration: "underline",
                            }}
                          >
                            Change
                          </button>
                        </div>

                        <span
                          style={{
                            color: "#03295a",
                            fontWeight: "700",
                            marginTop: "10px",
                          }}
                        >
                          {isYear} +${plan.price} {isYear ? "/yr" : "/mo"}
                        </span>
                      </div>
                    ))}
                </div>

                <hr />

                <div className="summaryAddon">
                  {addonsList
                    .filter((addon) => props.formData.addons[addon.key])
                    .map((addon) => (
                      <div key={addon.key} className="summaryBody">
                        <span style={{ color: "grey" }}>{addon.title}</span>
                        <span
                          style={{ color: "#03295a", marginBottom: "15px" }}
                        >
                          +$
                          {isYear
                            ? addon.price.yearly
                            : addon.price.monthly}{" "}
                          {isYear ? "/yr" : "/mo"}
                        </span>
                      </div>
                    ))}
                </div>
              </motion.div>

              <motion.div className="total">
                <span>Total {isYear ? "(per year)" : "(per month)"}</span>
                <span className="total-price">
                  +${total}/{isYearly ? "yr" : "mo"}
                </span>
              </motion.div>
            </div>

            <ThankYou isCompleted={props.isCompleted} />
          </>
        )}
      </form>
    </>
  );
}
