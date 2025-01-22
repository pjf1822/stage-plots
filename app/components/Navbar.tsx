import { Button } from "@/components/ui/button";
import Link from "next/link";
import React from "react";
import { logout } from "../login/actions";

const Navbar = () => {
  return (
    <div>
      <Link href="/">
        <Button className="text-white hover:bg-gray-600">Home</Button>
      </Link>

      <Link href="/plots">
        <Button className="text-white hover:bg-gray-600">My Plots</Button>
      </Link>
      <Button onClick={logout} className="text-white hover:bg-gray-600">
        Logout
      </Button>
    </div>
  );
};

export default Navbar;
