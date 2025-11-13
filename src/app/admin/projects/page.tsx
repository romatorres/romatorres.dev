"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Plus, Trash2, FilePenLine, Loader2, FolderKanban } from "lucide-react";
import { useProjectStore } from "@/stores/projectsStores";
import { Card } from "@/components/ui/card";
import { Dialog } from "@radix-ui/react-dialog";
import {
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { toast } from "sonner";
import { ProjectForm } from "./_components/project-form";
import Image from "next/image";
import { Project } from "@/types/projects";

export default function ProjectsPage() {
  const {
    projects,
    selectedProject,
    deleteProject,
    error,
    loading,
    setSelectedProject,
    fetchProjects,
  } = useProjectStore();

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [projectToDelete, setProjectToDelete] = useState<Project | null>(null);

  useEffect(() => {
    fetchProjects();
  }, [fetchProjects]);

  const handleOpenDialog = (project?: (typeof projects)[0]) => {
    setSelectedProject(project || {});
    setIsDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
    setSelectedProject(null);
  };

  const handleOpenDeleteDialog = (project: Project) => {
    setProjectToDelete(project);
    setIsDeleteDialogOpen(true);
  };

  const handleCloseDeleteDialog = () => {
    setProjectToDelete(null);
    setIsDeleteDialogOpen(false);
  };

  const handleDeleteConfirm = async () => {
    if (projectToDelete) {
      const promise = deleteProject(projectToDelete.id);
      toast.promise(promise, {
        loading: "Excluindo projeto...",
        success: "Projeto excluído com sucesso!",
        error: "Erro ao excluir projeto.",
      });
      handleCloseDeleteDialog();
    }
  };

  return (
    <div className="space-y-6 mt-16">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-50">Projetos</h1>
          <p className="text-gray-300">Gerencie seus projetos!</p>
        </div>
        <Button onClick={() => handleOpenDialog()}>
          <Plus className="h-4 w-4 mr-2" />
          Projeto
        </Button>
      </div>

      <div className="relative flex flex-col w-full h-full overflow-hidden py-2">
        {/* Loading State */}
        {loading && (
          <div className="flex justify-center items-center mt-14">
            <Loader2 className="h-8 w-8 animate-spin text-primary mr-3" />
            <p className="text-gray-50">Carregando projetos...</p>
          </div>
        )}

        {/* Error State */}
        {error && (
          <div className="admin-card p-6 border-destructive/50 bg-destructive/5">
            <p className="text-destructive font-medium">{error}</p>
          </div>
        )}

        {/* Projects grid */}
        {!loading && !error && (
          <>
            {projects.length === 0 ? (
              <div>
                <Card className="p-6">
                  <div className="text-center">
                    <FolderKanban className="h-12 w-12 text-gray-50 mx-auto mb-3" />
                    <h1 className="text-gray-50 text-2xl mb-3">
                      Nenhum Projeto Cadastrado!
                    </h1>
                    <p className="text-gray-300">
                      Comece criando seu primeiro projeto!
                    </p>
                  </div>
                </Card>
              </div>
            ) : (
              <div className="flex flex-col gap-6">
                {projects.map((project) => (
                  <Card key={project.id} className="p-4">
                    <div className="flex items-start justify-between">
                      <div className="flex items-center space-x-3">
                        <div className="relative h-20 w-20 bg-blue-50  flex items-center justify-center overflow-hidden">
                          {project.imageUrl ? (
                            <Image
                              src={project.imageUrl}
                              alt={project.title}
                              className="h-full w-full object-cover"
                              fill
                            />
                          ) : (
                            <FolderKanban className="h-6 w-6 text-gray-400" />
                          )}
                        </div>
                        <div>
                          <h3 className="text-lg font-semibold text-gray-50">
                            {project.title}
                          </h3>
                          <p className="text-sm text-gray-300">
                            {project.description}
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="mt-4 flex items-center justify-between">
                      <div className="text-sm text-gray-300">
                        <span className="font-medium">{project.link}</span>
                        <span>{project.isActive}</span>
                      </div>
                      <div className="flex space-x-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleOpenDialog(project)}
                        >
                          <FilePenLine className="h-4 w-4 mr-1 text-gray-50" />
                          <span className="text-gray-50">Editar</span>
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="text-destructive"
                          onClick={() => handleOpenDeleteDialog(project)}
                        >
                          <Trash2 className="h-4 w-4 mr-1" />
                          Excluir
                        </Button>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            )}
          </>
        )}

        {/* Dialog for Create/Edit */}
        <Dialog open={isDialogOpen} onOpenChange={handleCloseDialog}>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle className="admin-title text-xl">
                {selectedProject?.id ? "Editar Projeto" : "Novo Projeto"}
              </DialogTitle>
            </DialogHeader>
            <ProjectForm onSuccess={handleCloseDialog} />
          </DialogContent>
        </Dialog>

        {/* Dialog for Delete */}
        <Dialog
          open={isDeleteDialogOpen}
          onOpenChange={handleCloseDeleteDialog}
        >
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>Confirmar Exclusão</DialogTitle>
              <DialogDescription>
                Você tem certeza que deseja excluir o projeto
                <strong>{projectToDelete?.title}</strong>? Esta ação não pode
                ser desfeita.
              </DialogDescription>
            </DialogHeader>
            <DialogFooter className="mt-4">
              <DialogClose asChild>
                <Button variant="secondary">Cancelar</Button>
              </DialogClose>
              <Button
                variant="destructive"
                onClick={handleDeleteConfirm}
                className="px-7"
              >
                Excluir
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}
