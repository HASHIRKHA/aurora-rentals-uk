'use client';

import CursorTracker from '@/components/CursorTracker';
import PageTransition from '@/components/PageTransition';
import CinematicHero from '@/components/homepage/CinematicHero';
import StaggerContainer from '@/components/shared/StaggerContainer';
import PropertyCard from '@/components/properties/PropertyCard';
import CinematicForm from '@/components/forms/CinematicForm';

const properties = [
  {
    title: 'Kensington Sky Residence',
    city: 'London',
    postcode: 'W8',
    bedrooms: 3,
    bathrooms: 2,
    total_sqft: 1280,
    price_pcm: 4200,
    images: ['https://images.unsplash.com/photo-1613545325268-9265e1609167?auto=format&fit=crop&w=1600&q=80']
  },
  {
    title: 'Manchester Momentum Hub',
    city: 'Manchester',
    postcode: 'M2',
    bedrooms: 2,
    bathrooms: 2,
    total_sqft: 990,
    price_pcm: 2700,
    images: ['https://images.unsplash.com/photo-1484154218962-a197022b5858?auto=format&fit=crop&w=1600&q=80']
  },
  {
    title: 'Edinburgh Heritage Loft',
    city: 'Edinburgh',
    postcode: 'EH1',
    bedrooms: 2,
    bathrooms: 1,
    total_sqft: 870,
    price_pcm: 2250,
    images: ['https://images.unsplash.com/photo-1493809842364-78817add7ffb?auto=format&fit=crop&w=1600&q=80']
  }
];

export default function HomePage() {
  return (
    <PageTransition>
      <CursorTracker />
      <CinematicHero />

      <section style={{ width: 'min(1180px,calc(100% - 2rem))', margin: '0 auto', padding: '64px 0' }}>
        <h2 style={{ fontSize: 'clamp(1.6rem,4vw,2.6rem)', marginBottom: 20 }}>Featured Properties</h2>
        <StaggerContainer className="grid-cards">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(270px,1fr))', gap: 16 }}>
            {properties.map((p) => <PropertyCard key={p.title} property={p} />)}
          </div>
        </StaggerContainer>
      </section>

      <section style={{ width: 'min(1100px,calc(100% - 2rem))', margin: '0 auto', padding: '20px 0 80px' }}>
        <h2 style={{ fontSize: 'clamp(1.6rem,4vw,2.6rem)', marginBottom: 16 }}>Start Your Premium Rental Journey</h2>
        <CinematicForm />
      </section>
    </PageTransition>
  );
}
