import { NextRequest, NextResponse } from "next/server";
import { writeFile } from "fs/promises";
import { join } from "path";
import { mkdirSync, existsSync } from "fs";

// Helper to ensure directory exists
const ensureDirExists = (dirPath: string) => {
  if (!existsSync(dirPath)) {
    mkdirSync(dirPath, { recursive: true });
  }
};

export async function POST(request: NextRequest) {
  const data = await request.formData();
  const file: File | null = data.get("file") as unknown as File;

  if (!file) {
    return NextResponse.json({ success: false, message: "No file uploaded." }, { status: 400 });
  }

  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);

  // Create a unique filename to avoid overwriting
  const filename = `${Date.now()}-${file.name.replace(/\s/g, "_")}`;
  
  // Define the upload path
  const uploadDir = join(process.cwd(), "public", "uploads", "projects");
  const path = join(uploadDir, filename);

  // Ensure the upload directory exists
  ensureDirExists(uploadDir);

  try {
    await writeFile(path, buffer);
    console.log(`File uploaded to ${path}`);

    const imageUrl = `/uploads/projects/${filename}`;
    return NextResponse.json({ success: true, url: imageUrl });
  } catch (error) {
    console.error("Error uploading file:", error);
    return NextResponse.json({ success: false, message: "Error uploading file." }, { status: 500 });
  }
}
