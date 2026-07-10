import { Menu, Search } from "lucide-react";
import InputField from "./InputField";
import { useState } from 'react'

export default function NavBar() {
  const [search, setSearch] = useState('');

  return (
    <nav className="flex items-center justify-between px-10 py-5  bg-emerald-500 ">
      <section className="flex items-center justify-start px-3  mr-15 gap-5 w-fit">
        <Menu className="text-white cursor-pointer" />
        <p className="text-white text-lg font-bold cursor-pointer">Vlaptr</p>
      </section>
      <section className="relative w-full flex items-center rounded-sm ">
        <InputField
          label=""
          type="text"
          value={search}
          onChange={setSearch}
        />
        <div className="absolute pl-3 pt-2 pointer-events-none">
          <Search className="h-6 w-6 text-white" />
        </div>
      </section>
      <section className="w-fit"></section>
    </nav>
  );
}
