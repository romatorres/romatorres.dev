"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Card } from "@/components/ui/card";
import { Edit, Loader2, Mail, Plus, Trash2, User } from "lucide-react";
import { useState, useEffect } from "react";
import { UserForm } from "@/app/admin/users/_components/user-form";
import { toast } from "sonner";
import { useUserStore } from "@/stores/usersStore";
import { ProtectedRoute } from "@/components/auth/ProtectedRoute";
import { useAuth } from "@/hooks/useAuth";

export interface UserType {
  id: string;
  name: string;
  email: string;
  role: string;
}

export default function UsersPage() {
  const { isAdmin, isLoading: isAuthLoading } = useAuth();
  const {
    users,
    loading: isLoading,
    error,
    fetchUsers,
    deleteUser,
    setSelectedUser: setStoreSelectedUser,
    refreshUsers,
  } = useUserStore();

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<UserType | null>(null);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    if (!isAuthLoading && isAdmin) {
      fetchUsers();
    }
  }, [fetchUsers, isAdmin, isAuthLoading]);

  useEffect(() => {
    if (error) {
      toast.error(error);
    }
  }, [error]);

  const handleOpenDialog = (user: UserType | null = null) => {
    setSelectedUser(user);
    setStoreSelectedUser(user);
    setIsDialogOpen(true);
  };

  const handleSuccess = (data?: { operation: "create" | "update" }) => {
    setIsDialogOpen(false);
    setSelectedUser(null);
    setStoreSelectedUser(null);
    if (data?.operation) {
      refreshUsers();
    }
  };

  const handleDelete = async (id: string) => {
    setIsDeleting(true);
    try {
      await deleteUser(id);
      toast.success("Usuário excluído com sucesso!");
      setDeleteId(null);
    } catch {
      toast.error("Ocorreu um erro ao excluir o usuário.");
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <ProtectedRoute
      requireAdmin
      fallback={
        <div className="p-8 text-center">
          <h2 className="text-xl font-semibold mb-2">Acesso Restrito</h2>
          <p className="text-muted-foreground">
            Apenas administradores podem acessar esta página.
          </p>
        </div>
      }
    >
      <div className="space-y-6 mt-16">
        {/* Header */}
        <div>
          <div className="flex md:flex-row flex-col justify-between md:items-center items-start">
            <div>
              <h1 className="text-3xl font-bold mb-2 text-gray-50">Usuários</h1>
              <p className="text-lg mb-4 text-gray-300">
                Gerencie os usuários do sistema
              </p>
            </div>
            <Button
              className="sm:w-auto w-full"
              onClick={() => handleOpenDialog()}
            >
              <Plus className="h-4 w-4 mr-2" />
              Novo Usuário
            </Button>
          </div>
        </div>

        <div className="relative flex flex-col w-full h-full overflow-hidden py-2">
          {isLoading ? (
            <div className="flex items-center justify-center">
              <Loader2 className="h-8 w-8 animate-spin text-primary mr-3" />
              <span className="text-gray-300">Carregando usuários...</span>
            </div>
          ) : (
            <div className="w-full text-left flex flex-col">
              {users.map((user) => (
                <Card key={user.id} className="p-4">
                  <div className="flex flex-col gap-2">
                    <p className="flex gap-2 justify-start">
                      <User className="text-gray-50" />
                      <span className="text-xl text-gray-50">{user.name}</span>
                    </p>
                    <p className="flex gap-2 items-center antialiased leading-normal">
                      <Mail className="w-4 h-4 text-gray-300" />
                      <span className="text-sm text-gray-300">
                        {user.email}
                      </span>
                    </p>
                    <div className="flex gap-2 items-center mt-2">
                      <span
                        className={`px-2 py-1 text-xs rounded ${
                          user.role === "ADMIN"
                            ? "bg-green-100 text-green-800"
                            : "bg-blue-100 text-blue-800"
                        }`}
                      >
                        {user.role}
                      </span>
                    </div>
                  </div>

                  <div className="flex gap-4 justify-end">
                    <Button
                      variant="ghost"
                      className="text-gray-50"
                      onClick={() => handleOpenDialog(user)}
                    >
                      <Edit className="h-4 w-4 mr-1" />
                      Editar
                    </Button>
                    <Button
                      variant="ghost"
                      className="text-destructive"
                      onClick={() => setDeleteId(user.id)}
                    >
                      <Trash2 className="h-4 w-4 mr-1" />
                      Excluir
                    </Button>
                  </div>
                </Card>
              ))}
            </div>
          )}
        </div>
        {/* Dialog for Create/Edit */}
        <Dialog
          open={isDialogOpen}
          onOpenChange={(open) => {
            if (!open) {
              setSelectedUser(null);
            }
            setIsDialogOpen(open);
          }}
        >
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle className="text-xl">
                {selectedUser ? "Editar Usuário" : "Novo Usuário"}
              </DialogTitle>
            </DialogHeader>
            <UserForm
              key={selectedUser ? selectedUser.id : "new"}
              user={selectedUser}
              onSuccess={handleSuccess}
            />
          </DialogContent>
        </Dialog>

        {/* Dialog for Delete Confirmation */}
        <Dialog open={!!deleteId} onOpenChange={() => setDeleteId(null)}>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle className="text-xl">Confirmar Exclusão</DialogTitle>
            </DialogHeader>
            <div className="py-4">
              <p>
                Tem certeza que deseja excluir este usuário? Esta ação não pode
                ser desfeita.
              </p>
            </div>
            <div className="flex justify-end gap-3">
              <Button
                variant="secondary"
                onClick={() => setDeleteId(null)}
                disabled={isDeleting}
              >
                Cancelar
              </Button>
              <Button
                className="bg-destructive hover:bg-destructive/90 text-destructive-foreground"
                onClick={() => deleteId && handleDelete(deleteId)}
                disabled={isDeleting}
              >
                {isDeleting ? (
                  <>
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    Excluindo...
                  </>
                ) : (
                  <>
                    <Trash2 className="h-4 w-4 mr-2" />
                    Excluir
                  </>
                )}
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </ProtectedRoute>
  );
}
