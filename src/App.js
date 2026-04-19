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

  // useEffect(() => {
  //   if (isCompleted) {
  //     toast.success("Submitted!");
  //   }
  // }, [isCompleted]);

  const handleSubmit = async () => {
    try {
      setIsSubmitting(true);
      const res = await fetch("https://jsonplaceholder.typicode.com/posts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

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

  return (
    <div className="App">
      <div className="formWrap">
        <Toaster
          position="top-right"
          toastOptions={{
            duration: 3000,
            style: {
              borderRadius: "8px",
              fontSize: "14px",
            },
          }}
          containerStyle={{
            top: 60,
            right: 280,
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
