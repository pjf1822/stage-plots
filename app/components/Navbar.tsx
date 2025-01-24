import { Button } from "@/components/ui/button";
import Link from "next/link";
import React from "react";
import { logout } from "../login/actions";
import Image from "next/image";

const Navbar = () => {
  return (
    <div className="flex items-center space-x-4 bg-black p-4">
      <div>
        <Image
          src="/logo.png"
          alt="Logo"
          width={160}
          height={160}
          objectFit="contain"
        />
      </div>
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
