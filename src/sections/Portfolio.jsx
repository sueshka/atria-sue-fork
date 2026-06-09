import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Accent } from '../lib/accent.jsx'
import SHead from '../components/SHead.jsx'
import Reveal from '../components/Reveal.jsx'
import { useContent } from '../i18n.jsx'

function PCard({ p, i, ui }) {
  const [open, setOpen] = useState(false)
  return (
    <Reveal as="article" className="pcard" delay={i * 0.08} y={28} amount={0.15}>
      <div
        className="pcard-img"
        style={p.img ? { backgroundImage: `url(${p.img})` } : { background: p.bg }}
      >
        <span className={`pcard-badge ${p.statusKey}`}>{p.status}</span>
      </div>
      <div className="pcard-body">
        <span className="loc">{p.district}</span>
        <h3>{p.name}</h3>
        <span className="ptype">{p.type}</span>

        <div className="pcard-metrics">
          <div>
            <span className="mk">{ui.mPrice}</span>
            <span className="mv">
              <span className="u">{p.price[0]}</span>
              {p.price.slice(1)}
            </span>
          </div>
          <div>
            <span className="mk">{ui.mArea}</span>
            <span className="mv">{p.area}</span>
          </div>
          <div>
            <span className="mk">{ui.mOcc}</span>
            <span className="mv">{p.occupancy}%</span>
          </div>
          <div>
            <span className="mk">{ui.mBought}</span>
            <span className="mv">{p.bought}%</span>
          </div>
        </div>

        <div className="pbar-head">
          <span>
            {ui.bought} {p.bought}%
          </span>
          <span>{p.statusKey === 'sold' ? ui.soldOut : ui.selling}</span>
        </div>
        <div className="pbar">
          <motion.i
            className={p.bought >= 100 ? 'full' : ''}
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: p.bought / 100 }}
            viewport={{ once: true, amount: 0.6 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
            style={{ transformOrigin: 'left' }}
          />
        </div>

        <button
          className="more"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '0.66rem',
            letterSpacing: '0.06em',
            textTransform: 'uppercase',
            color: 'var(--amber-deep, var(--amber))',
            marginTop: '0.3rem',
            textAlign: 'left',
          }}
        >
          {open ? ui.detailsHide : ui.detailsShow}
        </button>
        <AnimatePresence initial={false}>
          {open && (
            <motion.div
              className="pcard-detail"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              style={{ overflow: 'hidden' }}
            >
              <div>
                <span className="dl">{ui.tenants}</span>
                {p.tenants}
              </div>
              <div>
                <span className="dl">{ui.spv}</span>
                {p.spv}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </Reveal>
  )
}

export default function Portfolio() {
  const c = useContent().portfolio
  const [filter, setFilter] = useState('all')
  const items = filter === 'all' ? c.items : c.items.filter((p) => p.statusKey === filter)

  return (
    <section className={`section surface-${c.surface}`} id={c.id}>
      <div className="container">
        <SHead eyebrow={c.eyebrow} headline={c.headline} sub={c.subhead} />

        <div className="chips">
          {c.filters.map((f) => (
            <button
              key={f.key}
              className={`chip-btn ${filter === f.key ? 'on' : ''}`}
              onClick={() => setFilter(f.key)}
            >
              {f.label}
            </button>
          ))}
          <span className="count">
            {items.length} {c.ui.count}
          </span>
        </div>

        <motion.div className="pgrid" layout>
          <AnimatePresence>
            {items.map((p, i) => (
              <PCard key={p.name} p={p} i={i} ui={c.ui} />
            ))}
          </AnimatePresence>
        </motion.div>

        <Reveal as="div" className="port-strip">
          <p>
            <Accent text={c.strip} />
          </p>
          <span className="ps-note">{c.stripNote}</span>
        </Reveal>

        <p className="s-note">{c.microcopy}</p>
      </div>
    </section>
  )
}
