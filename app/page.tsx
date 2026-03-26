'use client'

import Image from 'next/image'
import { useState, useEffect } from 'react'
import dynamic from 'next/dynamic'

const MenuGallery3D = dynamic(() => import('./components/MenuGallery3D'), {
  ssr: false,
  loading: () => (
    <div style={{
      width: '100%', height: '500px', background: '#000',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
    }}>
      <div style={{
        fontFamily: 'Cormorant Garamond, serif', fontSize: '18px',
        color: 'rgba(201,169,110,0.5)', letterSpacing: '0.2em', fontStyle: 'italic',
      }}>
        Loading Menu...
      </div>
    </div>
  ),
})

// ── Icons (inline SVGs to avoid dependencies) ──────────────────────────────
const InstagramIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <rect x="2" y="2" width="20" height="20" rx="5" />
    <circle cx="12" cy="12" r="4" />
    <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" />
  </svg>
)
const FacebookIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
  </svg>
)
const PhoneIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.36 12a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.27 1h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L7.91 8.27a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 15z" />
  </svg>
)
const MapPinIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
    <circle cx="12" cy="10" r="3" />
  </svg>
)
const ClockIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <circle cx="12" cy="12" r="10" />
    <polyline points="12 6 12 12 16 14" />
  </svg>
)
const StarIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
  </svg>
)
const ChevronDownIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <polyline points="6 9 12 15 18 9" />
  </svg>
)

// ── Menu data ───────────────────────────────────────────────────────────────
const reviews = [
  {
    name: 'Bontle L.',
    rating: 5,
    text: 'Best experience ever. They exceeded our expectations — food, music, atmosphere was top tier.',
  },
  {
    name: 'Nosipho M.',
    rating: 5,
    text: 'The service is amazing, so is the food and atmosphere. Their prices are also reasonable.',
  },
  {
    name: 'Sharmz P.',
    rating: 5,
    text: 'A wonderfully spacious restaurant with rustic meets modern décor. The food is scrumptious and the dessert is absolutely melt-in-the-mouth.',
  },
]

