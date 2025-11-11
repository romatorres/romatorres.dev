import { Button } from "@/components/ui/button";
import {
  Download,
  BarChart3,
  TrendingUp,
  Users,
  FileText,
  Plus,
} from "lucide-react";

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
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Relatórios</h1>
          <p className="text-gray-600">
            Visualize e baixe relatórios do sistema
          </p>
        </div>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          Projeto
        </Button>
      </div>

      {/* Reports grid */}
      <div className="flex gap-6">
        {reports.map((report) => (
          <div
            key={report.id}
            className="bg-white p-6 rounded-lg shadow-sm border border-gray-200"
          >
            <div className="flex items-start justify-between">
              <div className="flex items-center space-x-3">
                <div className="h-10 w-10 bg-blue-50 rounded-lg flex items-center justify-center">
                  <report.icon className="h-5 w-5 text-blue-600" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">
                    {report.name}
                  </h3>
                  <p className="text-sm text-gray-600">{report.description}</p>
                </div>
              </div>
            </div>
            <div className="mt-4 flex items-center justify-between">
              <div className="text-sm text-gray-500">
                <span className="font-medium">{report.type}</span> • Último:{" "}
                {report.lastGenerated}
              </div>
              <div className="flex space-x-2">
                <Button variant="ghost" size="sm">
                  Visualizar
                </Button>
                <Button variant="ghost" size="sm" className="text-destructive">
                  <Download className="h-4 w-4 mr-1" />
                  Baixar
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
