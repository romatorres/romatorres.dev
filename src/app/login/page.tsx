import Link from "next/link";
import { LoginForm } from "./_components/login-form";
import { Card } from "@/components/ui/card";

export default function Login() {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="flex w-full flex-col items-center justify-center p-6">
        <Card className="px-8 w-full sm:max-w-lg max-w-md mx-4">
          <div className="w-full max-w-md space-y-8">
            <div className="text-center">
              <h1 className="text-3xl font-bold text-white">Login</h1>
              <p className="mt-4 text-gray-300">
                Entre com suas credenciais para acessar sua conta
              </p>
            </div>

            <LoginForm />

            <div className="text-center text-sm text-gray-300">
              <p>
                Não tem uma conta?{" "}
                <Link
                  href="/signup"
                  className="font-medium text-primary hover:underline"
                >
                  Cadastre-se
                </Link>
              </p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
