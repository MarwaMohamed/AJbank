import { SmoothScroll } from "@/components/layout/SmoothScroll";
import { Navigation } from "@/components/layout/Navigation";
import { Hero } from "@/components/sections/Hero";
import { AtAGlance } from "@/components/sections/AtAGlance";
import { KeyFacts } from "@/components/sections/KeyFacts";
import { CeoMessage } from "@/components/sections/CeoMessage";
import { MarqueeBanner } from "@/components/sections/MarqueeBanner";
import { Strategy } from "@/components/sections/Strategy";
import { CorporateIdentity } from "@/components/sections/CorporateIdentity";
import { Sustainability } from "@/components/sections/Sustainability";
import { EmailCta } from "@/components/sections/EmailCta";
import { Footer } from "@/components/layout/Footer";

export default function HomePage() {
  return (
    <SmoothScroll>
      <Navigation />
      <main>
        <Hero />
        <AtAGlance />
        <KeyFacts />
        <CeoMessage />
        <MarqueeBanner />
        <Strategy />
        <CorporateIdentity />
        <Sustainability />
        <EmailCta />
      </main>
      <Footer />
    </SmoothScroll>
  );
}
