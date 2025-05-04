import { Header } from "@/components/Header";
import { Outlet } from "react-router";
import styles from "./MainLayout.module.css";

const MainLayout = () => {
  return (
    <div>
      <Header title="Static page builder" />
      <main className={styles.main}>
        <Outlet />
      </main>
    </div>
  );
};

export default MainLayout;
