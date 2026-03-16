import { SmoothScroll } from "@/components/layout/SmoothScroll";
import { Navigation } from "@/components/layout/Navigation";
import { Hero } from "@/components/sections/Hero";
import { AtAGlance } from "@/components/sections/AtAGlance";
import { KeyFactsGlassCards } from "@/components/sections/KeyFactsGlassCards";
import { KeyFacts } from "@/components/sections/KeyFacts";
import { LeadershipMessages } from "@/components/sections/LeadershipMessages";
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
        <KeyFactsGlassCards />
        <KeyFacts />
        <LeadershipMessages />
        <Strategy />
        <CorporateIdentity />
        <Sustainability />
        <EmailCta />
      </main>
      <Footer />
    </SmoothScroll>
  );
}
