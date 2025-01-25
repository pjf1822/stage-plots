"use client";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";
import { createClient } from "@/utils/supabase/client";

const Navbar = () => {
  const supabase = createClient();

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
    <div className="flex items-center space-x-4 bg-themeFive p-4 border-b-4 border-themeFour">
      <div>
        <Image src="/logo.png" alt="Logo" width={160} height={160} />
      </div>
      <Link href="/">
        <Button className="text-white hover:bg-gray-600">Home</Button>
      </Link>

      <Button onClick={handleLogout} className="text-white hover:bg-gray-600">
        Logout
      </Button>
    </div>
  );
};

export default Navbar;
