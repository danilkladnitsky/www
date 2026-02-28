"use client";

import { JobBadge } from "@/ui/job-badge/job-badge";
import styles from "./page.module.css";

export default function Home() {
  console.info("tg: @danilkladnitsky_work");
  console.info("linkedin: https://www.linkedin.com/in/danilkladnitsky/");

  const handleClick = () => {
    window.open("https://www.linkedin.com/in/danilkladnitsky/", "_blank");
  }

  return (
      <main className={styles.page}>
        <JobBadge onClick={handleClick} />
      </main>
  );
}
