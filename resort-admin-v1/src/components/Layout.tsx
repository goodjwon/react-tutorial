// src/components/Layout.jsx
import React, { useState } from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  CalendarDays, 
  Hotel, 
  Ticket, 
  Settings as SettingsIcon,
  Menu,
  X,
  User,
  BarChart
} from 'lucide-react';
import { 
  Sheet, 
  SheetContent, 
  SheetTrigger 
} from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import type { FC } from 'react';

const Layout: FC = () => {
  const location = useLocation();
  const [open, setOpen] = useState(false);

  const routes = [
    {
      name: "대시보드",
      path: "/",
      icon: <LayoutDashboard className="h-5 w-5" />
    },
    {
      name: "예약 관리",
      path: "/reservations",
      icon: <CalendarDays className="h-5 w-5" />
    },
    {
      name: "객실 현황",
      path: "/capacity",
      icon: <Hotel className="h-5 w-5" />
    },
    {
      name: "추첨 관리",
      path: "/raffle",
      icon: <Ticket className="h-5 w-5" />
    },
    {
      name: "사용 통계",
      path: "/statistics",
      icon: <BarChart className="h-5 w-5" />
    },
    {
      name: "설정",
      path: "/settings",
      icon: <SettingsIcon className="h-5 w-5" />
    }
  ];

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Desktop Sidebar */}
      <div className="hidden md:flex md:w-64 md:flex-col">
        <div className="flex flex-col flex-grow bg-white overflow-y-auto border-r">
          <div className="flex items-center justify-center h-14 border-b">
            <h1 className="text-xl font-bold">리조트 관리 시스템</h1>
          </div>
          <div className="flex flex-col flex-grow">
            <nav className="flex-1 px-2 py-4 space-y-1">
              {routes.map((route) => (
                <Link
                  key={route.path}
                  to={route.path}
                  className={`flex items-center px-4 py-2 text-sm font-medium rounded-md ${
                    location.pathname === route.path
                      ? "bg-gray-200 text-gray-900"
                      : "text-gray-600 hover:bg-gray-100"
                  }`}
                >
                  {route.icon}
                  <span className="ml-3">{route.name}</span>
                </Link>
              ))}
            </nav>
          </div>
          <div className="p-4 border-t">
            <div className="flex items-center">
              <Avatar>
                <AvatarImage src="/avatar.png" />
                <AvatarFallback>관리자</AvatarFallback>
              </Avatar>
              <div className="ml-3">
                <p className="text-sm font-medium">관리자</p>
                <p className="text-xs text-gray-500">admin@resort.com</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Sidebar */}
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetContent side="left" className="p-0">
          <div className="flex flex-col h-full">
            <div className="flex items-center justify-between h-14 px-4 border-b">
              <h1 className="text-xl font-bold">리조트 관리 시스템</h1>
              <Button variant="ghost" size="icon" onClick={() => setOpen(false)}>
                <X className="h-5 w-5" />
              </Button>
            </div>
            <nav className="flex-1 px-2 py-4 space-y-1">
              {routes.map((route) => (
                <Link
                  key={route.path}
                  to={route.path}
                  onClick={() => setOpen(false)}
                  className={`flex items-center px-4 py-2 text-sm font-medium rounded-md ${
                    location.pathname === route.path
                      ? "bg-gray-200 text-gray-900"
                      : "text-gray-600 hover:bg-gray-100"
                  }`}
                >
                  {route.icon}
                  <span className="ml-3">{route.name}</span>
                </Link>
              ))}
            </nav>
            <div className="p-4 border-t">
              <div className="flex items-center">
                <Avatar>
                  <AvatarImage src="/avatar.png" />
                  <AvatarFallback>관리자</AvatarFallback>
                </Avatar>
                <div className="ml-3">
                  <p className="text-sm font-medium">관리자</p>
                  <p className="text-xs text-gray-500">admin@resort.com</p>
                </div>
              </div>
            </div>
          </div>
        </SheetContent>
      </Sheet>

      {/* Content */}
      <div className="flex flex-col flex-1 overflow-hidden">
        <header className="flex items-center justify-between p-4 bg-white border-b md:py-6 md:px-8">
          <div className="flex items-center">
            <Button 
              variant="outline" 
              size="icon" 
              className="md:hidden"
              onClick={() => setOpen(true)}
            >
              <Menu className="h-5 w-5" />
            </Button>
            <h1 className="ml-4 md:ml-0 text-xl font-semibold">
              {routes.find(route => route.path === location.pathname)?.name || "대시보드"}
            </h1>
          </div>
          <div className="flex items-center space-x-4">
            <Button variant="outline" size="sm">
              <User className="h-4 w-4 mr-2" />
              프로필
            </Button>
          </div>
        </header>
        <main className="flex-1 overflow-y-auto p-4 md:p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default Layout;