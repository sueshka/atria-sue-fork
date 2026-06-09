import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { useContent, useLang } from '../i18n.jsx'

export default function Nav() {
  const data = useContent()
  const nav = data.nav
  const ui = data.ui
  const { lang, setLang } = useLang()
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <motion.nav
      className={`nav ${scrolled ? 'scrolled' : ''}`}
      initial={{ y: -40, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
    >
      <a href="#top" className="nav-brand magnetic" aria-label="ATRIA">
        <img src="/atria-logo.png" alt="ATRIA" className="nav-logo" />
      </a>
      <div className="nav-links">
        {nav.links.map((l) => (
          <a key={l.href} href={l.href} className="tlink">
            {l.label}
          </a>
        ))}
        <button
          className="lang-toggle"
          onClick={() => setLang(lang === 'ru' ? 'kg' : 'ru')}
          aria-label="Тил / Язык"
        >
          <span className={lang === 'ru' ? 'on' : ''}>{ui.langRu}</span>
          <span className="sep">/</span>
          <span className={lang === 'kg' ? 'on' : ''}>{ui.langKg}</span>
        </button>
        <a href="#cta" className="nav-cta magnetic">
          {nav.cta}
        </a>
      </div>
    </motion.nav>
  )
}
