import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/lib/theme";
import { LanguageProvider } from "@/lib/i18n";

// Poppins is what neda.gov.lk uses
const sans = Poppins({ subsets: ["latin"], weight: ["400", "500", "600"], variable: "--font-sans" });

export const metadata: Metadata = {
  title: "NEDA Entrepreneur Profile",
  description:
    "A 45-statement self-assessment that maps you to one of 16 entrepreneur archetypes, scores eight competencies, and gives you a 30-day plan.",
  openGraph: {
    title: "NEDA Entrepreneur Profile",
    description:
      "A 45-statement self-assessment that maps you to one of 16 entrepreneur archetypes, scores eight competencies, and gives you a 30-day plan.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning className={sans.variable}>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  const stored = localStorage.getItem('neda_theme');
                  const isDark = stored === 'dark' || (!stored && window.matchMedia('(prefers-color-scheme: dark)').matches);
                  document.documentElement.classList.toggle('dark', isDark);
                } catch (e) {}
              })();
            `,
          }}
        />
      </head>
      <body className="font-sans min-h-screen border-t-4 border-brand">
        <ThemeProvider>
          <LanguageProvider>{children}</LanguageProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
