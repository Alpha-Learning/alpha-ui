import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "react-hot-toast";
import { AuthProvider } from "./contexts/AuthContext";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Alphera Academy",
  description: "Alphera Academy is a private school in Bahrain that provides a unique educational experience for students in grades 1-12. Our program is designed to help students develop the skills they need to succeed in college and beyond.",
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        {/* Adobe Typekit Font: Foco */}
        <link
          rel="stylesheet"
          href="https://use.typekit.net/hml0mge.css"
        />

        <link
          rel="stylesheet"
          id="gdlr-core-google-font-css"
          href="https://fonts.googleapis.com/css?family=Jost%3A100%2C200%2C300%2Cregular%2C500%2C600%2C700%2C800%2C900%2C100italic%2C200italic%2C300italic%2Citalic%2C500italic%2C600italic%2C700italic%2C800italic%2C900italic&amp;subset=cyrillic%2Clatin%2Clatin-ext%2Ccyrillic-ext%2Cvietnamese&amp;ver=5.5.1"
          type="text/css"
          media="all"
          precedence="default"
        />

        <link
          href="https://fonts.googleapis.com/css?family=Poppins:400%2C700%7CRoboto:400"
          rel="stylesheet"
          property="stylesheet"
          media="all"
          type="text/css"
          precedence="default"
        />

        <link
          href="https://db.onlinewebfonts.com/c/9f4965a37ac189de7844a4c13c7108f5?family=LeBeauneNew"
          rel="stylesheet"
          precedence="default"
        />
      </head>

      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        style={{
          fontFamily:
            "foco, 'LeBeauneNew', 'Jost', 'Poppins', 'Roboto', sans-serif",
        }}
      >
        <AuthProvider>
          {children}
          <Toaster position="bottom-right" />
        </AuthProvider>
      </body>
    </html>
  );
}
