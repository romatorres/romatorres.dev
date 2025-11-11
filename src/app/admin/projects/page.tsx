"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  BarChart3,
  TrendingUp,
  Users,
  FileText,
  Plus,
  Trash2,
  FilePenLine,
  Loader2,
} from "lucide-react";
import { useProjectStore } from "@/stores/projectsStores";
import { Card } from "@/components/ui/card";

const reports = [
  {
    id: 1,
    name: "Relatório de Usuários",
    description: "Estatísticas detalhadas sobre usuários ativos",
    type: "Mensal",
    lastGenerated: "2024-01-15",
    icon: Users,
  },
  {
    id: 2,
    name: "Relatório de Atividades",
    description: "Resumo das atividades do sistema",
    type: "Semanal",
    lastGenerated: "2024-01-14",
    icon: BarChart3,
  },
  {
    id: 3,
    name: "Relatório de Crescimento",
    description: "Análise de crescimento e tendências",
    type: "Trimestral",
    lastGenerated: "2024-01-01",
    icon: TrendingUp,
  },
  {
    id: 4,
    name: "Relatório de Documentos",
    description: "Estatísticas sobre documentos e uploads",
    type: "Mensal",
    lastGenerated: "2024-01-15",
    icon: FileText,
  },
];

export default function ProjectsPage() {
  const {
    project,
    selectedProjects,
    deleteProject,
    error,
    loading,
    setSelectedProject,
    fetchProjects,
  } = useProjectStore();

  useEffect(() => {
    fetchProjects();
  }, [fetchProjects]);

  return (
    <div className="space-y-6 mt-16">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-50">Projetos</h1>
          <p className="text-gray-300">Gerencie seus projetos!</p>
        </div>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          Projeto
        </Button>
      </div>

      {/* Loading State */}
      {loading && (
        <div className="">
          <Loader2 className="h-8 w-8 animate-spin text-primary mr-3" />
          <p>Carregando projetos...</p>
        </div>
      )}

      {/* Projects grid */}
      <div className="flex flex-col gap-6">
        {reports.map((report) => (
          <Card key={report.id} className="p-4">
            <div className="flex items-start justify-between">
              <div className="flex items-center space-x-3">
                <div className="h-10 w-10 bg-blue-50 rounded-lg flex items-center justify-center">
                  <report.icon className="h-5 w-5 text-blue-600" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-50">
                    {report.name}
                  </h3>
                  <p className="text-sm text-gray-300">{report.description}</p>
                </div>
              </div>
            </div>
            <div className="mt-4 flex items-center justify-between">
              <div className="text-sm text-gray-300">
                <span className="font-medium">{report.type}</span> • Último:{" "}
                {report.lastGenerated}
              </div>
              <div className="flex space-x-2">
                <Button variant="ghost" size="sm">
                  <FilePenLine className="h-4 w-4 mr-1 text-gray-50" />
                  <span className="text-gray-50">Editar</span>
                </Button>
                <Button variant="ghost" size="sm" className="text-destructive">
                  <Trash2 className="h-4 w-4 mr-1" />
                  Excluir
                </Button>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
