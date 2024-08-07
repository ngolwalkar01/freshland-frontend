import React from 'react'
import Header from '@/components/atoms/Header/Header'
import style from './personaldata.module.css'
import Link from 'next/link'
import { policyTranslation } from '@/locales';

const lang = process.env.NEXT_PUBLIC_LANG || 'dk';
const Personaldata = () => {
  const policy = policyTranslation[lang];
  return (
    <>
    <main>
    <Header />
    <section className={style.mainContent}>
    <h1>{policy.privacyPolicy}
    </h1>
    <div className={style.container}>
  

        <h4>{policy.aboutInfo}</h4>
        <p>{policy.infoData}</p>
        <p>{policy.description}</p>
        <p>{policy.dataController}</p>
        <h4>{policy.howWeCollect}</h4>
        <p>{policy.collectionDetails}</p>
        <p>{policy.cookiePolicy}</p>
        <p><Link href="https://fresh.land/se/kundvillkor">{policy.cookiePolicyLink}</Link></p>
        <h4>{policy.purpose}</h4>
        <p>{policy.purposeDetails}</p>
        <h4>{policy.legalBasis}</h4>
        <p>{policy.legalBasisDetails}</p>
        <h4>{policy.disclosureTransfer}</h4>
        <p>{policy.disclosureDetails}</p>
        <p>{policy.trustPilot}</p>
        <p>{policy.legalDisclosure}</p>
        <p>{policy.externalPartners}</p>
        <p>{policy.externalPartnersDetails}</p>
        <p>{policy.usTransfer}</p>
        <p>{policy.googleCertification} <Link href="https://www.privacyshield.gov/participant?id=a2zt000000001L5AAI" target="_blank" rel="noopener">{policy.googleCertificationLink}</Link></p>
        <p>{policy.facebookCertification}<Link href="https://www.privacyshield.gov/participant?id=a2zt0000000GnywAAC&amp;status=Active" target="_blank" rel="noopener">{policy.facebookCertificationLink}</Link></p>
       
        <h4>{policy.yourRights}</h4>
        <p>{policy.rightsTransparency}</p>
       <h5>{policy.rightAccess}</h5>
        <p>{policy.accessDetails}</p>
        <p>{policy.accessCopy}</p>
        <h5>{policy.rightCorrection}</h5>
        <p>{policy.correctionDetails}</p>
        <p>{policy.selfCorrection}</p>
       <h5>{policy.rightDeletion}</h5>
        <p>{policy.deletionDetails}</p>
        <h5>{policy.rightRestriction}</h5>
        <p>{policy.restrictionDetails}</p>
        <h5>{policy.rightPortability}</h5>
        <p>{policy.portabilityDetails}</p>
        <h5>{policy.rightObject}</h5>
        <p>{policy.objectDetails}</p>
        <h5>{policy.rightRevoke}</h5>
        <p>{policy.revokeDetails}</p>
       <h5>{policy.rightComplain}</h5>
        <p>{policy.complainDetails} <Link href="mailto:datainspektionen@datainspektionen.se">{policy.datainsEmail}</Link> {policy.byPhone} <Link href="tel:08-657 61 00">{policy.contact}</Link>.</p>
        <h4>{policy.deletionOfData}</h4>
        <p>{policy.deletionDetailsExtended}</p>
        <p>{policy.docConstent}</p>
        <h4>{policy.contactInfo}</h4>
        <p>{policy.contactInfoDetails}</p>
        <p>{policy.companyInfo}</p>
         <p>{policy.companyAddress}</p>
         <p>{policy.companyPostalCode}</p>
         <p>{policy.telephone}: <Link href="mailto:contact@fresh.land">{policy.contact}</Link></p>
         <p>{policy.email}: <Link href="mailto:contact@fresh.land">{policy.companyEmail}</Link></p>
        <h4>{policy.latestPolicyVersion}</h4>
        <p>{policy.receive}</p>
         <p>{policy.write} <Link href="mailto:contact@fresh.land">{policy.companyEmail}</Link>, {policy.call}  <Link href="mailto:contact@fresh.land">{policy.contact}</Link> {policy.chatOurWebsote}</p>
         <div className={style.time}>
          <p>{policy.weAre}</p>
          <p>{policy.monday}</p>
          <p>{policy.tuesday}</p>
          <p>{policy.wednesday}</p>
          <p>{policy.thursday}</p>
          <p>{policy.friday}</p>
          <p>{policy.company}</p>
          </div>
          <div className={style.address}>
            <p>{policy.address}</p>
          <p>{policy.street}</p>
          <p>{policy.postalCode}</p>
          <p>{policy.city}</p>
          <p>{policy.country}</p>
          </div>
      </div>
      </section>
    </main>
       
        
    </>
  )
}

export default Personaldata