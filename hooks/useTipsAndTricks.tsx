"use client";
import React, { useEffect } from "react";
import { toast } from "./use-toast";

const tipsAndTricks = [
  "Use Ctrl C + Ctrl V for copy paste",
  "Drums first vocals last!",
  "The monitor engineer needs stage positions, not names, on the input list.",
  "Try writing down stage right vocal not Steve vocal! We dont need names we need positions!",
  "We auto save for you every 60 seconds!",
  `"Drums" is not an input!`,
  "Ctr Z for undo",
  "No duck tape on the stage please!",
  "Dont forget to save!",
];
const useTipsAndTricks = () => {
  useEffect(() => {
    const intervalId = setInterval(() => {
      const randomTip =
        tipsAndTricks[Math.floor(Math.random() * tipsAndTricks.length)];
      toast({
        title: randomTip,
        className: "fixed top-0 right-0 max-w-[480px] w-[320px]",
      });
    }, 50000);

    return () => clearInterval(intervalId);
  }, []);
  return <div>useTipsAndTricks</div>;
};

export default useTipsAndTricks;
