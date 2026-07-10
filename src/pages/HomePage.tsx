import NavBar from "../components/NavBar";
import SideBar from "../components/SideBar";

export default function HomePage() {
  return (
    <div>
      {" "}
      {/* main body */}
      <NavBar />
      <div>
        {" "}
        {/* horizontal part side by side. */}
        <SideBar />
        <main></main>
      </div>
    </div>
  );
}
