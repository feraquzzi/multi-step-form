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
          animate={{
            scale: props.isSubmitting ? [1, 1.05, 1] : 1,
          }}
          transition={{
            duration: 0.6,
            repeat: props.isSubmitting ? Infinity : 0,
          }}
          onClick={props.handleSubmit}
          className={`fbtnConfirm ${props.isCompleted ? "unconfirm" : "confirm"}`}
          style={{ opacity: props.isSubmitting ? 0.5 : 1 }}
          disabled={props.isSubmitting}
        >
          <motion.span
            key={props.isSubmitting ? "submitting" : "confirm"}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
          >
            {props.isSubmitting ? "Submitting..." : "Confirm"}
          </motion.span>
        </motion.button>
      )}
    </div>
  );
}
