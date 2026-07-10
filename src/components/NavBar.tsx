import { Menu } from "lucide-react";

export default function NavBar() {
  return (
    <nav className="flex items-center justify-between p-3 bg-green-500">
      <section className="flex items-center justify-start px-3 gap-5 w-[80%]">
        <Menu className="text-white cursor-pointer" />
        <p className="text-white text-lg font-semibold">Vlaptr</p>
      </section>
      <section className="w-full">
        <input className="" />
      </section>
      <section className="w-full"></section>
    </nav>
  );
}
