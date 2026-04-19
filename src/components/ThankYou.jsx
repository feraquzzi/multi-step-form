import { motion } from "framer-motion";

export default function ThankYou({ isCompleted }) {
  return (
    <div>
      {isCompleted ? (
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className="thankyou-container"
        >
          <div className="thankyou-card">
            <div className="icon-wrapper">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="check-icon"
              >
                ✔
              </motion.div>
            </div>

            <h1>Thank you!</h1>

            <p>
              Thanks for confirming your subscription! We hope you have fun
              using our platform. If you ever need support, please feel free to
              email us at support@loremgaming.com.
            </p>
          </div>
        </motion.div>
      ) : (
        <p></p>
      )}
    </div>
  );
}
