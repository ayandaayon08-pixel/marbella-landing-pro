import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Marbella Grand Café | Luxury Restaurant & Cocktail Bar Umhlanga',
  description:
    'Marbella Grand Café is Umhlanga\'s premier luxury restaurant and cocktail bar. Fine dining, world-class cocktails, live music, and breathtaking ocean views at The Pearls Mall, Umhlanga Rocks.',
  keywords: [
    'luxury restaurant Umhlanga',
    'best restaurant Umhlanga',
    'fine dining Umhlanga',
    'cocktail bar Umhlanga',
    'restaurant near me Umhlanga',
    'Marbella Grand Café',
    'Marbella Umhlanga',
    'restaurant Durban beachfront',
    'luxury dining KwaZulu-Natal',
    'The Pearls Umhlanga restaurant',
    'happy hour Umhlanga',
    'live music restaurant Umhlanga',
    'private dining Umhlanga',
    'sushi restaurant Umhlanga',
    'rooftop restaurant Umhlanga',
  ],
  authors: [{ name: 'Marbella Grand Café' }],
  creator: 'Marbella Grand Café',
  publisher: 'Marbella Grand Café',
  metadataBase: new URL('https://www.marbellagrandcafe.co.za'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    locale: 'en_ZA',
    url: 'https://www.marbellagrandcafe.co.za',
    siteName: 'Marbella Grand Café',
    title: 'Marbella Grand Café | Luxury Restaurant & Cocktail Bar Umhlanga',
    description:
      'Where Umhlanga\'s finest gather. Exquisite cuisine, signature cocktails, live music, and ocean-inspired ambiance at The Pearls Mall, Umhlanga Rocks.',
    images: [
      {
        url: '/hero-bg.jpg',
        width: 1200,
        height: 630,
        alt: 'Marbella Grand Café - Luxury Restaurant Umhlanga',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Marbella Grand Café | Luxury Restaurant & Cocktail Bar Umhlanga',
    description:
      'Umhlanga\'s premier luxury dining destination. Fine cuisine, world-class cocktails & live music at The Pearls Mall.',
    images: ['/hero-bg.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
    },
  },
  verification: {
    google: 'your-google-verification-code',
  },
}

const restaurantSchema = {
  '@context': 'https://schema.org',
  '@type': 'Restaurant',
  name: 'Marbella Grand Café',
  alternateName: 'Marbella Grand Cafe Umhlanga',
  description:
    'A luxury restaurant and cocktail bar in Umhlanga offering fine dining, signature cocktails, live music, and a premium atmosphere at The Pearls Mall.',
  url: 'https://www.marbellagrandcafe.co.za',
  telephone: '+27310200028',
  priceRange: 'R500+',
  image: [
    'https://www.marbellagrandcafe.co.za/hero-bg.jpg',
    'https://www.marbellagrandcafe.co.za/dining.jpg',
  ],
  address: {
    '@type': 'PostalAddress',
    streetAddress: '2 McCausland Crescent, Shop C1, The Pearls Mall',
    addressLocality: 'Umhlanga Rocks',
    addressRegion: 'KwaZulu-Natal',
    postalCode: '4320',
    addressCountry: 'ZA',
  },
  geo: {
    '@type': 'GeoCoordinates',
    latitude: -29.7256,
    longitude: 31.0819,
  },
  openingHoursSpecification: [
    {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Sunday'],
      opens: '11:00',
      closes: '23:00',
    },
    {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Friday'],
      opens: '11:00',
      closes: '00:00',
    },
    {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Saturday'],
      opens: '10:00',
      closes: '00:00',
    },
  ],
  servesCuisine: ['South African', 'Seafood', 'Sushi', 'Mediterranean', 'International'],
  hasMenu: 'https://www.marbellagrandcafe.co.za/#menu',
  acceptsReservations: true,
  aggregateRating: {
    '@type': 'AggregateRating',
    ratingValue: '4.4',
    reviewCount: '104',
    bestRating: '5',
    worstRating: '1',
  },
  amenityFeature: [
    { '@type': 'LocationFeatureSpecification', name: 'Live Music', value: true },
    { '@type': 'LocationFeatureSpecification', name: 'Outdoor Seating', value: true },
    { '@type': 'LocationFeatureSpecification', name: 'Cocktail Bar', value: true },
    { '@type': 'LocationFeatureSpecification', name: 'Private Dining Room', value: true },
    { '@type': 'LocationFeatureSpecification', name: 'Wheelchair Accessible', value: true },
    { '@type': 'LocationFeatureSpecification', name: 'Free WiFi', value: true },
    { '@type': 'LocationFeatureSpecification', name: 'Happy Hour', value: true },
  ],
  sameAs: [
    'https://www.instagram.com/marbellagrandcafe',
    'https://www.facebook.com/marbellagrandcafe',
  ],
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(restaurantSchema) }}
        />
        <link rel="icon" href="/logo.png" />
        <meta name="theme-color" content="#1C1208" />
        <meta name="geo.region" content="ZA-KZN" />
        <meta name="geo.placename" content="Umhlanga Rocks, KwaZulu-Natal" />
        <meta name="geo.position" content="-29.7256;31.0819" />
        <meta name="ICBM" content="-29.7256, 31.0819" />
      </head>
      <body>{children}</body>
    </html>
  )
}