import styles from "@/components/pages/MyAccount/Account.module.css";
import Header from "@/components/atoms/Header/Header";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const Faqs = () => {
  return (
    <>
      <div className={styles.myaccount}>
        <div className={styles.Headeraccount}>
          <Header />
        </div>
        <div className={styles.accountSkeleton}>
          <Skeleton width={300} height={50} />
          <div className={styles.newskl}>
            <Skeleton width={100} height={20} />
            <Skeleton width={100} height={20} />
            <Skeleton width={100} height={20} />
            <Skeleton width={100} height={20} />
            <Skeleton width={100} height={20} />
            <Skeleton width={100} height={20} />
            
          </div>
          <Skeleton width={800} height={20} />

          <div className={styles.skeletonTable}>
            <table className={styles.table}>
              <thead>
                <tr>
                  <th>
                    {" "}
                    <Skeleton width={110} height={20} />
                  </th>
                  <th>
                    {" "}
                    <Skeleton width={110} height={20} />
                  </th>
                  <th>
                    {" "}
                    <Skeleton width={110} height={20} />
                  </th>
                  <th>
                    {" "}
                    <Skeleton width={110} height={20} />
                  </th>
                  <th>
                    {" "}
                    <Skeleton width={110} height={20} />
                  </th>
                  <th>
                    {" "}
                    <Skeleton width={110} height={20} />
                  </th>
                  <th>
                    {" "}
                    <Skeleton width={30} height={20} />
                  </th>
                  <th>
                    {" "}
                    <Skeleton width={70} height={20} />
                  </th>
                  <th>
                    {" "}
                    <Skeleton width={70} height={20} />
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>
                    {" "}
                    <Skeleton width={110} height={20} />
                  </td>
                  <td>
                    {" "}
                    <Skeleton width={110} height={20} />
                  </td>
                  <td>
                    {" "}
                    <Skeleton width={110} height={20} />
                  </td>
                  <td>
                    {" "}
                    <Skeleton width={110} height={20} />
                  </td>
                  <td>
                    {" "}
                    <Skeleton width={110} height={20} />
                  </td>
                  <td>
                    {" "}
                    <Skeleton width={110} height={20} />
                  </td>
                  <td>
                    {" "}
                    <Skeleton width={30} height={20} />
                  </td>
                  <td>
                    {" "}
                    <Skeleton width={70} height={20} />
                  </td>
                  <td>
                    {" "}
                    <Skeleton width={70} height={20} />
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
};

export default Faqs;