// ── Page Component ──────────────────────────────────────────────────────────
export default function Home() {
  const [navScrolled, setNavScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setNavScrolled(window.scrollY > 60)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <main style={{ backgroundColor: 'var(--brown-deep)', color: 'var(--cream)' }}>

      {/* ── NAVIGATION ───────────────────────────────────────────────────── */}
      <nav
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          zIndex: 100,
          transition: 'all 0.4s ease',
          padding: navScrolled ? '14px 0' : '24px 0',
          backgroundColor: navScrolled ? 'rgba(28, 18, 8, 0.97)' : 'transparent',
          borderBottom: navScrolled ? '1px solid rgba(201, 169, 110, 0.15)' : 'none',
          backdropFilter: navScrolled ? 'blur(12px)' : 'none',
        }}
      >
        <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 32px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          {/* Logo */}
          <a href="/" style={{ display: 'flex', alignItems: 'center', gap: '12px', textDecoration: 'none' }}>
            <Image src="/logo.png" alt="Marbella Grand Café" width={48} height={48} style={{ borderRadius: '4px' }} />
          </a>

          {/* Desktop Nav */}
          <div style={{ display: 'flex', gap: '40px', alignItems: 'center' }} className="desktop-nav">
            {['About', 'Menu', 'Experience', 'Reservations'].map((item) => (
              <a key={item} href={`#${item.toLowerCase()}`} className="nav-link">{item}</a>
            ))}
          </div>

          {/* CTA */}
          <a href="tel:+27310200028" className="btn-luxury" style={{ fontSize: '10px', padding: '10px 28px' }}>
            Reserve
          </a>
        </div>
      </nav>

      {/* ── HERO ─────────────────────────────────────────────────────────── */}
      <section
        id="hero"
        style={{
          position: 'relative',
          height: '100vh',
          minHeight: '700px',
          overflow: 'hidden',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        {/* BG Image */}
        <Image
          src="/hero-bg.jpg"
          alt="Marbella Grand Café Umhlanga"
          fill
          priority
          style={{ objectFit: 'cover', objectPosition: 'center' }}
        />

        {/* Gradient overlay */}
        <div style={{
          position: 'absolute', inset: 0,
          background: 'linear-gradient(180deg, rgba(28,18,8,0.35) 0%, rgba(28,18,8,0.55) 50%, rgba(28,18,8,0.88) 100%)',
        }} />

        {/* Subtle vignette */}
        <div style={{
          position: 'absolute', inset: 0,
          background: 'radial-gradient(ellipse at center, transparent 40%, rgba(28,18,8,0.6) 100%)',
        }} />

        {/* Content */}
        <div style={{
          position: 'relative', zIndex: 2, textAlign: 'center',
          padding: '0 24px', maxWidth: '900px',
        }}>
          {/* Pre-title */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '16px', marginBottom: '28px' }}
            className="animate-fade-in">
            <div className="gold-line" />
            <span className="section-label">Umhlanga Rocks · Est. 2022</span>
            <div className="gold-line" />
          </div>

          {/* Main title */}
          <h1
            className="animate-fade-in-up"
            style={{
              fontFamily: 'Cormorant Garamond, serif',
              fontSize: 'clamp(56px, 10vw, 120px)',
              fontWeight: 300,
              lineHeight: 0.9,
              letterSpacing: '-0.01em',
              color: 'var(--cream-light)',
              marginBottom: '16px',
            }}
          >
            Marbella
          </h1>
          <h2
            className="animate-fade-in-up delay-200"
            style={{
              fontFamily: 'Cormorant Garamond, serif',
              fontSize: 'clamp(18px, 3.5vw, 36px)',
              fontWeight: 300,
              fontStyle: 'italic',
              letterSpacing: '0.15em',
              marginBottom: '32px',
            }}
          >
            <span className="gold-shimmer">Grand Café</span>
          </h2>

          <p
            className="animate-fade-in-up delay-400"
            style={{
              fontFamily: 'Jost, sans-serif',
              fontSize: '12px',
              letterSpacing: '0.3em',
              textTransform: 'uppercase',
              color: 'rgba(245,237,216,0.65)',
              marginBottom: '52px',
            }}
          >
            Restaurant &nbsp;·&nbsp; Cocktail Bar &nbsp;·&nbsp; Live Music
          </p>

          <div
            className="animate-fade-in-up delay-600"
            style={{ display: 'flex', gap: '20px', justifyContent: 'center', flexWrap: 'wrap' }}
          >
            <a href="#reservations" className="btn-luxury">Reserve a Table</a>
            <a href="#menu"
              style={{
                display: 'inline-block', padding: '14px 44px',
                color: 'rgba(245,237,216,0.7)', fontFamily: 'Jost, sans-serif',
                fontSize: '11px', fontWeight: 400, letterSpacing: '0.25em',
                textTransform: 'uppercase', textDecoration: 'none',
                transition: 'color 0.3s ease', border: '1px solid rgba(245,237,216,0.2)',
              }}
              onMouseEnter={e => (e.currentTarget.style.color = 'var(--cream)')}
              onMouseLeave={e => (e.currentTarget.style.color = 'rgba(245,237,216,0.7)')}
            >
              View Menu
            </a>
          </div>
        </div>

        {/* Scroll cue */}
        <div style={{
          position: 'absolute', bottom: '36px', left: '50%', transform: 'translateX(-50%)',
          display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '6px',
          color: 'rgba(201,169,110,0.5)', animation: 'fadeIn 2s ease 1.5s both',
        }}>
          <span style={{ fontSize: '9px', letterSpacing: '0.3em', textTransform: 'uppercase' }}>Scroll</span>
          <ChevronDownIcon />
        </div>
      </section>

      {/* ── STATS STRIP ─────────────────────────────────────────────────── */}
      <section style={{
        background: 'linear-gradient(90deg, var(--brown-rich), var(--brown-mid), var(--brown-rich))',
        borderTop: '1px solid rgba(201,169,110,0.2)',
        borderBottom: '1px solid rgba(201,169,110,0.2)',
        padding: '32px 0',
      }}>
        <div style={{
          maxWidth: '1100px', margin: '0 auto', padding: '0 32px',
          display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))',
          gap: '24px', textAlign: 'center',
        }}>
          {[
            { num: '4.4★', label: '104 Google Reviews' },
            { num: 'R65', label: 'Happy Hour Cocktails' },
            { num: '4hrs', label: 'Happy Hour Daily' },
            { num: '∞', label: 'Ocean Views' },
          ].map((stat) => (
            <div key={stat.label}>
              <div style={{
                fontFamily: 'Cormorant Garamond, serif', fontSize: '32px',
                fontWeight: 400, color: 'var(--gold)', marginBottom: '6px',
              }}>
                {stat.num}
              </div>
              <div className="section-label" style={{ color: 'rgba(245,237,216,0.5)' }}>{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ── ABOUT ────────────────────────────────────────────────────────── */}
      <section id="about" style={{ padding: '120px 0' }}>
        <div style={{
          maxWidth: '1200px', margin: '0 auto', padding: '0 32px',
          display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))',
          gap: '80px', alignItems: 'center',
        }}>
          {/* Image */}
          <div style={{ position: 'relative' }}>
            <div style={{
              position: 'absolute', top: '-20px', left: '-20px', right: '20px', bottom: '20px',
              border: '1px solid rgba(201,169,110,0.25)', borderRadius: '2px',
              zIndex: 0,
            }} />
            <div style={{ position: 'relative', zIndex: 1, borderRadius: '2px', overflow: 'hidden', aspectRatio: '4/5' }}>
              <Image
                src="/dining.jpg"
                alt="Dining at Marbella Grand Café Umhlanga"
                fill
                style={{ objectFit: 'cover' }}
              />
              {/* Gold badge */}
              <div style={{
                position: 'absolute', bottom: '24px', right: '24px',
                background: 'rgba(28,18,8,0.9)', border: '1px solid rgba(201,169,110,0.4)',
                padding: '14px 20px', textAlign: 'center', backdropFilter: 'blur(8px)',
              }}>
                <div className="section-label" style={{ fontSize: '9px', marginBottom: '4px' }}>Google Rating</div>
                <div style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '28px', color: 'var(--gold)' }}>4.4</div>
                <div style={{ display: 'flex', gap: '2px', justifyContent: 'center', marginTop: '4px' }}>
                  {[...Array(5)].map((_, i) => (
                    <span key={i} style={{ color: i < 4 ? 'var(--gold)' : 'rgba(201,169,110,0.3)', fontSize: '10px' }}>★</span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Text */}
          <div>
            <div className="section-label" style={{ marginBottom: '16px' }}>Our Story</div>
            <div className="gold-line" style={{ marginBottom: '32px' }} />
            <h2 style={{
              fontFamily: 'Cormorant Garamond, serif',
              fontSize: 'clamp(40px, 5vw, 64px)',
              fontWeight: 300, lineHeight: 1.05,
              marginBottom: '28px',
            }}>
              Where Umhlanga<br />
              <span style={{ fontStyle: 'italic', color: 'var(--gold)' }}>Comes to Dine</span>
            </h2>
            <p style={{
              fontFamily: 'Jost, sans-serif', fontSize: '15px', fontWeight: 300,
              lineHeight: 1.85, color: 'rgba(245,237,216,0.72)', marginBottom: '24px',
            }}>
              Perched at The Pearls Mall with sweeping views of the Indian Ocean, Marbella Grand Café
              has become Umhlanga's most celebrated culinary destination. We are more than a restaurant —
              we are a statement of taste, a gathering place for those who appreciate the extraordinary.
            </p>
            <p style={{
              fontFamily: 'Jost, sans-serif', fontSize: '15px', fontWeight: 300,
              lineHeight: 1.85, color: 'rgba(245,237,216,0.72)', marginBottom: '48px',
            }}>
              From intimate Sunday brunches to private milestone celebrations, every visit is crafted
              with meticulous attention to detail — where world-class cuisine meets a soulful coastal ambiance.
            </p>

            {/* Features grid */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px 40px', marginBottom: '48px' }}>
              {['Live Music Nightly', 'Private Dining Room', 'Happy Hour Daily', 'Beachfront Location', 'Award-Winning Cocktails', 'Wheelchair Accessible'].map((f) => (
                <div key={f} style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <div style={{ width: '4px', height: '4px', borderRadius: '50%', background: 'var(--gold)', flexShrink: 0 }} />
                  <span style={{ fontSize: '12px', letterSpacing: '0.08em', color: 'rgba(245,237,216,0.65)' }}>{f}</span>
                </div>
              ))}
            </div>

            <a href="#reservations" className="btn-luxury">Reserve Your Table</a>
          </div>
        </div>
      </section>

      {/* ── SIGNATURE EXPERIENCE ─────────────────────────────────────────── */}
      <section id="experience" style={{ position: 'relative', overflow: 'hidden' }}>
        {/* Full bleed image */}
        <div style={{ position: 'relative', height: '80vh', minHeight: '560px' }}>
          <Image
            src="/lifestyle.jpg"
            alt="Luxury dining experience at Marbella Grand Café"
            fill
            style={{ objectFit: 'cover', objectPosition: 'top' }}
          />
          <div style={{
            position: 'absolute', inset: 0,
            background: 'linear-gradient(90deg, rgba(28,18,8,0.92) 0%, rgba(28,18,8,0.6) 50%, rgba(28,18,8,0.2) 100%)',
          }} />

          {/* Content overlay */}
          <div style={{
            position: 'absolute', inset: 0, display: 'flex', alignItems: 'center',
            padding: '0 10%',
          }}>
            <div style={{ maxWidth: '560px' }}>
              <div className="section-label" style={{ marginBottom: '16px' }}>The Experience</div>
              <div className="gold-line" style={{ marginBottom: '32px' }} />
              <h2 style={{
                fontFamily: 'Cormorant Garamond, serif',
                fontSize: 'clamp(38px, 5vw, 68px)',
                fontWeight: 300, lineHeight: 1.05, marginBottom: '28px',
              }}>
                Crafted for the<br />
                <span style={{ fontStyle: 'italic', color: 'var(--gold)' }}>Discerning Few</span>
              </h2>
              <p style={{
                fontSize: '15px', fontWeight: 300, lineHeight: 1.85,
                color: 'rgba(245,237,216,0.75)', marginBottom: '16px',
              }}>
                Marbella attracts Umhlanga's most distinguished guests — business executives, celebrities,
                international tourists, and those who simply refuse to settle for ordinary.
              </p>
              <p style={{
                fontSize: '15px', fontWeight: 300, lineHeight: 1.85,
                color: 'rgba(245,237,216,0.75)', marginBottom: '48px',
              }}>
                Celebrate life's finest moments in our private dining room, or let the ocean breeze
                carry you through an evening of live music, signature cocktails, and cuisine that
                commands conversation.
              </p>
              <a href="#reservations" className="btn-luxury">Plan Your Evening</a>
            </div>
          </div>
        </div>
      </section>

      {/* ── 3D MENU GALLERY ──────────────────────────────────────────────── */}
      <MenuGallery3D />

      {/* ── REVIEWS ──────────────────────────────────────────────────────── */}
      <section style={{
        padding: '100px 0',
        background: 'linear-gradient(180deg, var(--brown-rich) 0%, var(--brown-deep) 100%)',
        borderTop: '1px solid rgba(201,169,110,0.1)',
      }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 32px' }}>
          <div style={{ textAlign: 'center', marginBottom: '64px' }}>
            <div className="section-label" style={{ marginBottom: '12px' }}>Guest Voices</div>
            <h2 style={{
              fontFamily: 'Cormorant Garamond, serif',
              fontSize: 'clamp(36px, 4vw, 54px)', fontWeight: 300,
            }}>
              What Our Guests Say
            </h2>
          </div>
          <div style={{
            display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '32px',
          }}>
            {reviews.map((r) => (
              <div key={r.name} style={{
                padding: '40px 36px',
                border: '1px solid rgba(201,169,110,0.12)',
                background: 'rgba(46,31,10,0.4)',
                position: 'relative',
              }}>
                {/* Quote mark */}
                <div style={{
                  position: 'absolute', top: '-18px', left: '28px',
                  fontFamily: 'Cormorant Garamond, serif', fontSize: '80px',
                  color: 'var(--gold)', opacity: 0.2, lineHeight: 1,
                }}>
                  "
                </div>
                {/* Stars */}
                <div style={{ display: 'flex', gap: '3px', marginBottom: '20px', color: 'var(--gold)' }}>
                  {[...Array(r.rating)].map((_, i) => <StarIcon key={i} />)}
                </div>
                <p style={{
                  fontFamily: 'Cormorant Garamond, serif', fontSize: '18px',
                  fontStyle: 'italic', lineHeight: 1.7, color: 'rgba(245,237,216,0.8)',
                  marginBottom: '24px',
                }}>
                  "{r.text}"
                </p>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <div style={{
                    width: '32px', height: '32px', borderRadius: '50%',
                    background: 'var(--brown-mid)', border: '1px solid rgba(201,169,110,0.3)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: '13px', color: 'var(--gold)',
                  }}>
                    {r.name.charAt(0)}
                  </div>
                  <div>
                    <div style={{ fontSize: '12px', letterSpacing: '0.08em', color: 'var(--cream)' }}>{r.name}</div>
                    <div style={{ fontSize: '10px', color: 'rgba(245,237,216,0.4)', letterSpacing: '0.1em' }}>Verified Guest</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── RESERVATIONS ─────────────────────────────────────────────────── */}
      <section id="reservations" style={{
        position: 'relative', padding: '140px 0',
        background: 'linear-gradient(135deg, var(--brown-deep) 0%, var(--brown-mid) 50%, var(--brown-deep) 100%)',
        overflow: 'hidden',
      }}>
        {/* Decorative */}
        <div style={{
          position: 'absolute', top: '50%', left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '600px', height: '600px',
          border: '1px solid rgba(201,169,110,0.06)',
          borderRadius: '50%', pointerEvents: 'none',
        }} />
        <div style={{
          position: 'absolute', top: '50%', left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '400px', height: '400px',
          border: '1px solid rgba(201,169,110,0.08)',
          borderRadius: '50%', pointerEvents: 'none',
        }} />

        <div style={{ maxWidth: '760px', margin: '0 auto', padding: '0 32px', textAlign: 'center', position: 'relative', zIndex: 1 }}>
          <div className="section-label" style={{ marginBottom: '16px' }}>Reservations</div>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '20px', marginBottom: '28px' }}>
            <div className="gold-line" style={{ width: '80px' }} />
            <span style={{ color: 'var(--gold)', fontSize: '18px' }}>✦</span>
            <div className="gold-line" style={{ width: '80px' }} />
          </div>
          <h2 style={{
            fontFamily: 'Cormorant Garamond, serif',
            fontSize: 'clamp(44px, 6vw, 80px)',
            fontWeight: 300, lineHeight: 1,
            marginBottom: '24px',
          }}>
            Reserve Your<br />
            <span style={{ fontStyle: 'italic', color: 'var(--gold)' }}>Table Tonight</span>
          </h2>
          <p style={{
            fontSize: '15px', fontWeight: 300, lineHeight: 1.85,
            color: 'rgba(245,237,216,0.65)', marginBottom: '56px',
            maxWidth: '520px', margin: '0 auto 56px',
          }}>
            Whether it's an intimate dinner for two, a birthday celebration, or a private corporate
            event — our team is dedicated to crafting an unforgettable experience.
          </p>

          {/* Contact options */}
          <div style={{ display: 'flex', gap: '20px', justifyContent: 'center', flexWrap: 'wrap', marginBottom: '48px' }}>
            <a
              href="tel:+27310200028"
              className="btn-luxury"
              style={{ display: 'flex', alignItems: 'center', gap: '10px', textDecoration: 'none' }}
            >
              <PhoneIcon />
              Call to Reserve
            </a>
            <a
              href="https://wa.me/27310200028?text=Hi%2C%20I'd%20like%20to%20make%20a%20reservation%20at%20Marbella%20Grand%20Café"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: 'inline-flex', alignItems: 'center', gap: '10px',
                padding: '14px 44px', border: '1px solid rgba(245,237,216,0.25)',
                color: 'rgba(245,237,216,0.75)', fontFamily: 'Jost, sans-serif',
                fontSize: '11px', fontWeight: 400, letterSpacing: '0.25em',
                textTransform: 'uppercase', textDecoration: 'none',
                transition: 'all 0.3s ease',
              }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--gold)'; e.currentTarget.style.color = 'var(--gold)' }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(245,237,216,0.25)'; e.currentTarget.style.color = 'rgba(245,237,216,0.75)' }}
            >
              WhatsApp Us
            </a>
          </div>

          {/* Hours */}
          <div style={{
            display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
            gap: '16px', maxWidth: '600px', margin: '0 auto',
            padding: '32px', border: '1px solid rgba(201,169,110,0.12)',
            background: 'rgba(28,18,8,0.5)',
          }}>
            {[
              { day: 'Mon – Thu', hours: '11:00 – 23:00' },
              { day: 'Fri', hours: '11:00 – 00:00' },
              { day: 'Sat', hours: '10:00 – 00:00' },
              { day: 'Sun', hours: '10:00 – 23:00' },
            ].map((h) => (
              <div key={h.day} style={{ textAlign: 'center' }}>
                <div className="section-label" style={{ fontSize: '9px', marginBottom: '6px', color: 'rgba(201,169,110,0.6)' }}>{h.day}</div>
                <div style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '18px', color: 'var(--cream)' }}>{h.hours}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FOOTER ───────────────────────────────────────────────────────── */}
      <footer style={{
        background: 'var(--charcoal)',
        borderTop: '1px solid rgba(201,169,110,0.15)',
        padding: '72px 0 40px',
      }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 32px' }}>
          {/* Top footer grid */}
          <div style={{
            display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
            gap: '48px', marginBottom: '64px',
          }}>
            {/* Brand */}
            <div>
              <Image src="/logo.png" alt="Marbella Grand Café" width={72} height={72} style={{ marginBottom: '20px', borderRadius: '4px' }} />
              <p style={{ fontSize: '13px', lineHeight: 1.8, color: 'rgba(245,237,216,0.5)', maxWidth: '220px' }}>
                Umhlanga's premier luxury restaurant and cocktail bar. Where every occasion becomes a memory.
              </p>
              <div style={{ display: 'flex', gap: '16px', marginTop: '24px' }}>
                <a href="https://www.instagram.com/marbellagrandcafe" target="_blank" rel="noopener noreferrer"
                  style={{ color: 'rgba(201,169,110,0.6)', transition: 'color 0.3s ease' }}
                  onMouseEnter={e => (e.currentTarget.style.color = 'var(--gold)')}
                  onMouseLeave={e => (e.currentTarget.style.color = 'rgba(201,169,110,0.6)')}
                >
                  <InstagramIcon />
                </a>
                <a href="https://www.facebook.com/marbellagrandcafe" target="_blank" rel="noopener noreferrer"
                  style={{ color: 'rgba(201,169,110,0.6)', transition: 'color 0.3s ease' }}
                  onMouseEnter={e => (e.currentTarget.style.color = 'var(--gold)')}
                  onMouseLeave={e => (e.currentTarget.style.color = 'rgba(201,169,110,0.6)')}
                >
                  <FacebookIcon />
                </a>
              </div>
            </div>

            {/* Links */}
            <div>
              <div className="section-label" style={{ marginBottom: '24px', fontSize: '9px' }}>Navigate</div>
              {['About', 'Menu', 'Experience', 'Reservations'].map((link) => (
                <div key={link} style={{ marginBottom: '12px' }}>
                  <a href={`#${link.toLowerCase()}`}
                    style={{ fontSize: '13px', color: 'rgba(245,237,216,0.5)', textDecoration: 'none', transition: 'color 0.3s ease', letterSpacing: '0.05em' }}
                    onMouseEnter={e => (e.currentTarget.style.color = 'var(--gold)')}
                    onMouseLeave={e => (e.currentTarget.style.color = 'rgba(245,237,216,0.5)')}
                  >
                    {link}
                  </a>
                </div>
              ))}
            </div>

            {/* Contact */}
            <div>
              <div className="section-label" style={{ marginBottom: '24px', fontSize: '9px' }}>Visit Us</div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px', color: 'rgba(245,237,216,0.5)' }}>
                  <span style={{ marginTop: '2px', flexShrink: 0, color: 'var(--gold-dark)' }}><MapPinIcon /></span>
                  <span style={{ fontSize: '13px', lineHeight: 1.7 }}>
                    Shop C1, The Pearls Mall<br />
                    2 McCausland Crescent<br />
                    Umhlanga Rocks, 4320
                  </span>
                </div>
                <a href="tel:+27310200028" style={{ display: 'flex', alignItems: 'center', gap: '12px', color: 'rgba(245,237,216,0.5)', textDecoration: 'none', fontSize: '13px' }}>
                  <span style={{ color: 'var(--gold-dark)' }}><PhoneIcon /></span>
                  031 020 0028
                </a>
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px', color: 'rgba(245,237,216,0.5)' }}>
                  <span style={{ marginTop: '2px', flexShrink: 0, color: 'var(--gold-dark)' }}><ClockIcon /></span>
                  <span style={{ fontSize: '13px', lineHeight: 1.7 }}>
                    Mon–Thu, Sun: 11am–11pm<br />
                    Fri: 11am–12am<br />
                    Sat: 10am–12am
                  </span>
                </div>
              </div>
            </div>

            {/* Highlights */}
            <div>
              <div className="section-label" style={{ marginBottom: '24px', fontSize: '9px' }}>Highlights</div>
              {['Live Music Nightly', 'Happy Hour 12pm–4pm', 'Private Dining Events', 'Sushi & Cocktail Bar', 'Ocean Views', 'Dog Friendly (Outdoors)'].map((h) => (
                <div key={h} style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '10px' }}>
                  <div style={{ width: '3px', height: '3px', borderRadius: '50%', background: 'var(--gold)', opacity: 0.6 }} />
                  <span style={{ fontSize: '12px', color: 'rgba(245,237,216,0.45)', letterSpacing: '0.04em' }}>{h}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Bottom bar */}
          <div style={{
            borderTop: '1px solid rgba(245,237,216,0.06)',
            paddingTop: '32px',
            display: 'flex', flexWrap: 'wrap', gap: '16px',
            alignItems: 'center', justifyContent: 'space-between',
          }}>
            <span style={{ fontSize: '11px', color: 'rgba(245,237,216,0.25)', letterSpacing: '0.1em' }}>
              © {new Date().getFullYear()} Marbella Grand Café. All rights reserved.
            </span>
            <span style={{ fontSize: '11px', color: 'rgba(245,237,216,0.2)', letterSpacing: '0.1em', fontStyle: 'italic', fontFamily: 'Cormorant Garamond, serif' }}>
              Luxury Restaurant & Cocktail Bar · Umhlanga Rocks, KwaZulu-Natal
            </span>
          </div>
        </div>
      </footer>

    </main>
  )
}