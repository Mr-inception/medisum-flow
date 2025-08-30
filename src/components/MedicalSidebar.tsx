import { useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";

const navigationItems = [
  { id: "home", label: "Home", icon: "fas fa-home", path: "/" },
  { id: "dashboard", label: "Dashboard", icon: "fas fa-chart-line", path: "/dashboard" },
  { id: "summarize", label: "Summarize", icon: "fas fa-brain", path: "/summarize" },
  { id: "dataset", label: "Dataset", icon: "fas fa-database", path: "/dataset" },
  { id: "analytics", label: "Analytics", icon: "fas fa-chart-bar", path: "/analytics" }
];

interface MedicalSidebarProps {
  isCollapsed: boolean;
  setIsCollapsed: (collapsed: boolean) => void;
}

export default function MedicalSidebar({ isCollapsed, setIsCollapsed }: MedicalSidebarProps) {
  const location = useLocation();

  return (
    <div className={cn(
      "bg-card border-r border-border transition-all duration-300 h-screen flex flex-col card-shadow",
      isCollapsed ? "w-16" : "w-64"
    )}>
      {/* Header */}
      <div className="p-4 border-b border-border flex items-center justify-between">
        {!isCollapsed && (
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 medical-gradient rounded-lg flex items-center justify-center">
              <i className="fas fa-stethoscope text-white text-sm"></i>
            </div>
            <div>
              <h1 className="font-semibold text-foreground text-lg">MedSumm AI</h1>
              <p className="text-xs text-muted-foreground">Medical Challenge</p>
            </div>
          </div>
        )}
        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="p-2 hover:bg-muted rounded-lg transition-colors"
        >
          <i className={cn(
            "fas text-muted-foreground transition-transform",
            isCollapsed ? "fa-chevron-right" : "fa-chevron-left"
          )}></i>
        </button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-2 space-y-1">
        {navigationItems.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <NavLink
              key={item.id}
              to={item.path}
              className={cn(
                "flex items-center space-x-3 px-3 py-3 rounded-lg transition-all duration-200 group relative",
                isActive 
                  ? "bg-primary text-primary-foreground medical-shadow" 
                  : "hover:bg-muted text-muted-foreground hover:text-foreground",
                isCollapsed && "justify-center"
              )}
            >
              <i className={cn(item.icon, "text-base flex-shrink-0")}></i>
              {!isCollapsed && (
                <span className="font-medium text-sm">{item.label}</span>
              )}
              
              {/* Tooltip for collapsed state */}
              {isCollapsed && (
                <div className="absolute left-full ml-2 px-2 py-1 bg-card border border-border rounded-md text-sm text-foreground opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-50 card-shadow">
                  {item.label}
                </div>
              )}
            </NavLink>
          );
        })}
      </nav>

      {/* Footer */}
      <div className="p-4 border-t border-border">
        {!isCollapsed ? (
          <div className="text-xs text-muted-foreground">
            <p className="font-medium mb-1">Status: Online</p>
            <p>AI Models: Ready</p>
          </div>
        ) : (
          <div className="flex justify-center">
            <div className="w-2 h-2 bg-success rounded-full"></div>
          </div>
        )}
      </div>
    </div>
  );
}