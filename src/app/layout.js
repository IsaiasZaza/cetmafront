import "./globals.css";
import { Poppins } from "next/font/google";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  variable: "--font-poppins",
});

export const metadata = {
  title: "Cetma Educacional",
  description: "A CETMA Educacional nasceu de um sonho. Um sonho que começou com a trajetória de um enfermeiro dedicado, com mais de 15 anos de experiência na área da saúde, que vivenciou os desafios e as demandas do dia a dia em grandes hospitais. Além de sua vivência prática como enfermeiro, ele atuou como professor e coordenador em renomadas instituições de ensino do Distrito Federal, o que lhe permitiu entender, de forma ampla, as lacunas e as oportunidades para transformar a formação dos profissionais de saúde.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="pt-br" className={poppins.variable}>
      <body className="font-poppins">{children}</body>
    </html>
  );
}
