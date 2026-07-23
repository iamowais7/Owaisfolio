import CustomCursor from "@/components/CustomCursor";
import ScrollProgress from "@/components/ScrollProgress";
import AiChat from "@/components/AiChat";
import Terminal from "@/components/Terminal";
import CommandPalette from "@/components/CommandPalette";
import Loader from "@/components/Loader";
import AchievementToast from "@/components/AchievementToast";
import CursorSpotlight from "@/components/CursorSpotlight";
import KeyboardHint from "@/components/KeyboardHint";
import Navbar from "@/components/Navbar";
import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import Skills from "@/components/sections/Skills";
import Experience from "@/components/sections/Experience";
import Projects from "@/components/sections/Projects";
import Vibes from "@/components/sections/Vibes";
import Education from "@/components/sections/Education";
import Contact from "@/components/sections/Contact";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Loader />
      <ScrollProgress />
      <CursorSpotlight />
      <CustomCursor />
      <AiChat />
      <Terminal />
      <CommandPalette />
      <AchievementToast />
      <KeyboardHint />
      <Navbar />
      <main>
        <Hero />
        <About />
        <Skills />
        <Experience />
        <Projects />
        <Vibes />
        <Education />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
