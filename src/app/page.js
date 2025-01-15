import LoginForm from "@/components/LoginForm";
import Image from "next/image";
import Header from "@/components/Header";
import BannerHome from "@/components/BannerHome";
import CourseCarousel from "@/components/Propaganda";
import Novidades from "@/components/NewsHome";
import CeoSection from "@/components/CeoHome";
import Propaganda from "@/components/CursosHome";
import Footer from "@/components/Footer";
import WhatsappVoador from "@/components/WhatsappVoador";

export default function Home() {
  return (
    <>
      <Header />
      <BannerHome />
      <Propaganda />
      <CourseCarousel />
      <Novidades />
      <CeoSection />
      <Footer />
      <WhatsappVoador />
    </>
  );
}
