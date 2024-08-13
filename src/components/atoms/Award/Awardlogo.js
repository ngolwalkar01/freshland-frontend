import awardStyles from "./Award.module.css";
import Image from 'next/image'
import { homepageTranslation } from '@/locales';

const lang = process.env.NEXT_PUBLIC_LANG || 'se';

const Awardlogo = () => {
  const hpt = homepageTranslation[lang];
   return (
    <div className={awardStyles.bgcontainer}>
        <h1 className={awardStyles.heading}>{hpt.awards}</h1>
    <div className={awardStyles.container}>
    
      <div className={awardStyles.gridContainer}>
          <div className={awardStyles.gridItem}>
            <div className={awardStyles.card}>
              <Image
                className={awardStyles.image}
                src="/Images/Award1.png"
                alt="Solar Impulse"
                width={152.65}
                height={152.65}
                loading="lazy"
              />
              <div className={awardStyles.content}>
                <p className={awardStyles.name}>{hpt.solarImpulse}</p>
              </div>
            </div>
          </div>

          <div className={awardStyles.gridItem}>
            <div className={awardStyles.card}>
              <Image
                className={awardStyles.image}
                src="/Images/Award2.png"
                alt="Mission Innovation"
                width={152.65}
                height={152.65}
                loading="lazy"
              />
              <div className={awardStyles.content}>
                <p className={awardStyles.name}>{hpt.missionInnovation}</p>
              </div>
            </div>
          </div>
          <div className={awardStyles.gridItem}>
            <div className={awardStyles.card}>
              <Image
                className={awardStyles.image}
                src="/Images/Award3.png"
                alt="Agriculture Winner "
                width={152.65}
                height={152.65}
                loading="lazy"
              />
              <div className={awardStyles.content}>
                <p className={awardStyles.name}>{hpt.fAO}</p>
              </div>
            </div>
          </div>
          <div className={awardStyles.gridItem}>
            <div className={awardStyles.card}>
              <Image
                className={awardStyles.image}
                src="/Images/Award4.png"
                alt="Denmark Winner"
                width={152.65}
                height={152.65}
                loading="lazy"
              />
              <div className={awardStyles.content}>
                <p className={awardStyles.name}>{hpt.sDG}</p>
              </div>
            </div>
          </div>
      

          <div className={awardStyles.gridItem}>
            <div className={awardStyles.card}>
              <Image
                className={awardStyles.image}
                src="/Images/Award5.png"
                alt="WWF Climate Solver"
                width={152.65}
                height={152.65}
                loading="lazy"
              />
              <div className={awardStyles.content}>
                <p className={awardStyles.name}>{hpt.wWF}</p>
              </div>
            </div>
          </div>
      
          <div className={awardStyles.gridItem}>
            <div className={awardStyles.card}>
              <Image
                className={awardStyles.image}
                src="/Images/Award6.png"
                alt="United Nations"
                width={152.65}
                height={152.65}
                loading="lazy"
              />
              <div className={awardStyles.content}>
                <p className={awardStyles.name}>{hpt.unitedNations}</p>
              </div>
            </div>
          </div>
             <div className={awardStyles.gridItem}>
            <div className={awardStyles.card}>
              <Image
                className={awardStyles.image}
                src="/Images/Award1.png"
                alt="Solar Impulse"
                width={152.65}
                height={152.65}
                loading="lazy"
              />
              <div className={awardStyles.content}>
                <p className={awardStyles.name}>{hpt.solarImpulse}</p>
              </div>
            </div>
          </div>

          <div className={awardStyles.gridItem}>
            <div className={awardStyles.card}>
              <Image
                className={awardStyles.image}
                src="/Images/Award2.png"
                alt="Mission Innovation"
                width={152.65}
                height={152.65}
                loading="lazy"
              />
              <div className={awardStyles.content}>
                <p className={awardStyles.name}>{hpt.missionInnovation}</p>
              </div>
            </div>
          </div>
          <div className={awardStyles.gridItem}>
            <div className={awardStyles.card}>
              <Image
                className={awardStyles.image}
                src="/Images/Award3.png"
                alt="Agriculture Winner "
                width={152.65}
                height={152.65}
                loading="lazy"
              />
              <div className={awardStyles.content}>
                <p className={awardStyles.name}>{hpt.fAO}</p>
              </div>
            </div>
          </div>
          <div className={awardStyles.gridItem}>
            <div className={awardStyles.card}>
              <Image
                className={awardStyles.image}
                src="/Images/Award4.png"
                alt="Denmark Winner"
                width={152.65}
                height={152.65}
                loading="lazy"
              />
              <div className={awardStyles.content}>
                <p className={awardStyles.name}>{hpt.sDG}</p>
              </div>
            </div>
          </div>
      

          <div className={awardStyles.gridItem}>
            <div className={awardStyles.card}>
              <Image
                className={awardStyles.image}
                src="/Images/Award5.png"
                alt="WWF Climate Solver"
                width={152.65}
                height={152.65}
                loading="lazy"
              />
              <div className={awardStyles.content}>
                <p className={awardStyles.name}>{hpt.wWF}</p>
              </div>
            </div>
          </div>
      
          <div className={awardStyles.gridItem}>
            <div className={awardStyles.card}>
              <Image
                className={awardStyles.image}
                src="/Images/Award6.png"
                alt="United Nations"
                width={152.65}
                height={152.65}
                loading="lazy"
              />
              <div className={awardStyles.content}>
                <p className={awardStyles.name}>{hpt.unitedNations}</p>
              </div>
            </div>
          </div>
      
      
      
      </div>
      {/* <div className={awardStyles.gridContainer}>
          <div className={awardStyles.gridItem}>
            <div className={awardStyles.card}>
              <Image
                className={awardStyles.image}
                src="/Images/Award1.png"
                alt="Solar Impulse"
                width={152.65}
                height={152.65}
                loading="lazy"
              />
              <div className={awardStyles.content}>
                <p className={awardStyles.name}>{hpt.solarImpulse}</p>
              </div>
            </div>
          </div>

          <div className={awardStyles.gridItem}>
            <div className={awardStyles.card}>
              <Image
                className={awardStyles.image}
                src="/Images/Award2.png"
                alt="Mission Innovation"
                width={152.65}
                height={152.65}
                loading="lazy"
              />
              <div className={awardStyles.content}>
                <p className={awardStyles.name}>{hpt.missionInnovation}</p>
              </div>
            </div>
          </div>
          <div className={awardStyles.gridItem}>
            <div className={awardStyles.card}>
              <Image
                className={awardStyles.image}
                src="/Images/Award3.png"
                alt="Agriculture Winner "
                width={152.65}
                height={152.65}
                loading="lazy"
              />
              <div className={awardStyles.content}>
                <p className={awardStyles.name}>{hpt.fAO}</p>
              </div>
            </div>
          </div>
          <div className={awardStyles.gridItem}>
            <div className={awardStyles.card}>
              <Image
                className={awardStyles.image}
                src="/Images/Award4.png"
                alt="Denmark Winner"
                width={152.65}
                height={152.65}
                loading="lazy"
              />
              <div className={awardStyles.content}>
                <p className={awardStyles.name}>{hpt.sDG}</p>
              </div>
            </div>
          </div>
      

          <div className={awardStyles.gridItem}>
            <div className={awardStyles.card}>
              <Image
                className={awardStyles.image}
                src="/Images/Award5.png"
                alt="WWF Climate Solver"
                width={152.65}
                height={152.65}
                loading="lazy"
              />
              <div className={awardStyles.content}>
                <p className={awardStyles.name}>{hpt.wWF}</p>
              </div>
            </div>
          </div>
      
          <div className={awardStyles.gridItem}>
            <div className={awardStyles.card}>
              <Image
                className={awardStyles.image}
                src="/Images/Award6.png"
                alt="United Nations"
                width={152.65}
                height={152.65}
                loading="lazy"
              />
              <div className={awardStyles.content}>
                <p className={awardStyles.name}>{hpt.unitedNations}</p>
              </div>
            </div>
          </div>
      
      
      </div> */}
    </div>
    </div>




  );
};

export default Awardlogo;
