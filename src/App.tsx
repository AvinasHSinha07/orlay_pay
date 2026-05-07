/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { CustomCursor } from './components/CustomCursor';
import { SmoothScroll } from './components/SmoothScroll';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { Problema } from './components/Problema';
import { Soluzione } from './components/Soluzione';
import { ConsoleOrganizzatore } from './components/ConsoleOrganizzatore';
import { Mappe } from './components/Mappe';
import { TargetAudience } from './components/TargetAudience';
import { Analytics } from './components/Analytics';
import { CTA } from './components/CTA';
import { Footer } from './components/Footer';

export default function App() {
  return (
    <SmoothScroll>
      <div className="relative overflow-x-hidden selection:bg-brand-primary/30 selection:text-brand-dark">
        <CustomCursor />
        <Navbar />
        <main>
          <Hero />
          <Problema />
          <Soluzione />
          <ConsoleOrganizzatore />
          <Mappe />
          <TargetAudience />
          <Analytics />
          <CTA />
        </main>
        <Footer />
      </div>
    </SmoothScroll>
  );
}
