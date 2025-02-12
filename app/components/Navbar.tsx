"use client";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";
import { createClient } from "@/utils/supabase/client";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const Navbar = () => {
  const supabase = createClient();
  const pathname = usePathname();
  const [userProfilePic, setUserProfilePic] = useState<string | null>(null);

  if (
    pathname === "/" ||
    pathname === "/privacy" ||
    pathname === "/quickPlot"
  ) {
    return null;
  }
  useEffect(() => {
    const getSession = async () => {
      try {
        const { data, error } = await supabase.auth.getSession();
        if (error) {
          console.error("Error fetching session:", error);
          return;
        }
        const avatarUrl = data?.session?.user?.user_metadata?.avatar_url || "";
        setUserProfilePic(avatarUrl);
      } catch (err) {
        console.error("Unexpected error fetching session:", err);
      }
    };

    getSession();
  }, []);

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
          priority
        />
      </Link>

      <div className="flex flex-row">
        {userProfilePic ? (
          <Image
            src={userProfilePic}
            alt="User Avatar"
            width={50}
            height={50}
            className="rounded-full border border-white mr-8"
          />
        ) : (
          <div className="w-12 h-12 bg-gray-500 rounded-full"></div>
        )}
        <Button
          onClick={handleLogout}
          variant={"outline"}
          className="font-urbanist bg-black mr-8 text-lg px-6 py-6 rounded-lg text-white shadow-xl transform transition-all hover:scale-105"
        >
          Logout
        </Button>
      </div>
    </div>
  );
};

export default Navbar;
