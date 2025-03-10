import {
  Home,
  Calendar,
  Users,
  Settings,
  BarChart,
  Award
} from 'lucide-react';

const menuItems = [
  { icon: Home, label: '대시보드', href: '/' },
  { icon: Calendar, label: '예약 관리', href: '/reservations' },
  { icon: Users, label: '회원 관리', href: '/members' },
  { icon: BarChart, label: '객실 현황', href: '/capacity' },
  { icon: Award, label: '추첨 관리', href: '/raffle' },
  { icon: Settings, label: '설정', href: '/settings' },
]; 