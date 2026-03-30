import './index.css'
import Nav from './components/Nav'
import Hero from './components/Hero'
import TrustBar from './components/TrustBar'
import PhotoStrips from './components/PhotoStrips'
import Services from './components/Services'
import Why from './components/Why'
import About from './components/About'
import Creds from './components/Creds'
import FieldNotes from './components/FieldNotes'
import Footer from './components/Footer'

export default function App() {
  return (
    <div style={{ maxWidth: '960px', margin: '0 auto', paddingTop: '24px', paddingBottom: '24px' }}>

      {/* Color stripe */}
      <div style={{ height: '3px', display: 'flex' }}>
        <div style={{ flex: 1, background: '#4A7C5E' }} />
        <div style={{ flex: 1, background: '#C4892A' }} />
        <div style={{ flex: 1, background: '#3A6B8A' }} />
      </div>

      <Nav />
      <Hero />
      <TrustBar />
      <PhotoStrips />
      <Services />
      <Why />
      <About />
      <Creds />
      <FieldNotes />
      <Footer />

    </div>
  )
}