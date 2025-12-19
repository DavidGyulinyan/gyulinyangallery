"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Edit, Trash2 } from "lucide-react";
import { deleteExhibition } from "@/lib/actions";
import type { Database } from "@/lib/database.types";

type Exhibition = Database["public"]["Tables"]["exhibitions"]["Row"];

export function ExhibitionCard({ exhibition }: { exhibition: Exhibition }) {
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
