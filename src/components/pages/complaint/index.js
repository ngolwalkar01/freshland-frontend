import React from 'react'
import Header from '@/components/atoms/Header/Header'
import style from './complain.module.css'
import Link from 'next/link'
const Complaint = () => {
  return (
    <>
    <main>
    <Header />
   
       
        <section  className={style.mainContent}>
        <h1>Complaint</h1>
        <p>We are working on a new complaints system. Contact our support via <Link href="#">info@fresh.land or +45 53790707</Link> for complaints.</p>
        </section>
        </main>
    </>
  )
}

export default Complaint