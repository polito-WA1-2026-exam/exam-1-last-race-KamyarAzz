import trainSvg from "../../assets/Train.gif";
import styles from "../../styles/loadingAnimation.module.css";

export default function Loading() {
  return (
    <div className="w-32 h-32 flex flex-col gap-6 p-2">
      <img src={trainSvg} alt="loading" className="w-full h-full" />
      <div className={styles.loader}></div>
    </div>
  );
}
