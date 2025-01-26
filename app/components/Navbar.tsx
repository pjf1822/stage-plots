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
    <div className="flex justify-between items-center space-x-4 bg-themeOne p-4 border-b-4 border-themeFive">
      <Link href="/">
        {/* Wrap the logo in a Link to make it clickable */}
        <Image
          src="/logo.png"
          alt="Logo"
          width={160}
          height={160}
          className="rounded-full cursor-pointer" // Add cursor-pointer for a clickable effect
        />
      </Link>

      <Button
        onClick={handleLogout}
        className="text-white hover:bg-gray-600 !mr-5 font-urbanist" // Adjusted margin-right to 20px (mr-5)
      >
        Logout
      </Button>
    </div>
  );
};

export default Navbar;
