"use client";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";
import { createClient } from "@/utils/supabase/client";
import { usePathname } from "next/navigation";

const Navbar = () => {
  const supabase = createClient();
  const pathname = usePathname();

  if (pathname === "/login") {
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
    <div className="flex justify-between items-center space-x-4 bg-black border-b-4 border-themeThree">
      <Link href="/">
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
        className="font-urbanist text-lg px-6 py-6 rounded-lg bg-gradient-to-r from-themeThree  to-themeOne hover:from-themeFive-600 hover:via-themeTwo-600 hover:to-themeOne-600 text-white shadow-xl transform transition-all hover:scale-105"
      >
        Logout
      </Button>
    </div>
  );
};

export default Navbar;
