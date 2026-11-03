import { useCallback, useState } from 'react';
import { Footer } from './components/Footer';
import { FloatingContact } from './components/FloatingContact';
import { Header } from './components/Header';
import { Agenda } from './components/sections/Agenda';
import { BookingsDialog } from './components/sections/BookingsDialog';
import { Contact } from './components/sections/Contact';
import { Faq } from './components/sections/Faq';
import { Hero } from './components/sections/Hero';
import { Methodology } from './components/sections/Methodology';
import { Portfolio } from './components/sections/Portfolio';
import { Process } from './components/sections/Process';
import { ReverseEngineering } from './components/sections/ReverseEngineering';
import { Services } from './components/sections/Services';
import { useBookings } from './hooks/useBookings';
import type { ServiceId } from './types';

export default function App() {
  const { bookings, addBooking, cancelBooking } = useBookings();
  const [serviceId, setServiceId] = useState<ServiceId | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);

  const scrollToAgenda = useCallback(() => {
    document
      .getElementById('agenda')
      ?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }, []);

  const handleSelectService = useCallback(
    (nextId: ServiceId) => {
      setServiceId(nextId);
      scrollToAgenda();
    },
    [scrollToAgenda],
  );

  return (
    <div className="min-h-screen bg-canvas">
      <Header
        bookingCount={bookings.length}
        onOpenBookings={() => setDialogOpen(true)}
        onOpenAgenda={scrollToAgenda}
      />

      <main>
        <Hero onOpenAgenda={scrollToAgenda} />
        <Services onSelectService={handleSelectService} />
        <Portfolio />
        <ReverseEngineering />
        <Methodology />
        <Process />
        <Agenda
          key={serviceId ?? 'sem-servico'}
          bookings={bookings}
          onCreate={addBooking}
          serviceId={serviceId}
          onServiceChange={setServiceId}
          onOpenBookings={() => setDialogOpen(true)}
        />
        <Faq />
        <Contact />
      </main>

      <Footer />
      <FloatingContact />

      <BookingsDialog
        open={dialogOpen}
        bookings={bookings}
        onClose={() => setDialogOpen(false)}
        onCancel={cancelBooking}
      />
    </div>
  );
}
