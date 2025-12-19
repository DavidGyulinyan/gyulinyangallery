import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Plus } from "lucide-react";
import { createClient } from "@/lib/supabase/server";
import { ExhibitionCard } from "@/components/admin/exhibition-card";

async function getExhibitions() {
  const supabase = await createClient();
  const { data } = await supabase
    .from("exhibitions")
    .select("*")
    .order("date", { ascending: false });

  return data || [];
}

export default async function ExhibitionsAdminPage() {
  const exhibitions = await getExhibitions();

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Exhibitions</h1>
          <p className="text-muted-foreground">
            Manage your exhibitions and events.
          </p>
        </div>
        <Button asChild>
          <Link href="/admin/exhibitions/new">
            <Plus className="h-4 w-4 mr-2" />
            Add New Exhibition
          </Link>
        </Button>
      </div>

      {exhibitions.length === 0 ? (
        <Card>
          <CardContent className="p-8 text-center">
            <p className="text-muted-foreground mb-4">No exhibitions yet.</p>
            <Button asChild>
              <Link href="/admin/exhibitions/new">
                <Plus className="h-4 w-4 mr-2" />
                Add Your First Exhibition
              </Link>
            </Button>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-4">
          {exhibitions.map((exhibition) => (
            <ExhibitionCard key={exhibition.id} exhibition={exhibition} />
          ))}
        </div>
      )}
    </div>
  );
}
