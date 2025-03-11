import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LineChart, Line } from 'recharts';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { BarChart2, Table as TableIcon, Calendar } from 'lucide-react';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Calendar as CalendarComponent } from '@/components/ui/calendar';
import { format, subDays, startOfWeek, endOfWeek, subWeeks, startOfMonth, endOfMonth, subMonths } from 'date-fns';
import { ko } from 'date-fns/locale';
import { cn } from '@/lib/utils';

// 리조트 타입 정의
interface Resort {
  code: string;
  name: string;
  location: string;
}

// 통계 데이터 타입 정의
interface StatisticsData {
  date: string;
  totalRooms: number;
  assignedRooms: number;
  usedRooms: number;
  remainingRooms: number;
  reservationRate: number;
  applicantsCount: number;
  cancelledCount: number;
  winnersCount: number;
  completedReservations: number;
  cancelledReservations: number;
  usageRate: number;
}

const Statistics = () => {
  const [viewType, setViewType] = useState<'daily' | 'weekly' | 'monthly'>('daily');
  const [selectedResort, setSelectedResort] = useState<string>('all');
  const [resorts, setResorts] = useState<Resort[]>([]);
  const [statisticsData, setStatisticsData] = useState<StatisticsData[]>([]);
  const [displayMode, setDisplayMode] = useState<'chart' | 'table'>('chart');
  
  // 날짜 선택 관련 상태
  const [date, setDate] = useState<Date>(new Date());
  const [calendarOpen, setCalendarOpen] = useState(false);
  
  // 로딩 상태 활용
  const [loading, setLoading] = useState<boolean>(true);

  // 날짜 범위 계산 함수
  const getDateRangeText = () => {
    if (viewType === 'daily') {
      return format(date, 'yyyy년 MM월 dd일', { locale: ko });
    } else if (viewType === 'weekly') {
      const weekStart = startOfWeek(date, { weekStartsOn: 1 });
      const weekEnd = endOfWeek(date, { weekStartsOn: 1 });
      return `${format(weekStart, 'yyyy년 MM월 dd일', { locale: ko })} ~ ${format(weekEnd, 'yyyy년 MM월 dd일', { locale: ko })}`;
    } else {
      return format(date, 'yyyy년 MM월', { locale: ko });
    }
  };

  // 날짜 변경 시 데이터 다시 가져오기
  useEffect(() => {
    fetchStatisticsData();
  }, [date, viewType, selectedResort]);

  // 리조트 목록 가져오기
  useEffect(() => {
    // 실제 API 연동 시 이 부분을 수정하세요
    const fetchResorts = () => {
      const mockResorts: Resort[] = [
        { code: 'resort_a', name: '리조트 A', location: '제주' },
        { code: 'resort_b', name: '리조트 B', location: '강원' },
        { code: 'resort_c', name: '리조트 C', location: '부산' },
      ];
      setResorts(mockResorts);
    };

    fetchResorts();
  }, []);

  // 통계 데이터 가져오기
  const fetchStatisticsData = () => {
    setLoading(true);
    // 실제 API 연동 시 이 부분을 수정하세요
    // 목업 데이터 생성
    const mockData: StatisticsData[] = [];
    
    if (viewType === 'daily') {
      // 선택한 날짜 기준 7일 데이터
      for (let i = 6; i >= 0; i--) {
        const currentDate = subDays(date, i);
        mockData.push({
          date: format(currentDate, 'yyyy-MM-dd'),
          totalRooms: 100,
          assignedRooms: Math.floor(Math.random() * 80) + 10,
          usedRooms: Math.floor(Math.random() * 70) + 10,
          remainingRooms: Math.floor(Math.random() * 30) + 5,
          reservationRate: Math.floor(Math.random() * 90) + 10,
          applicantsCount: Math.floor(Math.random() * 200) + 50,
          cancelledCount: Math.floor(Math.random() * 20) + 5,
          winnersCount: Math.floor(Math.random() * 50) + 20,
          completedReservations: Math.floor(Math.random() * 40) + 15,
          cancelledReservations: Math.floor(Math.random() * 10) + 2,
          usageRate: Math.floor(Math.random() * 90) + 10,
        });
      }
    } else if (viewType === 'weekly') {
      // 선택한 주 기준 4주 데이터
      for (let i = 3; i >= 0; i--) {
        const currentWeek = subWeeks(date, i);
        const weekStart = startOfWeek(currentWeek, { weekStartsOn: 1 });
        mockData.push({
          date: `${format(weekStart, 'MM/dd')} 주`,
          totalRooms: 700,
          assignedRooms: Math.floor(Math.random() * 600) + 100,
          usedRooms: Math.floor(Math.random() * 500) + 100,
          remainingRooms: Math.floor(Math.random() * 200) + 50,
          reservationRate: Math.floor(Math.random() * 90) + 10,
          applicantsCount: Math.floor(Math.random() * 1000) + 300,
          cancelledCount: Math.floor(Math.random() * 100) + 20,
          winnersCount: Math.floor(Math.random() * 300) + 100,
          completedReservations: Math.floor(Math.random() * 250) + 80,
          cancelledReservations: Math.floor(Math.random() * 50) + 10,
          usageRate: Math.floor(Math.random() * 90) + 10,
        });
      }
    } else {
      // 선택한 월 기준 6개월 데이터
      for (let i = 5; i >= 0; i--) {
        const currentMonth = subMonths(date, i);
        mockData.push({
          date: format(currentMonth, 'yyyy-MM'),
          totalRooms: 3000,
          assignedRooms: Math.floor(Math.random() * 2500) + 500,
          usedRooms: Math.floor(Math.random() * 2000) + 500,
          remainingRooms: Math.floor(Math.random() * 1000) + 200,
          reservationRate: Math.floor(Math.random() * 90) + 10,
          applicantsCount: Math.floor(Math.random() * 5000) + 1000,
          cancelledCount: Math.floor(Math.random() * 500) + 100,
          winnersCount: Math.floor(Math.random() * 1500) + 500,
          completedReservations: Math.floor(Math.random() * 1200) + 400,
          cancelledReservations: Math.floor(Math.random() * 300) + 50,
          usageRate: Math.floor(Math.random() * 90) + 10,
        });
      }
    }
    
    setStatisticsData(mockData);
    setLoading(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">통계</h2>
        <div className="flex space-x-2">
          <Button 
            variant={displayMode === 'chart' ? 'default' : 'outline'} 
            size="sm"
            onClick={() => setDisplayMode('chart')}
          >
            <BarChart2 className="h-4 w-4 mr-2" />
            차트
          </Button>
          <Button 
            variant={displayMode === 'table' ? 'default' : 'outline'} 
            size="sm"
            onClick={() => setDisplayMode('table')}
          >
            <TableIcon className="h-4 w-4 mr-2" />
            표
          </Button>
        </div>
      </div>

      <div className="flex flex-col space-y-4">
        <div className="flex space-x-4">
          <Tabs defaultValue="daily" className="w-full" onValueChange={(value) => setViewType(value as 'daily' | 'weekly' | 'monthly')}>
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="daily">일별</TabsTrigger>
              <TabsTrigger value="weekly">주별</TabsTrigger>
              <TabsTrigger value="monthly">월별</TabsTrigger>
            </TabsList>

            <div className="flex justify-between items-center mt-4">
              <div className="flex items-center space-x-4">
                <Popover open={calendarOpen} onOpenChange={setCalendarOpen}>
                  <PopoverTrigger asChild>
                    <Button variant="outline" className="w-auto justify-start text-left font-normal">
                      <Calendar className="mr-2 h-4 w-4" />
                      {getDateRangeText()}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <CalendarComponent
                      mode={viewType === 'monthly' ? 'month' : 'single'}
                      selected={date}
                      onSelect={(date) => {
                        if (date) {
                          setDate(date);
                          setCalendarOpen(false);
                        }
                      }}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>

                {viewType === 'daily' && (
                  <Select value={selectedResort} onValueChange={setSelectedResort}>
                    <SelectTrigger className="w-[200px]">
                      <SelectValue placeholder="리조트 선택" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">모든 리조트</SelectItem>
                      {resorts.map((resort) => (
                        <SelectItem key={resort.code} value={resort.code}>
                          {resort.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                )}
              </div>
            </div>

            <TabsContent value="daily" className="space-y-4">
              {loading ? (
                <div className="flex justify-center items-center h-60">
                  <p>데이터를 불러오는 중...</p>
                </div>
              ) : displayMode === 'chart' ? (
                <>
                  <Card>
                    <CardHeader>
                      <CardTitle>객실 현황 (일별)</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ResponsiveContainer width="100%" height={300}>
                        <BarChart data={statisticsData}>
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="date" />
                          <YAxis />
                          <Tooltip />
                          <Legend />
                          <Bar dataKey="assignedRooms" name="배정 객실" fill="#3D63DD" />
                          <Bar dataKey="usedRooms" name="사용 객실" fill="#10B981" />
                          <Bar dataKey="remainingRooms" name="잔여 객실" fill="#F59E0B" />
                        </BarChart>
                      </ResponsiveContainer>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle>예약 현황 (일별)</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ResponsiveContainer width="100%" height={300}>
                        <LineChart data={statisticsData}>
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="date" />
                          <YAxis />
                          <Tooltip />
                          <Legend />
                          <Line type="monotone" dataKey="applicantsCount" name="신청 인원수" stroke="#3D63DD" />
                          <Line type="monotone" dataKey="cancelledCount" name="신청 취소수" stroke="#EF4444" />
                          <Line type="monotone" dataKey="winnersCount" name="당첨 인원수" stroke="#10B981" />
                        </LineChart>
                      </ResponsiveContainer>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle>이용률 (일별)</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ResponsiveContainer width="100%" height={300}>
                        <LineChart data={statisticsData}>
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="date" />
                          <YAxis />
                          <Tooltip />
                          <Legend />
                          <Line type="monotone" dataKey="reservationRate" name="예약률 (%)" stroke="#3D63DD" />
                          <Line type="monotone" dataKey="usageRate" name="이용률 (%)" stroke="#10B981" />
                        </LineChart>
                      </ResponsiveContainer>
                    </CardContent>
                  </Card>
                </>
              ) : (
                <Card>
                  <CardHeader>
                    <CardTitle>객실 및 예약 현황 (일별)</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>날짜</TableHead>
                          <TableHead>총 객실</TableHead>
                          <TableHead>배정 객실</TableHead>
                          <TableHead>사용 객실</TableHead>
                          <TableHead>잔여 객실</TableHead>
                          <TableHead>예약률(%)</TableHead>
                          <TableHead>신청 인원</TableHead>
                          <TableHead>취소 인원</TableHead>
                          <TableHead>당첨 인원</TableHead>
                          <TableHead>예약 완료</TableHead>
                          <TableHead>예약 취소</TableHead>
                          <TableHead>이용률(%)</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {statisticsData.map((data, index) => (
                          <TableRow key={index}>
                            <TableCell>{data.date}</TableCell>
                            <TableCell>{data.totalRooms}</TableCell>
                            <TableCell>{data.assignedRooms}</TableCell>
                            <TableCell>{data.usedRooms}</TableCell>
                            <TableCell>{data.remainingRooms}</TableCell>
                            <TableCell>{data.reservationRate}%</TableCell>
                            <TableCell>{data.applicantsCount}</TableCell>
                            <TableCell>{data.cancelledCount}</TableCell>
                            <TableCell>{data.winnersCount}</TableCell>
                            <TableCell>{data.completedReservations}</TableCell>
                            <TableCell>{data.cancelledReservations}</TableCell>
                            <TableCell>{data.usageRate}%</TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </CardContent>
                </Card>
              )}
            </TabsContent>

            <TabsContent value="weekly" className="space-y-4">
              {displayMode === 'chart' ? (
                <>
                  <Card>
                    <CardHeader>
                      <CardTitle>객실 현황 (주별)</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ResponsiveContainer width="100%" height={300}>
                        <BarChart data={statisticsData}>
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="date" />
                          <YAxis />
                          <Tooltip />
                          <Legend />
                          <Bar dataKey="assignedRooms" name="배정 객실" fill="#3D63DD" />
                          <Bar dataKey="usedRooms" name="사용 객실" fill="#10B981" />
                          <Bar dataKey="remainingRooms" name="잔여 객실" fill="#F59E0B" />
                        </BarChart>
                      </ResponsiveContainer>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle>예약 현황 (주별)</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ResponsiveContainer width="100%" height={300}>
                        <LineChart data={statisticsData}>
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="date" />
                          <YAxis />
                          <Tooltip />
                          <Legend />
                          <Line type="monotone" dataKey="applicantsCount" name="신청 인원수" stroke="#3D63DD" />
                          <Line type="monotone" dataKey="cancelledCount" name="신청 취소수" stroke="#EF4444" />
                          <Line type="monotone" dataKey="winnersCount" name="당첨 인원수" stroke="#10B981" />
                        </LineChart>
                      </ResponsiveContainer>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle>이용률 (주별)</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ResponsiveContainer width="100%" height={300}>
                        <LineChart data={statisticsData}>
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="date" />
                          <YAxis />
                          <Tooltip />
                          <Legend />
                          <Line type="monotone" dataKey="reservationRate" name="예약률 (%)" stroke="#3D63DD" />
                          <Line type="monotone" dataKey="usageRate" name="이용률 (%)" stroke="#10B981" />
                        </LineChart>
                      </ResponsiveContainer>
                    </CardContent>
                  </Card>
                </>
              ) : (
                <Card>
                  <CardHeader>
                    <CardTitle>객실 및 예약 현황 (주별)</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>주차</TableHead>
                          <TableHead>총 객실</TableHead>
                          <TableHead>배정 객실</TableHead>
                          <TableHead>사용 객실</TableHead>
                          <TableHead>잔여 객실</TableHead>
                          <TableHead>예약률(%)</TableHead>
                          <TableHead>신청 인원</TableHead>
                          <TableHead>취소 인원</TableHead>
                          <TableHead>당첨 인원</TableHead>
                          <TableHead>예약 완료</TableHead>
                          <TableHead>예약 취소</TableHead>
                          <TableHead>이용률(%)</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {statisticsData.map((data, index) => (
                          <TableRow key={index}>
                            <TableCell>{data.date}</TableCell>
                            <TableCell>{data.totalRooms}</TableCell>
                            <TableCell>{data.assignedRooms}</TableCell>
                            <TableCell>{data.usedRooms}</TableCell>
                            <TableCell>{data.remainingRooms}</TableCell>
                            <TableCell>{data.reservationRate}%</TableCell>
                            <TableCell>{data.applicantsCount}</TableCell>
                            <TableCell>{data.cancelledCount}</TableCell>
                            <TableCell>{data.winnersCount}</TableCell>
                            <TableCell>{data.completedReservations}</TableCell>
                            <TableCell>{data.cancelledReservations}</TableCell>
                            <TableCell>{data.usageRate}%</TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </CardContent>
                </Card>
              )}
            </TabsContent>

            <TabsContent value="monthly" className="space-y-4">
              {displayMode === 'chart' ? (
                <>
                  <Card>
                    <CardHeader>
                      <CardTitle>객실 현황 (월별)</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ResponsiveContainer width="100%" height={300}>
                        <BarChart data={statisticsData}>
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="date" />
                          <YAxis />
                          <Tooltip />
                          <Legend />
                          <Bar dataKey="assignedRooms" name="배정 객실" fill="#3D63DD" />
                          <Bar dataKey="usedRooms" name="사용 객실" fill="#10B981" />
                          <Bar dataKey="remainingRooms" name="잔여 객실" fill="#F59E0B" />
                        </BarChart>
                      </ResponsiveContainer>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle>예약 현황 (월별)</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ResponsiveContainer width="100%" height={300}>
                        <LineChart data={statisticsData}>
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="date" />
                          <YAxis />
                          <Tooltip />
                          <Legend />
                          <Line type="monotone" dataKey="applicantsCount" name="신청 인원수" stroke="#3D63DD" />
                          <Line type="monotone" dataKey="cancelledCount" name="신청 취소수" stroke="#EF4444" />
                          <Line type="monotone" dataKey="winnersCount" name="당첨 인원수" stroke="#10B981" />
                        </LineChart>
                      </ResponsiveContainer>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle>이용률 (월별)</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ResponsiveContainer width="100%" height={300}>
                        <LineChart data={statisticsData}>
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="date" />
                          <YAxis />
                          <Tooltip />
                          <Legend />
                          <Line type="monotone" dataKey="reservationRate" name="예약률 (%)" stroke="#3D63DD" />
                          <Line type="monotone" dataKey="usageRate" name="이용률 (%)" stroke="#10B981" />
                        </LineChart>
                      </ResponsiveContainer>
                    </CardContent>
                  </Card>
                </>
              ) : (
                <Card>
                  <CardHeader>
                    <CardTitle>객실 및 예약 현황 (월별)</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>월</TableHead>
                          <TableHead>총 객실</TableHead>
                          <TableHead>배정 객실</TableHead>
                          <TableHead>사용 객실</TableHead>
                          <TableHead>잔여 객실</TableHead>
                          <TableHead>예약률(%)</TableHead>
                          <TableHead>신청 인원</TableHead>
                          <TableHead>취소 인원</TableHead>
                          <TableHead>당첨 인원</TableHead>
                          <TableHead>예약 완료</TableHead>
                          <TableHead>예약 취소</TableHead>
                          <TableHead>이용률(%)</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {statisticsData.map((data, index) => (
                          <TableRow key={index}>
                            <TableCell>{data.date}</TableCell>
                            <TableCell>{data.totalRooms}</TableCell>
                            <TableCell>{data.assignedRooms}</TableCell>
                            <TableCell>{data.usedRooms}</TableCell>
                            <TableCell>{data.remainingRooms}</TableCell>
                            <TableCell>{data.reservationRate}%</TableCell>
                            <TableCell>{data.applicantsCount}</TableCell>
                            <TableCell>{data.cancelledCount}</TableCell>
                            <TableCell>{data.winnersCount}</TableCell>
                            <TableCell>{data.completedReservations}</TableCell>
                            <TableCell>{data.cancelledReservations}</TableCell>
                            <TableCell>{data.usageRate}%</TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </CardContent>
                </Card>
              )}
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default Statistics; 