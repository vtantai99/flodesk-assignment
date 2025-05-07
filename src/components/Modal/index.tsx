import { motion, AnimatePresence } from "framer-motion";
import styles from "./Modal.module.css";
import { PropsWithChildren } from "react";

interface ModalProps extends PropsWithChildren {
  isOpen: boolean;
  title?: string;
  onClose: () => void;
}

const modalVariants = {
  hidden: { opacity: 0, y: -50 },
  visible: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: 50 },
};

const Modal = ({ isOpen, title, children, onClose }: ModalProps) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <div className={styles.centerWrapper} onClick={onClose}>
            <motion.div
              className={styles.modal}
              variants={modalVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              transition={{ duration: 0.3 }}
              onClick={(e) => e.stopPropagation()}
            >
              <h2 className={styles.header}>{title}</h2>
              <button className={styles.closeBtn} onClick={onClose}>
                &times;
              </button>
              <div className={styles.body}>{children}</div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
};

export default Modal;
