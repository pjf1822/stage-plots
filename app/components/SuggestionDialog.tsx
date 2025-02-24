"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/hooks/use-toast";
import React, { useState } from "react";

const SuggestionDialog = () => {
  const [comment, setComment] = useState("");
  const [open, setOpen] = useState(false);

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (comment.trim() === "") {
      toast({
        title: "Please add a suggestion",
        variant: "destructive",
      });
      return;
    }

    try {
      const response = await fetch("/api/send-suggestion", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ comment }),
      });

      if (!response.ok) {
        throw new Error("Failed to send comment");
      }

      toast({ title: "Suggestion sent successfully!" });
      setComment("");
      setOpen(false); // Close the dialog
    } catch (error) {
      toast({ title: "Error sending suggestion", variant: "destructive" });
    }
  };

  return (
    <div className="fixed bottom-10 right-10">
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button
            variant={"outline"}
            className="font-urbanist bg-black text-lg px-6 py-6 rounded-lg text-white shadow-xl transform transition-all hover:scale-105"
          >
            Have a suggestion for the site?
          </Button>
        </DialogTrigger>
        <DialogContent className="bg-black text-white py-6 px-8 rounded-lg w-full max-w-lg mx-auto shadow-2xl">
          <DialogHeader>
            <DialogTitle>Have a suggestion for Stage Plotter?</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit} className="space-y-8 my-4">
            <Textarea
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="Write your comment..."
              rows={4}
              className="w-full p-4 border-2 border-white bg-transparent text-white placeholder-gray-400 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500"
            />

            <div className="flex justify-end gap-4">
              <Button
                type="submit"
                className="bg-white text-black hover:bg-gray-200 transition-all"
              >
                Submit
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default SuggestionDialog;
