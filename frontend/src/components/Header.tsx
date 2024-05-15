import { ROUTES } from "@/constants"
import { Link } from "react-router-dom"
import MobileNav from "./MobileNav"
import Nav from "./Nav"

const Header = () => {
  return (
    <div className="border-b-2 border-b-orange-500 py-6">
      <div className="container mx-auto flex justify-between items-center">
        <Link to={ROUTES.HOME} className="text-3xl font-bold tracking-tight text-orange-500">
          MernEats.com
        </Link>
        <div className="md:hidden">
          <MobileNav />
        </div>
        <div className="hidden md:block">
          <Nav />
        </div>
      </div>
    </div>
  )
}

export default Header
