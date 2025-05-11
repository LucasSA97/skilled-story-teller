
import { Link, useNavigate, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft, FileText, LogIn, LogOut } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { useLanguage } from "@/context/LanguageContext";
import { LanguageSwitcher } from "./LanguageSwitcher";

const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, signOut } = useAuth();
  const { t } = useLanguage();
  const isHomePage = location.pathname === "/";
  const isTemplatesPage = location.pathname === "/templates";
  const isAuthPage = location.pathname === "/auth";
  const isMyCVsPage = location.pathname === "/my-cvs";

  const handleLogout = async () => {
    await signOut();
  };

  return (
    <header className="fixed top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 transition-colors duration-300">
      <div className="container flex h-14 items-center">
        {!isHomePage && (
          <div className="mr-4 flex">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => navigate(-1)}
              className="mr-2"
            >
              <ArrowLeft className="h-5 w-5" />
            </Button>
          </div>
        )}
        <div className="flex flex-1 items-center justify-between">
          <nav className="flex items-center space-x-4">
            <Link to="/" className="flex items-center space-x-2">
              <FileText className="h-6 w-6" />
              <span className="font-bold">{t('cvBuilder')}</span>
            </Link>
          </nav>
          <div className="flex items-center space-x-4">
            <LanguageSwitcher />
            {user ? (
              <>
                <Link to="/my-cvs">
                  <Button variant="outline" size="sm">
                    {t('myCVs')}
                  </Button>
                </Link>
                {!isTemplatesPage && !isMyCVsPage && (
                  <Link to="/templates">
                    <Button variant="outline" size="sm">
                      {t('changeTemplate')}
                    </Button>
                  </Link>
                )}
                {!isMyCVsPage && (
                  <Link to="/form">
                    <Button variant="outline" size="sm">
                      {t('editCV')}
                    </Button>
                  </Link>
                )}
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={handleLogout}
                  className="flex items-center gap-2"
                >
                  <LogOut className="h-4 w-4" /> {t('signOut')}
                </Button>
              </>
            ) : (
              !isAuthPage && (
                <Link to="/auth">
                  <Button 
                    variant="default" 
                    size="sm"
                    className="flex items-center gap-2"
                  >
                    <LogIn className="h-4 w-4" /> {t('signIn')}
                  </Button>
                </Link>
              )
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
