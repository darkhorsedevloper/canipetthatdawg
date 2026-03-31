import './index.css'
import { usePetCursor } from './hooks/usePetCursor'
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

const ColorStripe = () => (
  <div style={{ height: '3px', display: 'flex', width: '100%' }}>
    <div style={{ flex: 1, background: '#4A7C5E' }} />
    <div style={{ flex: 1, background: '#C4892A' }} />
    <div style={{ flex: 1, background: '#3A6B8A' }} />
  </div>
)

export default function App() {
  usePetCursor()
  return (
    <div style={{ maxWidth: '960px', margin: '0 auto' }}>
      <div style={{ height: '24px' }} />
      <ColorStripe />
      <Nav />
      <Hero />
      <TrustBar />
      <PhotoStrips />
      <Services />
      <Why />
      <About />
      <CredsBento />
      <FieldNotes />
      <ReviewTicker />
      <Footer />
      <div style={{ height: '24px' }} />
      <ColorStripe />
      <div style={{ height: '24px' }} />
    </div>
  )
}
