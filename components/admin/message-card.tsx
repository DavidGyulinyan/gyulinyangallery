"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Trash2, Check } from "lucide-react";
import { deleteMessage } from "@/lib/actions";
import { createClient } from "@/lib/supabase/client";
import type { Database } from "@/lib/database.types";

type Message = Database["public"]["Tables"]["messages"]["Row"];

async function markAsRead(id: string, onMarkRead?: (id: string) => void) {
  const supabase = createClient();
  await supabase.from("messages").update({ read: true }).eq("id", id);
  onMarkRead?.(id);
}

export function MessageCard({
  message,
  onMarkRead,
}: {
  message: Message;
  onMarkRead?: (id: string) => void;
}) {
  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="text-lg">{message.name}</CardTitle>
            <p className="text-sm text-muted-foreground">{message.email}</p>
          </div>
          <div className="flex items-center gap-2">
            <Badge variant="secondary">
              {new Date(message.created_at).toLocaleDateString()}
            </Badge>
            {!message.read && (
              <Button
                onClick={() => markAsRead(message.id, onMarkRead)}
                variant="outline"
                size="sm"
                className="text-green-600 hover:text-green-700"
              >
                <Check className="h-4 w-4" />
              </Button>
            )}
            <form action={deleteMessage.bind(null, message.id)}>
              <Button
                type="submit"
                variant="outline"
                size="sm"
                className="text-red-600 hover:text-red-700"
                onClick={(e) => {
                  if (
                    !confirm("Are you sure you want to delete this message?")
                  ) {
                    e.preventDefault();
                  }
                }}
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </form>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-sm leading-relaxed">{message.message}</p>
      </CardContent>
    </Card>
  );
}
