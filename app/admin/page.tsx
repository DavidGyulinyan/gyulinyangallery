import Link from "next/link";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus, Image, Calendar, Mail } from "lucide-react";

const adminSections = [
  {
    title: "Artworks",
    description: "Manage your gallery artworks",
    href: "/admin/artworks",
    icon: Image,
    actions: [
      { label: "Add New", href: "/admin/artworks/new", icon: Plus },
      { label: "View All", href: "/admin/artworks" },
    ],
  },
  {
    title: "Exhibitions",
    description: "Manage exhibitions and events",
    href: "/admin/exhibitions",
    icon: Calendar,
    actions: [
      { label: "Add New", href: "/admin/exhibitions/new", icon: Plus },
      { label: "View All", href: "/admin/exhibitions" },
    ],
  },
  {
    title: "Messages",
    description: "View contact form submissions",
    href: "/admin/messages",
    icon: Mail,
    actions: [{ label: "View Inbox", href: "/admin/messages" }],
  },
];

export default function AdminDashboard() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <p className="text-muted-foreground">
          Welcome to your admin dashboard. Manage your gallery content here.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {adminSections.map((section) => (
          <Card
            key={section.title}
            className="hover:shadow-lg transition-shadow"
          >
            <CardHeader>
              <div className="flex items-center space-x-2">
                <section.icon className="h-6 w-6" />
                <CardTitle>{section.title}</CardTitle>
              </div>
              <CardDescription>{section.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {section.actions.map((action) => (
                  <Button
                    key={action.label}
                    asChild
                    variant={action.icon ? "default" : "outline"}
                    size="sm"
                    className="w-full justify-start"
                  >
                    <Link href={action.href}>
                      {action.icon && <action.icon className="h-4 w-4 mr-2" />}
                      {action.label}
                    </Link>
                  </Button>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
