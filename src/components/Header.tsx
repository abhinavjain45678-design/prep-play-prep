import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Shield, Globe, Menu, X, Sun, Moon, Monitor } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";
import { useTranslation } from "@/lib/translations";
import { useTheme } from "@/hooks/useTheme";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface HeaderProps {
  onLanguageChange?: (lang: string) => void;
  currentLanguage?: string;
}

export function Header({ onLanguageChange, currentLanguage = "en" }: HeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { t } = useTranslation(currentLanguage);
  const { theme, setTheme } = useTheme();

  const navigation = [
    { name: t("nav.home"), path: "/" },
    { name: t("nav.simulations"), path: "/simulations" },
    { name: t("nav.quizzes"), path: "/quiz" },
    { name: t("nav.emergency"), path: "/emergency" },
    { name: t("nav.caseStudies"), path: "/disaster-case-studies" },
    { name: t("nav.achievements"), path: "/achievements" },
    { name: t("nav.emergencyId"), path: "/emergency-id" },
    { name: t("nav.admin"), path: "/admin" },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <header className="bg-card shadow-soft border-b border-border sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <div className="p-2 gradient-primary rounded-lg">
              <Shield className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-primary">{t("header.appName")}</h1>
              <p className="text-xs text-muted-foreground">{t("header.tagline")}</p>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-1">
            {navigation.map((item) => (
              <Button
                key={item.path}
                variant={isActive(item.path) ? "default" : "ghost"}
                size="sm"
                onClick={() => navigate(item.path)}
                className="text-sm"
              >
                {item.name}
              </Button>
            ))}
          </nav>

          {/* Language Toggle, Theme Toggle & Mobile Menu */}
          <div className="flex items-center gap-2">
            {/* Theme Toggle */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="icon">
                  <Sun className="h-4 w-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                  <Moon className="absolute h-4 w-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                  <span className="sr-only">{t("common.theme")}</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => setTheme("light")}>
                  <Sun className="mr-2 h-4 w-4" />
                  {t("common.lightMode")}
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setTheme("dark")}>
                  <Moon className="mr-2 h-4 w-4" />
                  {t("common.darkMode")}
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setTheme("system")}>
                  <Monitor className="mr-2 h-4 w-4" />
                  System
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Language Toggle */}
            <Button
              variant="outline"
              size="sm"
              onClick={() => onLanguageChange?.(currentLanguage === "en" ? "hi" : "en")}
              className="gap-2"
            >
              <Globe className="w-4 h-4" />
              {currentLanguage === "en" ? t("header.switchToHindi") : t("header.switchToEnglish")}
            </Button>
            
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden"
            >
              {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <nav className="md:hidden mt-4 pb-4 border-t border-border pt-4">
            <div className="flex flex-col gap-2">
              {navigation.map((item) => (
                <Button
                  key={item.path}
                  variant={isActive(item.path) ? "default" : "ghost"}
                  onClick={() => {
                    navigate(item.path);
                    setIsMenuOpen(false);
                  }}
                  className="justify-start"
                >
                  {item.name}
                </Button>
              ))}
            </div>
          </nav>
        )}
      </div>
    </header>
  );
}