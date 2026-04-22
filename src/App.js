import { useState } from "react";
import toast from "react-hot-toast";
import { Toaster } from "react-hot-toast";
import Steppers from "./components/Steppers";
import FormBtn from "./components/FormBtn";
import Forms from "./components/Forms";
import ThankYou from "./components/ThankYou";

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

  const [isSubmitting, setIsSubmitting] = useState(false);
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

  // function handleNext(e) {
  //   const newErrors = {};
  //   const { name, value } = e.target;

  //   if (!formData.name.trim()) {
  //     newErrors.name = "Name can be empty";
  //   }

  //   // if (!formData.email.trim()) {
  //   //   newErrors.email = "Email is required";
  //   // } else if (!formData.email.includes("@")) {
  //   //   newErrors.email = "Invalid email, must include @";
  //   // }

  //   if (name === "email") {
  //     if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim())) {
  //       newErrors.email = "Invalid email address";
  //     }
  //   }

  //   if (!formData.phone.trim()) {
  //     newErrors.phone = "Phone number cannot be empty";
  //   } else if (formData.phone.length < 11) {
  //     newErrors.phone = "Must be at least 12 characters long";
  //   }

  //   setErrors(newErrors);

  //   if (Object.keys(newErrors).length === 0) {

  //   }
  // }

  function handleNext() {
    let newErrors = {};

    // Name validation
    if (!/^[A-Za-z]+([ '-][A-Za-z]+)*$/.test(formData.name.trim())) {
      newErrors.name = "Wrong name format";
    }

    // Email validation
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) {
      newErrors.email = "Invalid email address";
    }

    // Phone validation
    if (!/^\+?[0-9]{10,14}$/.test(formData.phone.trim())) {
      newErrors.phone = "Invalid phone number";
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      if (step < 4) {
        setStep((c) => c + 1);
        setForms((f) => f + 1);
      }
    }
  }

  const handleSubmit = async () => {
    try {
      setIsSubmitting(true);
      const res = await fetch(
        "https://reanalyze-backache-purchase.ngrok-free.dev/api/user",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        },
      );

      if (!res.ok) {
        throw new Error("Something went wrong!");
      }

      const data = await res.json();
      console.log(data);

      toast.success("Submitted successfully!");
      setIsCompleted(true);
    } catch (error) {
      console.error("Error:", error);

      if (error.message === "Failed to fetch") {
        toast.error("Cannot connect to server");
      } else {
        toast.error(error.message || "Submission failed");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const isMobile = window.innerWidth <= 768;

  return (
    <div className="App">
      <div className="formWrap">
        <Toaster
          position="top-right"
          containerStyle={{
            top: isMobile ? 100 : 60,
            right: isMobile ? 50 : 280,
          }}
          toastOptions={{
            duration: 4000,
            style: {
              borderRadius: "10px",
              fontSize: "14px",
              padding: "14px 18px",
              background: "#1f2937",
              color: "#16a34a",
            },
            success: {
              style: {
                background: "#fff",
              },
            },
            error: {
              style: {
                color: "#fff",
                background: "#dc2626",
              },
            },
          }}
        />
        <Steppers step={step} active={active} />
        <div className="form">
          <div className="onlyForm">
            {!isCompleted ? (
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
                isSubmitting={isSubmitting}
              />
            ) : (
              <ThankYou />
            )}
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
            isSubmitting={isSubmitting}
          />
        </div>
      </div>
    </div>
  );
}
