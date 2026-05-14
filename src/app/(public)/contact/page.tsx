import ContactHero from '@/components/public/contact/ContactHero'
import ContactChannels from '@/components/public/contact/ContactChannels'
import ContactFormSection from '@/components/public/contact/ContactFormSection'
import React from 'react'

const ContactPage = () => {
  return (
    <div>
        <ContactHero />
        <ContactChannels />
        <ContactFormSection />
    </div>
  )
}

export default ContactPage
