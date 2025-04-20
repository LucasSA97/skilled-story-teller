
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft, FileText } from "lucide-react";

const Header = () => {
  const navigate = useNavigate();

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center">
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
        <div className="flex flex-1 items-center justify-between">
          <nav className="flex items-center space-x-4">
            <Link to="/" className="flex items-center space-x-2">
              <FileText className="h-6 w-6" />
              <span className="font-bold">CV Builder</span>
            </Link>
          </nav>
          <div className="flex items-center space-x-4">
            <Link to="/templates">
              <Button variant="outline" size="sm">
                Cambiar Plantilla
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
