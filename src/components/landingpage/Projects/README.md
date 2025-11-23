# Componentes de Projetos

Esta seção contém todos os componentes relacionados à exibição de projetos na landing page.

## Estrutura

```
Projects/
├── Projects.tsx              # Componente principal
├── hooks/
│   └── useProjects.ts        # Hook personalizado para gerenciar projetos
├── _components/
│   ├── ProjectCard.tsx       # Card individual do projeto
│   ├── ProjectGrid.tsx       # Grid de projetos
│   ├── ProjectSkeleton.tsx   # Loading skeleton
│   └── ProjectsHeader.tsx    # Cabeçalho da seção
└── index.ts                  # Exportações centralizadas
```

## Componentes

### Projects.tsx
Componente principal que orquestra toda a seção de projetos.

### ProjectCard.tsx
- Exibe um projeto individual
- Suporta diferentes tamanhos (small, medium, large)
- Inclui modal para visualização ampliada
- Link opcional para o projeto

### ProjectGrid.tsx
- Grid responsivo para exibir múltiplos projetos
- Gerencia estados de loading
- Filtra projetos ativos

### ProjectSkeleton.tsx
- Componente de loading
- Suporta diferentes tamanhos

### ProjectsHeader.tsx
- Cabeçalho da seção com título e decoração

## Hook

### useProjects.ts
- Gerencia o estado dos projetos
- Controla loading inicial
- Integra com o store Zustand

## Uso

```tsx
import { Projects } from '@/components/landingpage/Projects';

// No componente pai
<Projects />
```

## Tipos

Os componentes utilizam os tipos definidos em `@/types/projects.ts` que são sincronizados com o schema do Prisma.