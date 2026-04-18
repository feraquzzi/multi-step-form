import { motion } from "framer-motion";

export default function FormBtn(props) {
  return (
    <div className="formBtn">
      {!props.isCompleted ? (
        <button
          className={`fbtnPrev ${props.step <= 1 ? "notShowBtn" : "showBtn"}`}
          onClick={props.handlePrevious}
        >
          Go Back
        </button>
      ) : (
        <span></span>
      )}

      {props.step !== 4 ? (
        <motion.button
          whileTap={{ scale: 0.95 }}
          className="fbtn"
          onClick={props.handleNext}
        >
          Next step
        </motion.button>
      ) : (
        <motion.button
          whileTap={{ scale: 0.95 }}
          onClick={props.handleSubmit}
          className={`fbtnConfirm ${props.isCompleted ? "unconfirm" : "confirm"}`}
        >
          Confirm
        </motion.button>
      )}
    </div>
  );
}
