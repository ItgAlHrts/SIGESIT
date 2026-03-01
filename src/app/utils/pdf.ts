import jsPDF from "jspdf";
import { Balita } from "../types";
import { mockBalita } from "../data/mockData";

// generatePDF draws a simple report and saves it with provided filename
// accepts an optional array of balita data; if not provided, uses mockBalita
export async function generatePDF(
  filename = "laporan.pdf",
  balitas: Balita[] = mockBalita,
) {
  const doc = new jsPDF();

  // logo image path (not part of the requirement but kept for branding)
  const logoUrl = new URL("../../assets/LOGO.png", import.meta.url).href;

  const img = new Image();
  img.src = logoUrl;

  await new Promise<void>((resolve) => {
    img.onload = () => {
      try {
        doc.addImage(img, "PNG", 14, 10, 20, 20);
      } catch (e) {
        console.error("Error adding logo to PDF", e);
      }
      resolve();
    };
    img.onerror = () => {
      console.warn("Failed to load logo image for PDF");
      resolve();
    };
  });

  doc.setFontSize(14);
  doc.text("SIGESIT", 40, 18);

  doc.setFontSize(12);
  doc.text("LAPORAN DATA SISTEM", 40, 25);

  doc.line(14, 35, 196, 35);

  let y = 45;
  doc.setFontSize(10);

  // add summary counts at top
  const total = balitas.length;
  const normal = balitas.filter((b) => b.status === "normal").length;
  const risiko = balitas.filter((b) => b.status === "risiko").length;
  const stunting = balitas.filter((b) => b.status === "stunting").length;

  doc.text(`Total balita: ${total}`, 14, y);
  y += 6;
  doc.text(`Normal: ${normal}`, 14, y);
  y += 6;
  doc.text(`Risiko: ${risiko}`, 14, y);
  y += 6;
  doc.text(`Stunting: ${stunting}`, 14, y);
  y += 10;

  // list each balita as text blocks
  balitas.forEach((b, index) => {
    if (y > 280) {
      // new page when approaching bottom
      doc.addPage();
      y = 20;
    }

    doc.text(`ID: ${b.id}`, 14, y);
    y += 5;
    doc.text(`Nama: ${b.nama}`, 14, y);
    y += 5;
    doc.text(`Tanggal Lahir: ${b.tanggalLahir}`, 14, y);
    y += 5;
    doc.text(`Umur: ${b.umur} bulan`, 14, y);
    y += 5;
    doc.text(`Nama Ibu: ${b.namaIbu}`, 14, y);
    y += 5;
    doc.text(`Alamat: ${b.alamat}`, 14, y);
    y += 5;
    doc.text(`RT: ${b.rt}`, 14, y);
    y += 5;
    doc.text(`Status: ${b.status}`, 14, y);
    y += 5;
    doc.text(`Berat: ${b.beratBadan} kg`, 14, y);
    y += 5;
    doc.text(`Tinggi: ${b.tinggiBadan} cm`, 14, y);
    y += 5;
    doc.text(`Last Checkup: ${b.lastCheckup}`, 14, y);
    y += 8; // extra spacing before next record
  });

  doc.save(filename);
}
