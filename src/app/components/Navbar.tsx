import { NotifDropdownMenu } from "./NotifDropdownMenu";
import { UserDropdownMenu } from "./UserDropdownMenu";

export default function Navbar() {
  return (
    <nav>
      <div className="logo">
        <img src="/white_logo.svg" alt="Logo" />
      </div>
      <div className="flex">
        <NotifDropdownMenu />
        <UserDropdownMenu />
      </div>
    </nav>
  )
}