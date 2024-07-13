import React, { useState } from "react";
import styles from "./orderprocess.module.css";
import Image from "next/image";
import ImageUploader from "../uploadimage";
import { myaccountTranslation } from '@/locales';
const lang = process.env.NEXT_PUBLIC_LANG || 'dk';

const OrderProcess = () => {
  const mat = myaccountTranslation[lang];
  const [selectedOption, setSelectedOption] = useState("product");
  const [step, setStep] = useState(1);
  const [isPopupVisible, setPopupVisible] = useState(false);
 
  const togglePopup = () => {
    setPopupVisible(!isPopupVisible);
    window.scrollTo({ 
      top: 0,  
      behavior: 'smooth'
    }); 
  };
  const handlePrev = () => {
    if (step > 1) {
      setStep((prevStep) => prevStep - 1);
    }
    window.scrollTo({ 
      top: 0,  
      behavior: 'smooth'
    }); 
  };

  const handleNext = () => {
    if (step < 3) {
      // Assuming you have 3 steps
      setStep((prevStep) => prevStep + 1);
    }
  };

  const handleOptionChange = (e) => {
    setSelectedOption(e.target.value);
  };

  return (
    <>
      <main className={styles.mainorderPage}>
      
        <div className={styles.progressConatiner}>
          <div
            className={styles.progress}
            style={{ width: `${(step / 3) * 100}%` }}
          ></div>
          <div className={`${styles.circle} ${step >= 1 ? styles.active : ""}`}>
            1
          </div>
          <div className={`${styles.circle} ${step >= 2 ? styles.active : ""}`}>
            2
          </div>
          <div className={`${styles.circle} ${step >= 3 ? styles.active : ""}`}>
            3
          </div>
        </div>
        <div>
          <p className={`W-Body-Large-Bold ${styles.orderno}`}>
            {mat.orderNo}<span>#844474</span>
          </p>
        </div>
        {step === 1 && (
          <section>
            <div className={styles.claimForm}>
              <div className={styles.claimOptions}>
                <p className={`W-Body-Medium`}>{mat.myClaim}</p>
                <label className={styles.labelOption}>
                  <input
                    type="radio"
                    value="product"
                    checked={selectedOption === "product"}
                    onChange={handleOptionChange}
                  />
                  <span className={`W-Body-Medium`}>
                    {mat.problem}
                  </span>
                </label>
                <label className={styles.problemLable}>
                  <input
                    type="radio"
                    value="delivery"
                    checked={selectedOption === "delivery"}
                    onChange={handleOptionChange}
                  />
                  <span className={`W-Body-Medium`}>
                   {mat.problemD}
                  </span>
                </label>
              </div>
              <button
                type="button"
                className={styles.nextButton}
                onClick={handleNext}
              >
               {mat.next}
              </button>
            </div>
          </section>
        )}

        {step === 2 && (
          <section>
            <div className={styles.chooseOrder}>
              <div className={styles.fruitChoose}>
                <div className={styles.fruitDiv}>
                  <Image
                    src="/mockImage/Avocado.png"
                    alt="Dk"
                    height={41}
                    width={59}
                  />
                  <div className={styles.orderUnit}>
                    <p className={`M-Caption-Bold`}>{mat.avoCado}</p>
                    <p className={`M-Caption`}>{mat.unitOrder}</p>
                  </div>
                </div>
                <div>
                  <button className={styles.choose} onClick={togglePopup}>
                    {mat.choose}
                  </button>
                </div>
              </div>
              <div className={styles.fruitChoose}>
                <div className={styles.fruitDiv}>
                  <Image
                    src="/mockImage/Avocado.png"
                    alt="Dk"
                    height={41}
                    width={59}
                  />
                  <div className={styles.orderUnit}>
                  <p className={`M-Caption-Bold`}>{mat.avoCado}</p>
                  <p className={`M-Caption`}>{mat.unitOrder}</p>
                  </div>
                </div>
                <div>
                  <button className={styles.choose}>{mat.choose}</button>
                </div>
              </div>
              <div className={styles.fruitChoose}>
                <div className={styles.fruitDiv}>
                  <Image
                    src="/mockImage/Avocado.png"
                    alt="Dk"
                    height={41}
                    width={59}
                  />
                  <div className={styles.orderUnit}>
                  <p className={`M-Caption-Bold`}>{mat.avoCado}</p>
                  <p className={`M-Caption`}>{mat.unitOrder}</p>
                  </div>
                </div>
                <div>
                  <button className={styles.choose}>{mat.choose}</button>
                </div>
              </div>
            </div>
            {isPopupVisible && (
              <div className={styles.popup}>
                <div className={styles.popupContent}>
                  <span className={styles.close} onClick={togglePopup}>
                    &times;
                  </span>
                  <div className={styles.popupContainer}>
                    <p className={`W-Body-Large-Bold ${styles.orderno}`}>
                     {mat.orderNo}<span>#844474</span>
                    </p>
                    <div className={styles.issueContainer}>
                      <div className={styles.qualityIssue}>
                        <p className="W-Body-Large-Medium">{mat.qualityIsuue}</p>

                        <div className={styles.fruitQuality}>
                          <Image
                            src="/mockImage/Avocado.png"
                            alt="Dk"
                            height={92}
                            width={132}
                          />
                          <div className={styles.orderUnit}>
                            <p className={`W-Body-Large-Medium`}>
                            {mat.avoCado}
                            </p>
                            <p className={`W-Body-Regular ${styles.unitOrder}`}>1 unit ordered</p>
                          </div>
                        </div>
                      </div>
                      <div className={styles.issues}>
                        <p className="W-Body-Medium ">{mat.whatIs}</p>
                        <div className={styles.btngroup}>
                          <button>{mat.mold}</button>
                          <button>{mat.taste}</button>
                          <button>{mat.weight}</button>
                          <button>{mat.damage}</button>
                          <button>{mat.other}</button>
                        </div>
                      </div>
                      <div className={styles.issues}>
                        <p className="W-Body-Medium ">{mat.issueD}</p>

                        <input
                          type="text"
                          placeholder="Ex. Some tomatoes had mold on them."
                        ></input>
                      </div>

                      <div className={styles.issues}>
                        <p className="W-Body-Medium ">{mat.extent}</p>
                        <div className={styles.btngroup}>
                          <button>{mat.minor}</button>
                          <button>{mat.major}</button>
                          <button>{mat.everything}</button>
                        </div>
                      </div>
                      <div className={styles.issues}>
                      <p className="W-Body-Medium ">{mat.uploadImage}</p>
                        <ImageUploader/>
                      </div>
                      <div className={styles.issues}>
                        <p className="W-Body-Medium ">{mat.poNumber}</p>

                        <input
                          type="number"
                          placeholder="Enter PO Number"
                          className={styles.numberbox}
                        ></input>
                      </div>

                      <div className={styles.issues}>
                        <div className={styles.addissue}>
                          <button>{mat.addIssue}</button>
                          <button>{mat.cancel}</button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
            <div className={styles.nextBack}>
              <button
                className={`${styles.nextPrev} ${styles.backBtn}`}
                onClick={handlePrev}
              >
               {mat.back}
              </button>
              <button className={styles.nextPrev} onClick={handleNext}>
                {mat.next}
              </button>
            </div>
          </section>
        )}

        {step === 3 && (
          <section>
            <p className={`W-Body-Large-Bold ${styles.review}`}>
             {mat.review}
            </p>
            <div className={`${styles.chooseOrder} ${styles.updateOrder}`}>
              <div className={styles.fruitChoose}>
                <div className={styles.fruitDiv}>
                  <Image
                    src="/mockImage/Avocado.png"
                    alt="Dk"
                    height={41}
                    width={59}
                  />
                  <div className={styles.orderUnit}>
                    <p className={`M-Caption-Bold`}>{mat.avoCado}</p>
                    <p className={`M-Caption ${styles.moldfruit}`}>
                      <span className="M-Caption">{mat.mold}</span>
                      <span className="M-Caption">{mat.minor}</span>
                    </p>
                  </div>
                </div>
                <div>
                  <button className={styles.choose}>{mat.update}</button>
                </div>
              </div>
              <div className={styles.fruitChoose}>
                <div className={styles.fruitDiv}>
                  <Image
                    src="/mockImage/Avocado.png"
                    alt="Dk"
                    height={41}
                    width={59}
                  />
                  <div className={styles.orderUnit}>
                  <p className={`M-Caption-Bold`}>{mat.avoCado}</p>
                    <p className={`M-Caption ${styles.moldfruit}`}>
                    <span className="M-Caption">{mat.mold}</span>
                    <span className="M-Caption">{mat.minor}</span>
                    </p>
                  </div>
                </div>
                <div>
                <button className={styles.choose}>{mat.update}</button>
                </div>
              </div>
              <div className={styles.fruitChoose}>
                <div className={styles.fruitDiv}>
                  <Image
                    src="/mockImage/Avocado.png"
                    alt="Dk"
                    height={41}
                    width={59}
                  />
                  <div className={styles.orderUnit}>
                  <p className={`M-Caption-Bold`}>{mat.avoCado}</p>
                    <p className={`M-Caption ${styles.moldfruit}`}>
                    <span className="M-Caption">{mat.mold}</span>
                    <span className="M-Caption">{mat.minor}</span>
                    </p>
                  </div>
                </div>
                <div>
                <button className={styles.choose}>{mat.update}</button>
                </div>
              </div>
            </div>
            <div className={styles.reportIssues}>
              <p className="M-Body-Medium">
                {mat.howwould}
              </p>
              <div>
                <select className="W-Caption">
                  <option value="Coupon">{mat.coupon}</option>
                </select>
              </div>
              <p className={`W-Caption ${styles.couponCode}`}>
               {mat.couponCode}
              </p>
              <div className={styles.comment}>
                <p className="M-Body-Medium">{mat.additional}</p>
                <input
                  type="text"
                  placeholder="Please provide any additional information if you have"
                ></input>
              </div>
            </div>

            <div className={styles.nextBack}>
              <button
                className={`${styles.nextPrev} ${styles.backBtn}`}
                onClick={handlePrev}
              >
                {mat.back}
              </button>
              <button className={styles.nextPrev} onClick={handleNext}>
                {mat.next}
              </button>
            </div>
          </section>
        )}
      </main>
    </>
  );
};

export default OrderProcess;
