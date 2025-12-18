import { Card, CardContent } from "@/components/ui/card";
import { createClient } from "@/lib/supabase/server";
import { MessageCard } from "@/components/admin/message-card";

async function getMessages() {
  const supabase = await createClient();
  const { data } = await supabase
    .from("messages")
    .select("*")
    .order("created_at", { ascending: false });

  return data || [];
}

export default async function MessagesAdminPage() {
  const messages = await getMessages();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Contact Messages</h1>
        <p className="text-muted-foreground">
          View messages from your contact form.
        </p>
      </div>

      {messages.length === 0 ? (
        <Card>
          <CardContent className="p-8 text-center">
            <p className="text-muted-foreground">No messages yet.</p>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-4">
          {messages.map((message) => (
            <MessageCard key={message.id} message={message} />
          ))}
        </div>
      )}
    </div>
  );
}
