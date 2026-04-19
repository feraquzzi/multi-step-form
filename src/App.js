import { useState } from "react";
import Steppers from "./components/Steppers";
import FormBtn from "./components/FormBtn";
import Forms from "./components/Forms";

export default function App() {
  const [step, setStep] = useState(1);
  const [active] = useState("active");
  const [next] = useState("showBtn");
  const [forms, setForms] = useState(1);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    plan: "arcade",
    addons: {
      online: false,
      storage: false,
      profile: false,
    },
    billing: "monthly",
  });
  const [errors, setErrors] = useState({});
  const [isCompleted, setIsCompleted] = useState(false);

  function handleChange(e) {
    const { name, value } = e.target;

    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  }

  function handlePrevious() {
    if (step > 1) {
      setStep((c) => c - 1);
      setForms((f) => f - 1);
    }

    setIsCompleted(false);
  }

  function handleNext() {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = "Name can be empty";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!formData.email.includes("@")) {
      newErrors.email = "Invalid email, must include @";
    }

    if (!formData.phone.trim()) {
      newErrors.phone = "Phone number cannot be empty";
    } else if (formData.phone.length < 11) {
      newErrors.phone = "Must be at least 12 characters long";
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      if (step < 4) {
        setStep((c) => c + 1);
        setForms((f) => f + 1);
      }
    }
  }

  //this is where i submit my form data
  // function handleSubmit(e) {
  //   e.preventDefault();

  //   setIsCompleted(true);
  //   console.log(formData);
  // }

  const handleSubmit = async () => {
    try {
      const res = await fetch("http://localhost:8080/api/user", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      console.log(data);

      //shows thankYou page
      setIsCompleted(true);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="App">
      <div className="formWrap">
        <Steppers step={step} active={active} />
        <div className="form">
          <div className="onlyForm">
            <Forms
              form={forms}
              formData={formData}
              handleChange={handleChange}
              setFormData={setFormData}
              handleNext={handleNext}
              handlePrevious={handlePrevious}
              errors={errors}
              setErrors={setErrors}
              isCompleted={isCompleted}
            />
          </div>

          <FormBtn
            forms={forms}
            next={next}
            step={step}
            handleSubmit={handleSubmit}
            setStep={setStep}
            setForms={setForms}
            errors={errors}
            setErrors={setErrors}
            formData={formData}
            handleNext={handleNext}
            handlePrevious={handlePrevious}
            isCompleted={isCompleted}
          />
        </div>
      </div>
    </div>
  );
}
