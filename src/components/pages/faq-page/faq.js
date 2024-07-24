import React, { useState } from "react";
import styles from "./faq.module.css";
import Header from "@/components/atoms/Header/Header";
import Link from "next/link";
import { faqTranslation } from '@/locales';
const lang = process.env.NEXT_PUBLIC_LANG || 'dk';
const faq = faqTranslation[lang];

const Faq = ({ heading, accordionData }) => {
  const [openAccordionIndex, setOpenAccordionIndex] = useState(-1);

  const toggleAccordion = (index) => {
    setOpenAccordionIndex(openAccordionIndex === index ? -1 : index);
  };

  return (
    <>
      <div className={styles.delivery}>
        <h4>{heading}</h4>
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
                  <div className={`W-Body-Regular ${styles.faqcontent}`} dangerouslySetInnerHTML={{ __html: item.content }} />
                </div>
              )}
              <hr className={styles.horizontalLine} />
            </div>
          ))}
        </div>
      </div>
    </>
  );
};


const faqData = [
  {
    heading: faq.faqdelivery,
    accordionData: [
      {
        "title": "Vad kostar frakten?",
        "content": "<p>Frakt kostar 59 SEK som utgångspunkt, oavsett var i landet du befinner dig.</p> <p>Beställningar över 699 SEK får gratis frakt: ^)</p>"
    },
    {
        "title": "När levererar ni?",
        "content": "<p>Vår leveransdag är onsdagar!</p>"
    },
    {
        "title": "Behöver jag vara hemma på leveransdagen?",
        "content": "<p>Nej, det behöver du inte. Om du har specifika önskemål om var chauffören ska placera dina varor kan du lämna ett meddelande till chauffören genom att klicka på länkens i ditt leverans-SMS och ange informationen där.</p> <p>Om du bor i ett flerfamiljshus men inte är hemma kan du ange din portkod så att chauffören kan leverera dina varor utanför din dörr. Har du angett ett telefonnummer när du gjorde din beställning kommer chauffören att försöka ringa dig.</p> <p>Om chauffören inte kan leverera dina varor kan en ny leverans bokas till senare under dagen eller dagen därpå.</p>"
    },
    {
        "title": "Tar ni tillbaka dom tomma lådorna?",
        "content": "<p>Nej, tyvärr har vi inte resurser för det just nu, men vi arbetar med att hitta en lösning så att vi kan återanvända lådorna i framtiden.</p>"
    },
    {
        "title": "Vad händer om leveransen misslyckas?",
        "content": "<p>Kontakta oss på <a href=\"mailto:hej@fresh.land\">hej@fresh.land</a> eller tel. <a class=\"c-link\" href=\"tel:+46108885720\" target=\"_blank\" rel=\"noopener noreferrer\" data-stringify-link=\"tel:+46108885720\" data-sk=\"tooltip_parent\" data-remove-tab-index=\"true\">+46 10 888 57 20</a>.</p> <p>Onsdagar kan vi kontaktas till 20.00 på telefon – om du behöver kontakta oss senare på kvällen så skicka gärna ett mejl som vi följer upp nästa morgon.</p>"
    },
    {
        "title": "Vad gör jag om jag fått varor som inte lever upp till förväntningarna?",
        "content": "<p>Meddela oss redan vid mottagandet, senast 3 dagar efter leverans, men gärna så fort som möjligt i samband med leverans.</p> <p>Ta gärna några bilder av produkterna samt etiketten på sidan av lådan och beskriv problemet och hur mycket av lådan det omfattar. Skicka ditt mail till <a href=\"mailto:hej@fresh.land\">hej@fresh.land</a> med rubriken “Reklamation” och bilderna.</p> <p>Vi hör av oss så snart som möjligt och hittar en lösning tillsammans – vi strävar efter att svara inom 48 timmar.</p>"
    },
    {
        "title": "Kan ni leverera till mitt fritidshus?",
        "content": "<p>Ja, om ditt postnummer finns tillgängligt på vår hemsida. Detta kan du kontrollera i vår sökmotor över tillgängliga postnummer. Om vi levererar till ditt fritidshus anger du bara den adressen som leveringsadress.</p>"
    }
    ]
  },
  {
    heading: faq.faqOrdering,
    accordionData: [
      {
        title: "När är er beställnings-deadline?",
        content: "<p>Vi stänger för beställningar varje onsdag kl. 24.00.</p>"
    },
    {
        title: "Jag vill göra några ändringar i min order. Kan ni hjälpa mig?",
        content: "<p>Ändringar angående innehållet i din order. Ja, vi kan absolut hjälpa dig med att ta bort varor på din order innan tidsfristen. Ring bara till oss på tlf: <a class=\"c-link\" href=\"tel:+46108885720\" target=\"_blank\" rel=\"noopener noreferrer\" data-stringify-link=\"tel:+46108885720\" data-sk=\"tooltip_parent\" data-remove-tab-index=\"true\">+46 10 888 57 20</a>, så hjälper vi dig.</p> <p>Vi kan tyvärr inte hjälpa till med att lägga till extra varor i din order, på grund av GDPR regler. Men om du har betällt under ett kundkonto, så kan du göra en tilläggsorder i en redan befintlig order. Systemet kommer automatiskt att registrera ytterligare leveranser till samma person och adress, och därför endast lägga på fraktavgift på den ena. – Detta gäller självklart endast innan deadline.</p> <p>Om du beställer som gäst – utan ett kundkonto på hemsidan – kan du fortfarande göra en tilläggsorder utan att betala dubbel frakt. Kontakta oss genom att antingen ringa eller skicka ett mail; vårt kundservice-team är redo att hjälpa dig.</p> <p>Alla beställningar som läggs innanför samma cykel till samma adress kommer att bli levererade tillsammans.</p> <p><strong>Deadline för beställningar/ändringar/avbeställningar: </strong></p> <p>Tidsfristen för leverans onsdag: Onsdag kl. 24.00 veckan innan.</p> <p><strong>Deadline för adressändringar: </strong></p> <p>Tidsfrist för lverans onsdag: Onsdag kl. 24.00 veckan innan.</p>"
    },
    {
        title: "Jag har beställt och vill lägga till några varor. Hur gör jag?",
        content: "<p>Alla beställningar placerade inom samma cykel till samma adress kommer att levereras tillsammans. Du kan göra en ny beställning med de nya artiklarna du vill lägga till, så läggs dessa till i din befintliga beställning.</p> <p>Om du beställer via samma användare registrerar systemet två leveranser till samma person men tar endast ut fraktavgift för en av dem (gratis frakt över 699kr).</p> <p>Om du beställer som “gäst” – utan en användare på hemsidan – kan du ändå få in båda beställningarna utan att betala dubbel frakt. Kontakta oss antingen via telefon eller e-post; vårt kundserviceteam hjälper dig gärna.</p>"
    },
    {
        title: "Vad gör jag om jag beställer nu men vill ha mina varor längre fram?",
        content: "<p>Vid kassan kan du välja mellan två olika leveransdagar.</p> <p>Som utgångspunkt är det möjligt att få beställningar veckan efter eller ca tio dagar senare. Vi kan dock inte leverera två veckor eller senare på grund av vårt koncept.</p>"
    },
    {
        title: "Varför har jag inte mottagit något orderbekräftelse?",
        content: "<p>Om du inte kan se någon orderbekräftelse – kika gärna i din skräppost först. Om den inte heller är där kan det bero på två saker – Antingen har din order inte gått igenom eller så har du skrivit in en felaktig mejladress. Kontakta oss gärna på <a href=\"mailto:hej@fresh.land\">hej@fresh.land</a> eller ring oss på <a class=\"c-link\" href=\"tel:+46108885720\" target=\"_blank\" rel=\"noopener noreferrer\" data-stringify-link=\"tel:+46108885720\" data-sk=\"tooltip_parent\" data-remove-tab-index=\"true\">+46 10 888 57 20</a> så hjälper vi dig.</p>"
    },
    {
        title: "Ångerrätt och reklamation",
        content: "<p><strong>Ångerrätt </strong></p> <p>Det finns ingen ångerrätt för avtal om leverans av mat, drycker eller andra varor för hushållets nuvarande konsumtion, som levereras fysiskt till ditt hem, bostad eller arbetsplats, som en del av vår ordinarie leverans av varor. Varor på <a href=\"https://fresh.land/se/\">fresh.land/se/</a> som inte är för hushållets nuvarande konsumtion täcks av de allmänna reglerna om ångerrätt.</p> <p><strong>Reklamation </strong></p> <p>Om varan du fick inte lever upp till förväntningarna vill vi gärna kompensera dig. Kontakta oss på <a href=\"mailto:hej@fresh.land\">hej@fresh.land</a> senast 3 dagar efter leverans, men gärna så fort som möjligt i samband med leverans.</p>"
    }
    ]
  },
  {
    heading: faq.faqProduct,
    accordionData: [
      {
        title: "Förvaring och hållbarhet",
        content: "<p>Du kan läsa om det bästa sätt att förvara dina produkter på och hållbarheten för dessa på respektive produktsidan.</p>"
    },
    {
        title: "Kan jag få en blandad låda med varor jag valt själv?",
        content: "<p>Nej, för tillfället har vi inte resurserna till att specialanpassa innehållet i produkterna. Vi har mix-lådor i vårt sortiment som du kan välja. Vi tar gärna emot förslag och idéer på nya produkter och mix-lådor på vår mejl <a href=\"mailto:hej@fresh.land\">hej@fresh.land</a></p>"
    },
    {
        title: "Säljer ni..?",
        content: "<p>Om du inte hittar en produkt när du söker på “Produkter i säsong” så finns produkten inte i vårt sortiment för tillfället. Vårt sortiment varierar utifrån säsong och vi är hela tiden på utkik efter fler varor i säsong att lägga till. Om du önskar en ny produkt är du välkommen att mejla oss på <a href=\"mailto:hej@fresh.land\">hej@fresh.land</a></p>"
    }
    ]
  },
  {
    heading: faq.faqOrganic,
    accordionData: [
      {
        title: "Är era varor ekologiska?",
        content: "<p>Majoriteten av våra produkter är ekologiska. Du känner igen dessa genom eko-certifieringen.</p> <p><img decoding=\"async\" class=\"alignnone wp-image-78411 size-full\" src=\"https://fresh.land/wp-content/uploads/2020/02/EU-bio-e1582893883442.jpg\" alt=\"\" width=\"150\" height=\"100\"></p> <p>Våra icke-ekologiska produkter kallar vi Deluxe och är utvalda utifrån hög kvalitet och gårdens värden. Deluxe-produkterna är naturligt odlade i den omfattning det är möjligt. De är inte ytbehandlade eller mognade genom artificiella mognadsprocesser, och vi testar produkterna för bekämpningsmedel innan skörd för att säkerställa att de inte innehåller några kemiska bekämpningsmedel.</p>"
    },
    {
        title: "Vad är skillnaden mellan era ekologiska varor och era Deluxe varor?",
        content: "<p>Skillnaden mellan våra ekoligiska varor och vår Deluxe-varor är huruvida de kommer från en odlare med eko-certifiering eller inte.</p> <p>Certifieringen är en försäkran till dig som konsument om att inga kemiska bekämpningsmedel har använts. För en odlare som inte har eko-certifiering kan det bero på att denne behövt akutbehandla ett specifikt problem där naturliga metoder inte kunnat råda bot på problemet och odlaren riskerar att mista hela sin skörd.</p> <p>Det kan även bero på att odlaren inte haft råd att betala för en eko-certifiering men använder sig av naturliga metoder. Skillnaden för dig som konsument är alltså att eko-certifieringen ger dig en garanti på att produkten är ekologisk.</p>"
    },
    {
        title: "Varifrån kommer era produkter?",
        content: "<p>Vi eftersträvar att leverera europeiska varor under deras naturliga säsong. För närvarande kommer majoriteten från</p> <ul> <li>Spanien</li> <li>Portugal</li> <li>Danmark</li> <li>Italien</li> </ul> <p>Vi letar hela tiden efter lokala specialiteter från Europa, så att vi under året ska kunna erbjuda spännande nyheter i vårt sortiment.</p>"
    }
    ]
  },
  {
    heading: faq.faqcustServ,
    accordionData: [
      {
        title: "Öppettider",
        content: "<ul> <li>Mån-Tors: 09:00–17:30</li> <li>Fre: 09.00-16:30</li> <li>Helg: Stängt</li> </ul>"
    },
    {
        title: "Telefon, e-mail och adress",
        content: "<ul> <li>Telefonnummer <a class=\"c-link\" href=\"tel:+46108885720\" target=\"_blank\" rel=\"noopener noreferrer\" data-stringify-link=\"tel:+46108885720\" data-sk=\"tooltip_parent\" data-remove-tab-index=\"true\">+46 10 888 57 20</a></li> <li>Mejladress <a href=\"mailto:hej@fresh.land\">hej@fresh.land</a> – Vi eftersträvar att svara dig inom 48 h.</li> <li>Adress: Indiakaj 20, 2100 København Ø, Danmark</li> </ul>"
    },
    {
        title: "Positiv/negativ feedback?",
        content: "<p>Har du ris eller ros eller förslag på förändringar? Hör gärna av dig! Du kan mejla oss på <a href=\"mailto:hej@fresh.land\">hej@fresh.land </a></p> <p>Vi är tacksamma för dina åsikter!</p> <p>Vänligen, Fresh.Land-teamet</p>"
    }
    ]
  }
]

const Faqs = () => {
  return (
    <div>
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
                <Link href="tel:+46 108 109 689">{faq.num}</Link>
              </p>
              <p className={styles.dk}>{faq.indikaj}</p>
            </div>
            {
              faqData && faqData.length > 0 && faqData.map((x, i) => {
                return <Faq key={i} heading={x.heading} accordionData={x.accordionData} />
              })
            }
          </div>
        </div>
      </section>
    </div>
  )
};

export default Faqs;
