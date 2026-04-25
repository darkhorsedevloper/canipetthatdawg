import './index.css'
import { useEffect } from 'react'
import { usePetCursor } from './hooks/usePetCursor'
import { useDarkMode } from './hooks/useDarkMode'
import Nav from './components/Nav'
import Hero from './components/Hero'
import TrustBar from './components/TrustBar'
import PhotoStrips from './components/PhotoStrips'
import Services from './components/Services'
import Why from './components/Why'
import About from './components/About'
import CredsBento from './components/CredsBento'
import FieldNotes from './components/FieldNotes'
import Footer from './components/Footer'
import ReviewTicker from './components/ReviewTicker'
import CTA from './components/CTA'
import ContactTerminal from './components/ContactTerminal'
import DawgOfTheDay from './components/DawgOfTheDay'
import PawTrail from './components/PawTrail'
import EveryVisit from './components/EveryVisit'

const ColorStripe = () => (
  <div style={{ height: '3px', display: 'flex', width: '100%' }}>
    <div style={{ flex: 1, background: '#4A7C5E' }} />
    <div style={{ flex: 1, background: '#C4892A' }} />
    <div style={{ flex: 1, background: '#3A6B8A' }} />
  </div>
)

export default function App() {
  const [dark, setDark] = useDarkMode()
  useEffect(() => {
    setTimeout(() => window.scrollTo({ top: 0, behavior: 'instant' }), 0)
  }, [])
  usePetCursor()
  return (
    <div data-mode={dark ? 'dark' : 'light'} style={{ maxWidth: '960px', margin: '0 auto' }}>
      <div style={{ height: '24px' }} />
      <ColorStripe />
      <Nav dark={dark} onToggleDark={() => setDark(d => !d)} />
      <Hero />
      <TrustBar />
      <PhotoStrips />
      <Services />
      <EveryVisit />
      <Why />
      <About />
      <CredsBento />
      <FieldNotes />
      <ReviewTicker />
      <DawgOfTheDay />
      <CTA />
      <ContactTerminal />
      <Footer />
      <PawTrail />
      <div style={{ height: '24px' }} />
      <ColorStripe />
      <div style={{ height: '24px' }} />
    </div>
  )
}
