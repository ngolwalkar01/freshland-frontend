import React from 'react'
import Header from '@/components/atoms/Header/Header'
import style from './term.module.css'
import Link from 'next/link'
import { termTranslation } from '@/locales';

const lang = process.env.NEXT_PUBLIC_LANG || 'se';

const Terms = () => {
  const tms = termTranslation[lang];

  return (
    <>

    <Header />
  
   <section className={style.mainContent}>
    <h1>{tms.termsCondition}
    </h1>
    <div className={style.container}>
 
          <h4>{tms.generally}</h4>
          <p>{tms.theseGeneral}</p>
          <p>{tms.toOrder}</p>
          <p>{tms.customerAccount}</p>
          <p>{tms.registrationAsCustomer}</p>
          <p>{tms.rightToChange}</p>
          <h4>{tms.ordersAndDeadlines}</h4>
          <p>{tms.orderWays}</p>
          <p>- {tms.orderWebsite}<br/>- {tms.orderEmail} <Link href="mailto:hej@fresh.land">{tms.emailName}</Link><br/>- {tms.orderChat}<br/>- {tms.call} <Link href="tel:010-195 60 60">{tms.orderPhone}</Link></p>
          <p><strong>{tms.orderOnWebsite}</strong></p>
          <p>{tms.orderOnDelivery}</p>
          <p><strong>{tms.orderViaCustomer}</strong></p>
          <p>{tms.orderViaCustomerService}</p>
          <p>{tms.orderConfirmation}</p>
          <h4>{tms.changeCancellation}</h4>
          <p>{tms.changesOrCancellation} <Link href="mailto:hej@fresh.land">{tms.emailName}</Link> {tms.orPhone} <Link href="tel:010-195 60 60">{tms.orderPhone}</Link> {tms.changeAccount}</p>
          <p>{tms.changesOrCancellationNote}</p>
          <p>{tms.changesOrCancellationDeadline}</p>
          <h4>{tms.especiallySubscribe}</h4>
          <p>{tms.subscriptions}<Link href="mailto:hej@fresh.land">{tms.emailName}</Link>,{tms.itMust}</p>
          <p>{tms.subscriptionNote}</p>
          <p>{tms.helpfromCustomerService} <Link href="mailto:hej@fresh.land">{tms.emailName}</Link> {tms.orPhone} <Link href="tel:010-195 60 60">{tms.orderPhone}</Link>.{tms.eventOfchange}</p>
          <h4>{tms.contentOfbox}</h4>
          <p>{tms.boxContents}</p>
          <h4>{tms.theDeliveries}</h4>
          <p>{tms.deliveries}</p>
          <p>{tms.deliveryAddress}</p>
          <p>{tms.deliveryProblems} <Link href="mailto:hej@fresh.land">{tms.emailName}</Link> {tms.orPhone} <Link href="tel:010-195 60 60">{tms.orderPhone}</Link>.</p>
          <h4>{tms.lockeGate}</h4>
          <p>{tms.lockedGateEntrance}</p>
          <p>{tms.doorCode}</p>
          <p>{tms.intercom}</p>
          <p>{tms.noDoorCodeOrIntercom}</p>
          <p>{tms.deliveryComments}</p>
          
          <h4>{tms.quality}</h4>
          <p>{tms.qualityGuarantee} <Link href="tel:010-195 60 60">{tms.orderPhone}</Link> {tms.noLater}</p>
          <h4>{tms.rightOfWithdrawal}</h4>
          <p>{tms.general}</p>
          <p>{tms.subscriptionGoods}</p>
          <h4>{tms.payment}</h4>
          <p>{tms.paymentInvoice}</p>
          <h4>{tms.liability}</h4>
          <p>{tms.ourLiability}</p>
          <h4>{tms.dataProtection}</h4>
          <p>{tms.personalData}</p>
          <h4>{tms.contact}</h4>
          <p>{tms.methods}</p>
          <p>{tms.chat}<br/>{tms.email}: <Link href="mailto:hej@fresh.land">{tms.emailName}</Link><br/>{tms.phone}: <Link href="tel:010-195 60 60">{tms.orderPhone}</Link></p>
          <p>{tms.lastUpdated}</p>
        
    

 
          </div>
        </section>
    </>
  );
}

export default Terms