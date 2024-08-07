import React from 'react'
import Header from '@/components/atoms/Header/Header'
import style from './complain.module.css'
import Link from 'next/link'
import { termTranslation } from '@/locales';

const lang = process.env.NEXT_PUBLIC_LANG || 'se';
const Complaint = () => {
  const tms = termTranslation[lang];

  return (
    <>
    <main>
    <Header />
   
       
        <section  className={style.mainContent}>
        <h1>{tms.complaint}</h1>
        <p>{tms.supportVia} <Link href="#">{tms.emailName} {tms.or} {tms.orderPhone}</Link> {tms.ForComplaints}</p>
        </section>
        </main>
    </>
  )
}

export default Complaint