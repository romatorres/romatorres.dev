import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/auth-server-utils";
import { Size } from "@prisma/client";

export async function POST(request: Request) {
  try {
    await requireAdmin();
    const body = await request.json();
    const { title, description, imageUrl, link, sizes, isActive = true } = body;

    if (!title || !description || !imageUrl || !sizes) {
      return NextResponse.json(
        { message: "Todos os campos obrigatórios devem ser preenchidos." },
        { status: 400 }
      );
    }

    const project = await prisma.project.create({
      data: {
        title,
        description,
        imageUrl,
        link,
        sizes: sizes as Size,
        isActive,
      },
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
    const projects = await prisma.project.findMany({
      where: {
        isActive: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });
    return NextResponse.json(projects);
  } catch (error: unknown) {
    console.error("Error fetching project:", error);
    const errorMessage =
      error instanceof Error ? error.message : "Erro ao buscar um projeto.";
    return NextResponse.json(
      { message: errorMessage },
      { status: 500 }
    );
  }
}
