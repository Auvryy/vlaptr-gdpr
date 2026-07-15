import { Menu, Search } from "lucide-react";
import InputField from "./InputField";
import { useState } from 'react'
import evernight from '../assets/evernight.jpg'
import Button from "./Button";

export default function NavBar({ onViewChange }: { onViewChange: (view: string) => void }) {
  const [search, setSearch] = useState('');

  return (
    <nav className="flex items-center justify-between px-10 py-5  ">
      <section className="flex items-center justify-start px-3  mr-15 gap-5 w-fit">
        <Menu className="text-black cursor-pointer" />
        <p className="text-black text-lg font-bold cursor-pointer">Vlaptr</p>
      </section>
      <section className="relative w-full flex items-center rounded-sm mr-5">
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
      <section className="w-fit flex items-center gap-3">
        <div className="rounded-full w-10 h-10 bg-black">
          <img src={evernight} className="object-cover w-full rounded-full" />
        </div>
        <div>
          <Button
            label="Cart"
            onClick={() => onViewChange('cart')}
            loading={false}

          />
        </div>
      </section>
    </nav>
  );
}
