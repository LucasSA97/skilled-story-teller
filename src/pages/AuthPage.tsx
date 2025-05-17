
import { useState } from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { FileText, LogIn, UserPlus, Google } from "lucide-react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { useLanguage } from "@/context/LanguageContext";

const AuthPage = () => {
  const { user, loading, signIn, signUp, signInWithGoogle } = useAuth();
  const { t } = useLanguage();
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

  const handleGoogleSignIn = async () => {
    try {
      await signInWithGoogle();
    } catch (error) {
      console.error("Google sign in error:", error);
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
    <div className="container flex min-h-screen bg-gradient-to-b from-background to-background/95">
      <div className="flex flex-1 flex-col items-center justify-center py-12">
        <div className="mx-auto grid w-full max-w-md gap-6">
          <div className="flex flex-col space-y-2 text-center">
            <div className="flex justify-center mb-4">
              <FileText className="h-16 w-16 text-primary" />
            </div>
            <h1 className="text-3xl font-bold">{t('cvBuilder')}</h1>
            <p className="text-balance text-muted-foreground">
              {t('createProfessionalCV')}
            </p>
          </div>
          
          <Card className="border-2 shadow-lg bg-card">
            <Tabs defaultValue="login" className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="login" >{t('signIn')}</TabsTrigger>
                <TabsTrigger value="signup" >{t('signUp')}</TabsTrigger>
              </TabsList>
              
              <TabsContent value="login">
                <CardHeader>
                  <CardTitle className="text-2xl text-center">{t('welcomeBack')}</CardTitle>
                  <CardDescription className="text-center">
                    {t('enterCredentials')}
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
                      <Label htmlFor="login-password">{t('password')}</Label>
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
                  <Button 
                    className="w-full h-12 text-base"
                    onClick={() => handleAuth("login")}
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? t('signingIn') : (
                      <>
                        <LogIn className="mr-2 h-5 w-5" /> {t('signIn')}
                      </>
                    )}
                  </Button>
                  
                  <div className="relative my-4">
                    <div className="absolute inset-0 flex items-center">
                      <Separator className="w-full" />
                    </div>
                    <div className="relative flex justify-center">
                      <span className="bg-background px-2 text-xs text-muted-foreground">
                        {t('orContinueWith')}
                      </span>
                    </div>
                  </div>
                  
                  <Button
                    variant="outline"
                    className="w-full h-12"
                    onClick={handleGoogleSignIn}
                    disabled={isSubmitting}
                  >
                    <Google className="mr-2 h-5 w-5" />
                    {t('continueWithGoogle')}
                  </Button>
                </CardContent>
              </TabsContent>
              
              <TabsContent value="signup">
                <CardHeader>
                  <CardTitle className="text-2xl text-center">{t('createAccount')}</CardTitle>
                  <CardDescription className="text-center">
                    {t('registerToCreateCVs')}
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
                    <Label htmlFor="signup-password">{t('password')}</Label>
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
                  
                  <Button 
                    className="w-full h-12 text-base"
                    onClick={() => handleAuth("signup")}
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? t('registering') : (
                      <>
                        <UserPlus className="mr-2 h-5 w-5" /> {t('signUp')}
                      </>
                    )}
                  </Button>
                  
                  <div className="relative my-4">
                    <div className="absolute inset-0 flex items-center">
                      <Separator className="w-full" />
                    </div>
                    <div className="relative flex justify-center">
                      <span className="bg-background px-2 text-xs text-muted-foreground">
                        {t('orContinueWith')}
                      </span>
                    </div>
                  </div>
                  
                  <Button
                    variant="outline"
                    className="w-full h-12"
                    onClick={handleGoogleSignIn}
                    disabled={isSubmitting}
                  >
                    <Google className="mr-2 h-5 w-5" />
                    {t('continueWithGoogle')}
                  </Button>
                </CardContent>
              </TabsContent>
            </Tabs>
          </Card>
          
          <div className="flex flex-col gap-2 text-center">
            <p className="text-sm text-muted-foreground">
              {t('termsPrivacyNotice')}
            </p>
            <Button 
              variant="outline" 
              className="mx-auto"
              onClick={() => window.location.href = '/form'}
            >
              {t('continueWithoutAccount')}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;
