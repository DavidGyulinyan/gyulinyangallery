import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Plus, Edit, Trash2 } from "lucide-react";
import { createClient } from "@/lib/supabase/server";
import type { Database } from "@/lib/database.types";

type Exhibition = Database["public"]["Tables"]["exhibitions"]["Row"];

async function getExhibitions() {
  const supabase = await createClient();
  const { data } = await supabase
    .from("exhibitions")
    .select("*")
    .order("date", { ascending: false });

  return data || [];
}

async function deleteExhibition(id: string) {
  "use server";

  const supabase = await createClient();
  const { error } = await supabase.from("exhibitions").delete().eq("id", id);

  if (error) throw error;
}

function ExhibitionCard({ exhibition }: { exhibition: Exhibition }) {
  return (
    <Card>
      <CardContent className="p-4">
        <div className="flex justify-between items-start">
          <div className="flex-1">
            <h3 className="font-semibold">{exhibition.title}</h3>
            <p className="text-sm text-muted-foreground">
              {exhibition.location}
            </p>
            <p className="text-sm text-muted-foreground">
              {new Date(exhibition.date).toLocaleDateString()}
            </p>
            {exhibition.description && (
              <p className="text-sm mt-2 line-clamp-2">
                {exhibition.description}
              </p>
            )}
          </div>
          <div className="flex gap-2 ml-4">
            <Button asChild variant="outline" size="sm">
              <Link href={`/admin/exhibitions/${exhibition.id}/edit`}>
                <Edit className="h-4 w-4" />
              </Link>
            </Button>
            <form action={deleteExhibition.bind(null, exhibition.id)}>
              <Button
                type="submit"
                variant="outline"
                size="sm"
                className="text-red-600 hover:text-red-700"
                onClick={(e) => {
                  if (
                    !confirm("Are you sure you want to delete this exhibition?")
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
      </CardContent>
    </Card>
  );
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
