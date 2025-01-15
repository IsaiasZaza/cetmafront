import LoginForm from "@/components/LoginForm";
import Image from "next/image";
import Header from "@/components/Header";
import BannerHome from "@/components/BannerHome";
import CourseCarousel from "@/components/Propaganda";
import CeoSection from "@/components/CeoSection";
import Propaganda from "@/components/CursosHome";
import Footer from "@/components/Footer";
import WhatsappVoador from "@/components/WhatsappVoador";
import NewsHome from "@/components/NewsHome";

export default function Home() {
  return (
    <>
      <Header />
      <BannerHome />
      <Propaganda />
      <CourseCarousel />
      <NewsHome />
      <CeoSection />
      <Footer />
      <WhatsappVoador />
    </>
  );
}
