"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { contactFormSchema, type Message } from "@/lib/schemas";
import { createClient } from "@/lib/supabase/client";

interface ContactFormProps {
  artworkId?: string;
}

export function ContactForm({ artworkId }: ContactFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<Message>({
    resolver: zodResolver(contactFormSchema),
  });

  const onSubmit = async (data: Message) => {
    setIsSubmitting(true);
    try {
      const supabase = createClient();
      const messageData = {
        ...data,
        message: artworkId
          ? `Inquiry about artwork ${artworkId}: ${data.message}`
          : data.message,
      };

      const { error } = await supabase.from("messages").insert([messageData]);

      if (error) throw error;

      setIsSubmitted(true);
      reset();
    } catch (error) {
      console.error("Error submitting form:", error);
      alert("Failed to send message. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSubmitted) {
    return (
      <div className="text-center py-8">
        <h3 className="text-lg font-semibold mb-2">Thank you!</h3>
        <p className="text-muted-foreground">
          Your message has been sent. We'll get back to you soon.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="name">Name *</Label>
          <Input id="name" {...register("name")} placeholder="Your full name" />
          {errors.name && (
            <p className="text-sm text-red-500">{errors.name.message}</p>
          )}
        </div>
        <div className="space-y-2">
          <Label htmlFor="email">Email *</Label>
          <Input
            id="email"
            type="email"
            {...register("email")}
            placeholder="your@email.com"
          />
          {errors.email && (
            <p className="text-sm text-red-500">{errors.email.message}</p>
          )}
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="message">Message *</Label>
        <Textarea
          id="message"
          {...register("message")}
          placeholder={
            artworkId
              ? "Tell us about your interest in this artwork..."
              : "Your message..."
          }
          rows={4}
        />
        {errors.message && (
          <p className="text-sm text-red-500">{errors.message.message}</p>
        )}
      </div>

      <Button type="submit" className="w-full" disabled={isSubmitting}>
        {isSubmitting ? "Sending..." : "Send Message"}
      </Button>
    </form>
  );
}
