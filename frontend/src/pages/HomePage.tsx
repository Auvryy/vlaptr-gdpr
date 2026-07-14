import BannerCarousel from "../components/BannerCarousel";
import NavBar from "../components/NavBar";
import SideBar from "../components/SideBar";
import ProductGrid from "../components/ProductsGrid";

export default function HomePage({ onViewChange }: { onViewChange: (view: string) => void }) {
  return (
    <div className="bg-emerald-50">
      {" "}
      {/* main body */}
      <NavBar onViewChange={onViewChange} />
      <div>
        {" "}
        {/* horizontal part side by side. */}
        <SideBar />
        <main className="flex flex-col items-center justify-center px-20">
          <BannerCarousel />
          <ProductGrid />

        </main>
      </div>
    </div>
  );
}
