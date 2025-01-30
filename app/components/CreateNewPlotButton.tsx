"use client";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation"; // Import useRouter from next/navigation
import React, { useState } from "react";

const CreateNewPlotButton = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const createStagePlot = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch("/api/stage-plots/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: "New Stage Plot", // Example data
          description: "This is a new stage plot",
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to create stage plot");
      }

      const data = await response.json();

      router.push(`/plots/${data.stagePlot.id}`);
    } catch (error: any) {
      setError(
        error.message || "An error occurred while creating the stage plot"
      );
    } finally {
      setLoading(false);
    }
  };
  return (
    <Button
      onClick={createStagePlot}
      disabled={loading}
      variant={"outline"}
      className="font-urbanist text-lg px-6 py-6 rounded-lg bg-gradient-to-r from-themeThree  to-themeOne hover:from-themeFive-600 hover:via-themeTwo-600 hover:to-themeOne-600 text-white shadow-xl transform transition-all hover:scale-105"
    >
      {loading ? "Creating..." : "Create new plot"}
    </Button>
  );
};

export default CreateNewPlotButton;
