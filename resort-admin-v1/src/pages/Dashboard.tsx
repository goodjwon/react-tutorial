// src/pages/Dashboard.jsx
import React, { useState, useEffect } from 'react';
import { 
  CalendarDays, 
  CheckCircle, 
  XCircle,
  Clock,
  Users
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  Tabs, 
  TabsContent, 
  TabsList, 
  TabsTrigger 
} from '@/components/ui/tabs';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  BarChart,
  Bar
} from 'recharts';

// 가상 데이터 (실제로는 API에서 가져올 것)
const getReservationStats = () => ({
  total: 248,
  confirmed: 176,
  pending: 52,
  cancelled: 20
});

const getRecentReservations = () => [
  { id: "RES12761", name: "김철수", resort: "RESORT1", checkIn: "2024-08-01", status: "CONFIRMED" },
  { id: "RES12760", name: "이영희", resort: "RESORT2", checkIn: "2024-08-02", status: "CONFIRMED" },
  { id: "RES12759", name: "박지성", resort: "RESORT3", checkIn: "2024-08-01", status: "PENDING" },
  { id: "RES12758", name: "최민수", resort: "RESORT1", checkIn: "2024-08-03", status: "CONFIRMED" },
  { id: "RES12757", name: "정다운", resort: "RESORT2", checkIn: "2024-08-05", status: "CANCELLED" }
];

const getMonthlyData = () => [
  { name: '1월', RESORT1: 40, RESORT2: 24, RESORT3: 36 },
  { name: '2월', RESORT1: 30, RESORT2: 28, RESORT3: 42 },
  { name: '3월', RESORT1: 25, RESORT2: 30, RESORT3: 38 },
  { name: '4월', RESORT1: 35, RESORT2: 38, RESORT3: 45 },
  { name: '5월', RESORT1: 45, RESORT2: 40, RESORT3: 50 },
  { name: '6월', RESORT1: 52, RESORT2: 48, RESORT3: 56 }
];

const getResortOccupancy = () => [
  { name: 'RESORT1', 표준: 75, 디럭스: 68, 스위트: 85 },
  { name: 'RESORT2', 표준: 80, 디럭스: 72, 스위트: 90 },
  { name: 'RESORT3', 표준: 65, 디럭스: 70, 스위트: 82 }
];

const Dashboard = () => {
  const [stats, setStats] = useState(null);
  const [recentReservations, setRecentReservations] = useState([]);
  const [monthlyData, setMonthlyData] = useState([]);
  const [occupancyData, setOccupancyData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // 실제 구현에서는 API 호출이 이루어질 것입니다
    setStats(getReservationStats());
    setRecentReservations(getRecentReservations());
    setMonthlyData(getMonthlyData());
    setOccupancyData(getResortOccupancy());
    setLoading(false);
  }, []);

  const statusColor = (status) => {
    switch (status) {
      case 'CONFIRMED': return 'text-green-600';
      case 'PENDING': return 'text-amber-600';
      case 'CANCELLED': return 'text-red-600';
      default: return 'text-gray-600';
    }
  };

  const statusIcon = (status) => {
    switch (status) {
      case 'CONFIRMED': return <CheckCircle className="h-5 w-5 text-green-600" />;
      case 'PENDING': return <Clock className="h-5 w-5 text-amber-600" />;
      case 'CANCELLED': return <XCircle className="h-5 w-5 text-red-600" />;
      default: return null;
    }
  };

  if (loading) {
    return <div className="flex justify-center items-center h-full">로딩 중...</div>;
  }

  return (
    <div className="space-y-6">
      {/* 통계 카드 */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">총 예약</CardTitle>
            <CalendarDays className="h-4 w-4 text-gray-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.total}</div>
            <p className="text-xs text-gray-500">지난달 대비 +12%</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">확정 예약</CardTitle>
            <CheckCircle className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.confirmed}</div>
            <p className="text-xs text-gray-500">확정률 {Math.round((stats.confirmed / stats.total) * 100)}%</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">대기 예약</CardTitle>
            <Clock className="h-4 w-4 text-amber-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.pending}</div>
            <p className="text-xs text-gray-500">처리 필요</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">취소 예약</CardTitle>
            <XCircle className="h-4 w-4 text-red-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.cancelled}</div>
            <p className="text-xs text-gray-500">취소율 {Math.round((stats.cancelled / stats.total) * 100)}%</p>
          </CardContent>
        </Card>
      </div>

      {/* 차트 및 테이블 */}
      <div className="grid gap-4 md:grid-cols-2">
        <Card className="col-span-1">
          <CardHeader>
            <CardTitle>최근 예약</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentReservations.map(reservation => (
                <div key={reservation.id} className="flex items-center justify-between space-x-4 rounded-md border p-4">
                  <div className="space-y-1">
                    <div className="flex items-center">
                      <Users className="h-4 w-4 mr-2 text-gray-500" />
                      <p className="text-sm font-medium">{reservation.name}</p>
                    </div>
                    <p className="text-xs text-gray-500">{reservation.resort} | 체크인: {reservation.checkIn}</p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className={`text-xs ${statusColor(reservation.status)}`}>
                      {reservation.status === 'CONFIRMED' ? '확정' : 
                       reservation.status === 'PENDING' ? '대기중' : '취소'}
                    </span>
                    {statusIcon(reservation.status)}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="col-span-1">
          <Tabs defaultValue="monthly">
            <CardHeader className="pb-0">
              <div className="flex items-center justify-between">
                <CardTitle>예약 통계</CardTitle>
                <TabsList>
                  <TabsTrigger value="monthly">월별</TabsTrigger>
                  <TabsTrigger value="occupancy">객실 점유율</TabsTrigger>
                </TabsList>
              </div>
            </CardHeader>
            <CardContent>
              <TabsContent value="monthly" className="mt-0 space-y-4">
                <div className="h-72">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart
                      data={monthlyData}
                      margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Line type="monotone" dataKey="RESORT1" stroke="#8884d8" />
                      <Line type="monotone" dataKey="RESORT2" stroke="#82ca9d" />
                      <Line type="monotone" dataKey="RESORT3" stroke="#ffc658" />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </TabsContent>
              <TabsContent value="occupancy" className="mt-0 space-y-4">
                <div className="h-72">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={occupancyData}
                      margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Bar dataKey="표준" fill="#8884d8" />
                      <Bar dataKey="디럭스" fill="#82ca9d" />
                      <Bar dataKey="스위트" fill="#ffc658" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </TabsContent>
            </CardContent>
          </Tabs>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;