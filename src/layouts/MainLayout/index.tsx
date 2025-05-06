import { Header } from "@/components/Header";
import { PropsWithChildren } from "react";
import styles from "./MainLayout.module.css";
import { motion } from "framer-motion";

const MainLayout = ({ children }: PropsWithChildren) => {
  return (
    <>
      <Header title="flodesk" />
      <motion.main
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5 }}
        className={styles.main}
      >
        {children}
      </motion.main>
    </>
  );
};

export default MainLayout;
