// pages/index.tsx
import Header from "@/components/Header";
import Search from "@/components/Search";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-between h-screen bg-gray-900">
      <Header />
      <Search />
      <Footer />
    </div>
  );
}
