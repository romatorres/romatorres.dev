import { create } from "zustand";
import { devtools } from "zustand/middleware";

interface Project {
  id: string;
  titulo: string;
  data: Date;
  local: string;
  horario: string;
  detalhes?: string;
  ativo?: boolean;
}

interface ProjectState {
  project: Project[];
  selectedProjects: Partial<Project> | null;
  loading: boolean;
  error: string | null;
  fetchProjects: () => Promise<void>;
  createProject: (newProject: Omit<Project, "id">) => Promise<void>;
  updateProject: (id: string, updateProject: Partial<Project>) => Promise<void>;
  deleteProject: (id: string) => Promise<void>;
  setSelectedProject: (project: Partial<Project> | null) => void;
}

export const useProjectStore = create<ProjectState>()(
  devtools((set, get) => ({
    project: [],
    selectedProject: null,
    loading: false,
    error: null,
    fetchProjects: async () => {
      if (get().projects.length > 0) {
        return; // Evita a busca se os dados já estiverem carregados
      }
      set({ loading: true, error: null });
      try {
        const response = await fetch("/api/project");
        if (!response.ok) {
          throw new Error("Erro ao buscar um projeto.");
        }
        const data = await response.json();
        set({ project: data, loading: false });
      } catch (error: unknown) {
        if (error instanceof Error) {
          set({ error: error.message, loading: false });
        }
      }
    },

    createProject: async (newProject) => {
      set({ loading: true, error: null });
      try {
        const response = await fetch("/api/project", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newProject),
        });
        if (!response.ok) {
          throw new Error("Erro ao criar um projeto.");
        }
        const data = await response.json();
        set((state) => ({
          agendas: [...state.projects, data],
          loading: false,
        }));
      } catch (error: unknown) {
        if (error instanceof Error) {
          set({ error: error.message, loading: false });
        }
      }
    },
    updateProject: async (id, updatedProject) => {
      set({ loading: true, error: null });
      try {
        const response = await fetch(`/api/project/${id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updatedProject),
        });
        if (!response.ok) {
          throw new Error("Erro ao editar um projeto.");
        }
        const data = await response.json();
        set((state) => ({
          projects: state.projects.map((project) =>
            project.id === id ? data : project
          ),
          loading: false,
        }));
      } catch (error: unknown) {
        if (error instanceof Error) {
          set({ error: error.message, loading: false });
        }
      }
    },
    deleteProject: async (id) => {
      set({ loading: true, error: null });
      try {
        const response = await fetch(`/api/project/${id}`, {
          method: "DELETE",
        });
        if (!response.ok) {
          throw new Error("Erro ao excluir um projeto.");
        }
        set((state) => ({
          projects: state.projects.filter((project) => project.id !== id),
          loading: false,
        }));
      } catch (error: unknown) {
        if (error instanceof Error) {
          set({ error: error.message, loading: false });
        }
      }
    },
    setSelectedProject: (project) => {
      set({ selectedProject: project });
    },
  }))
);
