"use client";
import { useRouter } from "next/navigation"; // Import useRouter from next/navigation
import React, { useState } from "react";

const CreateNewPlotButton = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter(); // Use the router hook for navigation

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
    <button onClick={createStagePlot} disabled={loading}>
      {loading ? "Creating..." : "Create new plot"}
    </button>
  );
};

export default CreateNewPlotButton;
