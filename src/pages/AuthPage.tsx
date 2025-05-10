
import { useState } from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { FileText } from "lucide-react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const AuthPage = () => {
  const { user, loading, signIn, signUp } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Redirect if user is already logged in
  if (!loading && user) {
    return <Navigate to="/my-cvs" />;
  }

  const handleAuth = async (action: "login" | "signup") => {
    if (!email || !password) return;
    
    setIsSubmitting(true);
    try {
      if (action === "login") {
        await signIn(email, password);
      } else {
        await signUp(email, password);
      }
    } catch (error) {
      console.error("Authentication error:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin h-8 w-8 border-4 border-primary border-t-transparent rounded-full"></div>
      </div>
    );
  }

  return (
    <div className="container flex min-h-screen">
      <div className="flex flex-1 flex-col items-center justify-center py-12">
        <div className="mx-auto grid w-full max-w-md gap-6">
          <div className="flex flex-col space-y-2 text-center">
            <div className="flex justify-center mb-4">
              <FileText className="h-16 w-16 text-primary" />
            </div>
            <h1 className="text-3xl font-bold">CV Builder</h1>
            <p className="text-balance text-muted-foreground">
              Crea tu currículum profesional en minutos
            </p>
          </div>
          
          <Card className="border-2 shadow-lg bg-card">
            <Tabs defaultValue="login" className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="login" className="text-base py-3">Iniciar Sesión</TabsTrigger>
                <TabsTrigger value="signup" className="text-base py-3">Registrarse</TabsTrigger>
              </TabsList>
              
              <TabsContent value="login">
                <CardHeader>
                  <CardTitle className="text-2xl text-center">Bienvenido de nuevo</CardTitle>
                  <CardDescription className="text-center">
                    Ingresa tus credenciales para acceder a tu cuenta
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="login-email">Email</Label>
                    <Input 
                      id="login-email" 
                      type="email" 
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="ejemplo@email.com" 
                      disabled={isSubmitting}
                      className="h-12"
                    />
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="login-password">Contraseña</Label>
                    </div>
                    <Input 
                      id="login-password" 
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="••••••••" 
                      disabled={isSubmitting}
                      className="h-12"
                    />
                  </div>
                </CardContent>
                <CardFooter>
                  <Button 
                    className="w-full h-12 text-base"
                    onClick={() => handleAuth("login")}
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? "Iniciando sesión..." : "Iniciar Sesión"}
                  </Button>
                </CardFooter>
              </TabsContent>
              
              <TabsContent value="signup">
                <CardHeader>
                  <CardTitle className="text-2xl text-center">Crear una cuenta</CardTitle>
                  <CardDescription className="text-center">
                    Regístrate para comenzar a crear tus currículums
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="signup-email">Email</Label>
                    <Input 
                      id="signup-email" 
                      type="email" 
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="ejemplo@email.com" 
                      disabled={isSubmitting}
                      className="h-12"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="signup-password">Contraseña</Label>
                    <Input 
                      id="signup-password" 
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="••••••••" 
                      disabled={isSubmitting}
                      className="h-12"
                    />
                  </div>
                </CardContent>
                <CardFooter>
                  <Button 
                    className="w-full h-12 text-base"
                    onClick={() => handleAuth("signup")}
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? "Registrando..." : "Registrarse"}
                  </Button>
                </CardFooter>
              </TabsContent>
            </Tabs>
          </Card>
          
          <p className="px-8 text-center text-sm text-muted-foreground">
            Al continuar, aceptas nuestros términos de servicio y política de privacidad.
          </p>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;
