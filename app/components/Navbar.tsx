"use client";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";
import { createClient } from "@/utils/supabase/client";
import { usePathname } from "next/navigation";

const Navbar = () => {
  const supabase = createClient();
  const pathname = usePathname();

  if (pathname === "/" || pathname === "/privacy") {
    return null;
  }

  const handleLogout = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) {
        console.error("Error logging out:", error);
      } else {
        window.location.href = "/";
      }
    } catch (err) {
      console.error("Unexpected error during logout:", err);
    }
  };

  return (
    <div className="flex justify-between items-center  bg-black border-b-4">
      <Link href="/dashboard">
        <Image
          src="/newlogo3.png"
          alt="Logo"
          width={170}
          height={170}
          className="cursor-pointer rounded-sm"
        />
      </Link>

      <Button
        onClick={handleLogout}
        variant={"outline"}
        className="font-urbanist bg-black mr-8 text-lg px-6 py-6 rounded-lg text-white shadow-xl transform transition-all hover:scale-105"
      >
        Logout
      </Button>
    </div>
  );
};

export default Navbar;
