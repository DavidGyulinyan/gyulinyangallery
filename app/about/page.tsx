import Image from "next/image";
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

export default async function AboutPage() {
  const exhibitions = await getExhibitions();

  return (
    <div className="container py-8 flex flex-col items-center">
      {/* Hero Section */}
      <div className="mb-16">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            About
          </h1>
          <p className="text-lg text-muted-foreground leading-relaxed mb-6">
            Gevorg Gyulinyan (born in 1967 in Yerevan, Armenia) began painting in early childhood. He graduated from the National University of Architecture and Construction of Armenia (NUACA). Trained as an architect, his professional practice has strongly influenced his artistic vision, shaping a refined sense of space, structure, and balance. While working in his profession, he continues to paint as a deeply personal and expressive pursuit.
          </p>
          <p className="text-lg text-muted-foreground leading-relaxed">
            His artistic journey began in the vibrant cultural environment of Armenia, where he first explored painting as a personal form of expression. Today, his work is presented primarily as a private practice, reflecting an ongoing dialogue between architectural discipline and artistic intuition.
          </p>
        </div>
      </div>

      {/* Artist Statement */}
      <section className="mb-16">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-8">
            Artist Statement
          </h2>
          <div className="prose prose-lg mx-auto text-muted-foreground">
            <p className="mb-6">
              My work reflects the human experience—the joy, the struggle, and the beauty found in imperfection. I believe that art has the power to connect us, transcending language and culture to touch something universal within us.
            </p>
            <p className="mb-6">
              Through my paintings, I seek to capture emotion in its rawest form. Each brushstroke becomes a conversation, each color a feeling. I draw inspiration from nature’s patterns, urban landscapes, and the complex tapestry of human relationships.
            </p>
            <p>
              My process is both intuitive and deliberate. I begin with a concept but allow the work to evolve organically. This approach creates pieces that are simultaneously planned and spontaneous, structured yet free. Each artwork tells its own story, inviting viewers to bring their own experiences and interpretations.
            </p>
          </div>
        </div>
      </section>

      {/* Exhibitions */}
      <section>
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
          Exhibitions
        </h2>
        {exhibitions.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-muted-foreground">No exhibitions listed yet.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {exhibitions.map((exhibition) => (
              <div
                key={exhibition.id}
                className="border rounded-lg p-6 hover:shadow-lg transition-shadow"
              >
                <h3 className="text-xl font-semibold mb-2">
                  {exhibition.title}
                </h3>
                <p className="text-muted-foreground mb-2">
                  {exhibition.location}
                </p>
                <p className="text-sm text-muted-foreground mb-4">
                  {new Date(exhibition.date).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </p>
                {exhibition.description && (
                  <p className="text-sm text-muted-foreground">
                    {exhibition.description}
                  </p>
                )}
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}

export const revalidate = 3600;
