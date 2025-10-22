// app/(main)/layout.tsx

// Impor footer standar Anda
import Footer from "@/app/components/Footer/Footer"; 

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      {children}
      <Footer /> {/* Footer standar akan ditampilkan di sini */}
    </>
  );
}