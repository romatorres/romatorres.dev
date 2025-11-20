import { NextResponse } from "next/server";
import { createProject, listProjects } from "@/app/admin/projects/action";
import { Size } from "@prisma/client";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { title, description, imageUrl, link, sizes, isActive = true } = body;

    if (!title || !description || !imageUrl || !sizes) {
      return NextResponse.json(
        { message: "Todos os campos obrigatórios devem ser preenchidos." },
        { status: 400 }
      );
    }

    const project = await createProject({
      title,
      description,
      imageUrl,
      link,
      sizes: sizes as Size,
      isActive,
    });

    return NextResponse.json(project, { status: 201 });
  } catch (error: unknown) {
    console.error("Error creating project:", error);
    const errorMessage =
      error instanceof Error ? error.message : "Erro ao criar um projeto.";
    return NextResponse.json(
      { message: errorMessage },
      { status: errorMessage.includes("permissão") ? 403 : 500 }
    );
  }
}

export async function GET() {
  try {
    const project = await listProjects();
    return NextResponse.json(project);
  } catch (error: unknown) {
    console.error("Error fetching project:", error);
    const errorMessage =
      error instanceof Error ? error.message : "Erro ao buscar um projeto.";
    return NextResponse.json(
      { message: errorMessage },
      { status: errorMessage.includes("permissão") ? 403 : 500 }
    );
  }
}
