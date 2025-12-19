import {
  Instagram,
  Facebook,
  Twitter,
  Mail,
  Phone,
  MapPin,
} from "lucide-react";
import { ContactForm } from "@/components/contact-form";

const socialLinks = [
  {
    name: "Instagram",
    href: "https://www.instagram.com/gyulinyangallery/?utm_source=qr&igsh=eWp0Z3luN3Vrbmwz",
    icon: Instagram,
    handle: "@gyulinyangallery",
  },
];

const contactInfo = [
  {
    icon: Mail,
    label: "Email",
    value: "gyulinyangallery@gmail.com",
    href: "mailto:gyulinyangallery@gmail.com",
  },
  {
    icon: Phone,
    label: "Phone",
    value: "+374 93176809",
    href: "tel:+37493176809",
  }
];

export default function ContactPage() {
  return (
    <div className="container py-8 flex flex-col items-center justify-center">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Contact Us</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Get in touch to learn more about our artwork, inquire about
            purchases, or discuss potential collaborations. We're here to help
            bring art into your life.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <div>
            <h2 className="text-2xl font-semibold mb-6">Send us a message</h2>
            <ContactForm />
          </div>

          {/* Contact Information */}
          <div className="space-y-8">
            <div>
              <h2 className="text-2xl font-semibold mb-6">Get in touch</h2>
              <div className="space-y-4">
                {contactInfo.map((item) => (
                  <div key={item.label} className="flex items-center space-x-3">
                    <item.icon className="h-5 w-5 text-muted-foreground" />
                    <div>
                      <p className="font-medium">{item.label}</p>
                      <a
                        href={item.href}
                        className="text-muted-foreground hover:text-foreground transition-colors"
                      >
                        {item.value}
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Social Links */}
            <div>
              <h2 className="text-2xl font-semibold mb-6">Follow us</h2>
              <div className="space-y-4">
                {socialLinks.map((social) => (
                  <a
                    key={social.name}
                    href={social.href}
                    className="flex items-center space-x-3 text-muted-foreground hover:text-foreground transition-colors"
                  >
                    <social.icon className="h-5 w-5" />
                    <div>
                      <p className="font-medium">{social.name}</p>
                      <p className="text-sm">{social.handle}</p>
                    </div>
                  </a>
                ))}
              </div>
            </div>

            {/* Business Hours */}
            <div>
              <h2 className="text-2xl font-semibold mb-6">Gallery Hours</h2>
              <div className="space-y-2 text-muted-foreground">
                <p>Monday - Friday: 10:00 AM - 6:00 PM</p>
                <p>Saturday: 11:00 AM - 5:00 PM</p>
                <p>Sunday: By appointment only</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
