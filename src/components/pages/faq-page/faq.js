import { useState } from "react";
import styles from "./faq.module.css";
import Header from "@/components/atoms/Header/Header";
import Link from "next/link";
import { faqTranslation} from '@/locales';
const lang = process.env.NEXT_PUBLIC_LANG || 'dk';


const Faqs = () => {
  const faq = faqTranslation[lang];
  const accordionData = [
    {
      title: 'Where do you deliver to?',
      content: `We deliver to Jutland and the fixed islands, as well as Bornholm.`
    },
    {
      title: 'How much does delivery cost?',
      content: `Delivery cost depends on the location and size of the order. Please contact us for more information.`
    },
    {
      title: 'When do you deliver?',
      content: `We deliver on weekdays from 9 AM to 5 PM.`
    },
    {
      title: 'Can I choose what time of day I want delivery?',
      content:``
    },
    {
      title: 'Do I have to be at home on the day of delivery?',
      content:``
    }
    ,
    {
      title: 'Do you take the empty boxes back?',
      content:``
    },
    {
      title:'What if the delivery fails?',
      content:``
    },
    {
      title:'What do I do if I receive goods that do not meet our expectations?',
      content:``
    },
    {
      title:'Can you deliver to my holiday home?',
      content:``
    },
    {
      title:'Current delivery for Bornholm',
      content:``
    }
  ];

  const [openAccordionIndex, setOpenAccordionIndex] = useState(-1);

  const toggleAccordion = (index) => {
    setOpenAccordionIndex(openAccordionIndex === index ? -1 : index);
  };

  return (
    <>
      <section className={styles.faqssection}>
        <Header />
        <div className={styles.faqscontainer}>
          <h2>{faq.fq}&#x275C;S</h2>
          <div className={styles.faqsdelivery}>
            <div className={styles.contactcontainer}>
              <h3 className={styles.contactus}>{faq.contact}</h3>
              <p className={styles.emailnumber}>
                <Link href="mailto:info@fresh.land.com">{faq.info}</Link>
              </p>
              <p className={styles.emailnumber}>
                <Link href="tel:+53790707">{faq.num}</Link>
              </p>
              <p className={styles.dk}>{faq.indikaj}</p>
            </div>
            <div className={styles.delivery}>
              <h4>{faq.faqdelivery}</h4>
              <div className={styles.faqs}>
                {accordionData.map((item, index) => (
                  <div key={index} className={styles.faqscontent}>
                    <button
                      className={`W-Body-Large-Regular ${styles.accordion}`}
                      onClick={() => toggleAccordion(index)}
                    >
                      {item.title}
                      <i className={`fa-solid ${openAccordionIndex === index ? 'fa-xmark' : 'fa-plus'}`}></i>
                    </button>
                    {openAccordionIndex === index && (
                      <div className={`${styles.pannel} ${styles.open}`}>
                        <p className={`W-Body-Regular`}>
                          {item.content}
                        </p>
                      </div>
                    )}
                      <hr className={styles.horizontalLine} />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Faqs;
