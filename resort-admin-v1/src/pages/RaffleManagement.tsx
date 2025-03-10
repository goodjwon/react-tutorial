// src/pages/RaffleManagement.jsx
import React, { useState, useEffect } from 'react';
import {
  Calendar as CalendarIcon,
  Plus,
  Trash,
  RefreshCw,
  Award,
  CheckCircle,
  AlertTriangle,
  Info
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/components/ui/dialog';
import {
  Popover,
  PopoverContent,
  PopoverTrigger
} from '@/components/ui/popover';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger
} from '@/components/ui/tabs';
import {
  Alert,
  AlertDescription,
  AlertTitle
} from '@/components/ui/alert';
import { Calendar } from '@/components/ui/calendar';
import { format } from 'date-fns';
import { ko } from 'date-fns/locale';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Switch } from '@/components/ui/switch';
import { Checkbox } from '@/components/ui/checkbox';
import { DatePicker } from '@/components/ui/date-picker';

interface Winner {
  name: string;
  phoneNumber: string;
  email: string;
}

interface RaffleSchedule {
  id: number;
  raffleDate: string;
  status: 'SCHEDULED' | 'COMPLETED' | 'CANCELLED';
  resortCode: string;
  roomType: 'STANDARD' | 'DELUXE' | 'SUITE';
  totalApplications: number;
  winnersCount: number;
  createdAt: string;
  completedAt?: string;
  winnersList?: Winner[];
}

interface Resort {
  code: string;
  name: string;
  location: string;
}

interface DrawingSchedule {
  scheduleType: 'date' | 'weekday';
  isRecurring: boolean;
  selectedDays?: string[];
  startDate?: Date;
  endDate?: Date;
  daysBeforeDrawing: number;
  resortCode: string;
  roomType: string;
  active: boolean;
}

const DAYS_OF_WEEK = [
  { value: '0', label: '일요일' },
  { value: '1', label: '월요일' },
  { value: '2', label: '화요일' },
  { value: '3', label: '수요일' },
  { value: '4', label: '목요일' },
  { value: '5', label: '금요일' },
  { value: '6', label: '토요일' },
];

// 가상 데이터 (API 응답 시뮬레이션)
const getRaffleSchedules = (): RaffleSchedule[] => [
  {
    id: 1,
    raffleDate: '2024-08-15',
    status: 'SCHEDULED',
    resortCode: 'RESORT1',
    roomType: 'DELUXE',
    totalApplications: 32,
    winnersCount: 5,
    createdAt: '2024-07-01T10:30:00'
  },
  {
    id: 2,
    raffleDate: '2024-08-20',
    status: 'SCHEDULED',
    resortCode: 'RESORT2',
    roomType: 'SUITE',
    totalApplications: 18,
    winnersCount: 3,
    createdAt: '2024-07-05T14:15:00'
  },
  {
    id: 3,
    raffleDate: '2024-07-30',
    status: 'COMPLETED',
    resortCode: 'RESORT3',
    roomType: 'STANDARD',
    totalApplications: 45,
    winnersCount: 10,
    winnersList: [
      { name: '김철수', phoneNumber: '010-****-1234', email: 'kim****@example.com' },
      { name: '이영희', phoneNumber: '010-****-2345', email: 'lee****@example.com' },
      { name: '박지성', phoneNumber: '010-****-3456', email: 'park****@example.com' }
    ],
    createdAt: '2024-06-15T09:20:00',
    completedAt: '2024-07-30T10:00:00'
  }
];

const getResorts = (): Resort[] => [
  { code: 'RESORT1', name: '리조트 A', location: '제주도' },
  { code: 'RESORT2', name: '리조트 B', location: '강원도' },
  { code: 'RESORT3', name: '리조트 C', location: '부산' }
];

const RaffleManagement = () => {
  const [raffleSchedules, setRaffleSchedules] = useState<RaffleSchedule[]>([]);
  const [resorts, setResorts] = useState<Resort[]>([]);
  const [loading, setLoading] = useState(true);
  const [confirmDeleteDialogOpen, setConfirmDeleteDialogOpen] = useState(false);
  const [confirmExecuteDialogOpen, setConfirmExecuteDialogOpen] = useState(false);
  const [selectedSchedule, setSelectedSchedule] = useState<RaffleSchedule | null>(null);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedResort, setSelectedResort] = useState('');
  const [selectedRoomType, setSelectedRoomType] = useState('');
  const [winnersCount, setWinnersCount] = useState(5);
  const [formError, setFormError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [activeTab, setActiveTab] = useState('upcoming');
  const [drawingDialogOpen, setDrawingDialogOpen] = useState(false);
  const [schedules, setSchedules] = useState<DrawingSchedule[]>([]);

  useEffect(() => {
    // 실제 구현에서는 API 호출이 이루어질 것입니다
    setRaffleSchedules(getRaffleSchedules());
    setResorts(getResorts());
    setLoading(false);
  }, []);

  const handleCreateRaffle = () => {
    if (!selectedDate || !selectedResort || !selectedRoomType || winnersCount <= 0) {
      setFormError('모든 필드를 채워주세요.');
      return;
    }

    const newSchedule: RaffleSchedule = {
      id: raffleSchedules.length + 1,
      raffleDate: format(selectedDate, 'yyyy-MM-dd'),
      status: 'SCHEDULED',
      resortCode: selectedResort,
      roomType: selectedRoomType as RaffleSchedule['roomType'],
      totalApplications: 0,
      winnersCount: winnersCount,
      createdAt: new Date().toISOString()
    };

    setRaffleSchedules(prev => [...prev, newSchedule]);
    setSelectedDate(null);
    setSelectedResort('');
    setSelectedRoomType('');
    setWinnersCount(5);
    setFormError('');
    setSuccessMessage('추첨 일정이 성공적으로 생성되었습니다.');

    setTimeout(() => {
      setSuccessMessage('');
    }, 3000);
  };

  const handleDeleteRaffle = () => {
    if (!selectedSchedule) return;
    
    setRaffleSchedules(prev => prev.filter(schedule => schedule.id !== selectedSchedule.id));
    setConfirmDeleteDialogOpen(false);
    setSelectedSchedule(null);
    setSuccessMessage('추첨 일정이 삭제되었습니다.');

    setTimeout(() => {
      setSuccessMessage('');
    }, 3000);
  };

  const handleExecuteRaffle = () => {
    if (!selectedSchedule) return;

    setRaffleSchedules(prev => 
      prev.map(schedule => 
        schedule.id === selectedSchedule.id 
          ? { 
              ...schedule, 
              status: 'COMPLETED' as const, 
              completedAt: new Date().toISOString(),
              winnersList: Array.from({ length: schedule.winnersCount }, (_, i) => ({
                name: `당첨자 ${i + 1}`,
                phoneNumber: `010-****-${1000 + i}`,
                email: `winner${i + 1}****@example.com`
              }))
            } 
          : schedule
      )
    );
    setConfirmExecuteDialogOpen(false);
    setSelectedSchedule(null);
    setSuccessMessage('추첨이 성공적으로 실행되었습니다.');

    setTimeout(() => {
      setSuccessMessage('');
    }, 3000);
  };

  const getRoomTypeDisplay = (roomType: RaffleSchedule['roomType']): string => {
    switch (roomType) {
      case 'STANDARD':
        return '스탠다드';
      case 'DELUXE':
        return '디럭스';
      case 'SUITE':
        return '스위트';
      default:
        return roomType;
    }
  };

  const getStatusBadge = (status: RaffleSchedule['status']) => {
    switch (status) {
      case 'SCHEDULED':
        return <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-100">예정됨</Badge>;
      case 'COMPLETED':
        return <Badge className="bg-green-100 text-green-800 hover:bg-green-100">완료됨</Badge>;
      case 'CANCELLED':
        return <Badge className="bg-red-100 text-red-800 hover:bg-red-100">취소됨</Badge>;
      default:
        return <Badge className="bg-gray-100 text-gray-800 hover:bg-gray-100">{status}</Badge>;
    }
  };

  const formatDate = (dateString: string): string => {
    return format(new Date(dateString), 'yyyy년 MM월 dd일');
  };

  const formatDateTime = (dateTimeString: string): string => {
    return format(new Date(dateTimeString), 'yyyy년 MM월 dd일 HH:mm');
  };

  const upcomingSchedules = raffleSchedules.filter(
    schedule => schedule.status === 'SCHEDULED'
  );

  const completedSchedules = raffleSchedules.filter(
    schedule => schedule.status === 'COMPLETED'
  );

  const handleDrawingScheduleCreate = (schedule: DrawingSchedule) => {
    // 일자 지정 방식일 경우
    if (schedule.scheduleType === 'date' && schedule.startDate && schedule.endDate) {
      const start = new Date(schedule.startDate);
      const end = new Date(schedule.endDate);
      const dates: Date[] = [];
      
      // 시작일부터 종료일까지의 모든 날짜 생성
      for (let date = start; date <= end; date.setDate(date.getDate() + 1)) {
        dates.push(new Date(date));
      }

      // 각 날짜에 대한 추첨 일정 생성
      const newSchedules = dates.map((date, index) => ({
        id: raffleSchedules.length + index + 1,
        raffleDate: format(date, 'yyyy-MM-dd'),
        status: 'SCHEDULED' as const,
        resortCode: schedule.resortCode,
        roomType: schedule.roomType as RaffleSchedule['roomType'],
        totalApplications: 0,
        winnersCount: 5,
        createdAt: new Date().toISOString()
      }));

      setRaffleSchedules(prev => [...prev, ...newSchedules]);
    }
    // 요일 지정 방식일 경우
    else if (schedule.scheduleType === 'weekday' && schedule.selectedDays) {
      const today = new Date();
      const nextMonth = new Date(today.getFullYear(), today.getMonth() + 1, 1);
      const dates: Date[] = [];

      // 다음 한 달 동안의 선택된 요일에 해당하는 날짜들 생성
      for (let date = today; date < nextMonth; date.setDate(date.getDate() + 1)) {
        if (schedule.selectedDays.includes(date.getDay().toString())) {
          dates.push(new Date(date));
        }
      }

      // 각 날짜에 대한 추첨 일정 생성
      const newSchedules = dates.map((date, index) => ({
        id: raffleSchedules.length + index + 1,
        raffleDate: format(date, 'yyyy-MM-dd'),
        status: 'SCHEDULED' as const,
        resortCode: schedule.resortCode,
        roomType: schedule.roomType as RaffleSchedule['roomType'],
        totalApplications: 0,
        winnersCount: 5,
        createdAt: new Date().toISOString()
      }));

      setRaffleSchedules(prev => [...prev, ...newSchedules]);
    }

    setSuccessMessage('추첨 일정이 성공적으로 생성되었습니다.');
    setTimeout(() => {
      setSuccessMessage('');
    }, 3000);
    
    setDrawingDialogOpen(false);
  };

  if (loading) {
    return <div className="flex justify-center items-center h-full">로딩 중...</div>;
  }

  return (
    <div className="space-y-6">
      {/* 상단 헤더 및 버튼 */}
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">추첨 관리</h2>
        <Button onClick={() => setDrawingDialogOpen(true)}>
          <Plus className="mr-2 h-4 w-4" />
          추첨 일정 생성
        </Button>
      </div>

      {/* 성공 메시지 */}
      {successMessage && (
        <Alert className="bg-green-50 border-green-200">
          <CheckCircle className="h-4 w-4 text-green-600" />
          <AlertTitle>성공</AlertTitle>
          <AlertDescription>{successMessage}</AlertDescription>
        </Alert>
      )}

      {/* 탭 */}
      <Tabs defaultValue="upcoming" value={activeTab} onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="upcoming">
            예정된 추첨
            {upcomingSchedules.length > 0 && (
              <Badge className="ml-2 bg-blue-100 text-blue-800 hover:bg-blue-100">
                {upcomingSchedules.length}
              </Badge>
            )}
          </TabsTrigger>
          <TabsTrigger value="completed">
            완료된 추첨
            {completedSchedules.length > 0 && (
              <Badge className="ml-2 bg-green-100 text-green-800 hover:bg-green-100">
                {completedSchedules.length}
              </Badge>
            )}
          </TabsTrigger>
        </TabsList>

        {/* 예정된 추첨 */}
        <TabsContent value="upcoming">
          {upcomingSchedules.length === 0 ? (
            <Card>
              <CardContent className="pt-6 text-center">
                <Info className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-500">예정된 추첨 일정이 없습니다.</p>
              </CardContent>
            </Card>
          ) : (
            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
              {upcomingSchedules.map(schedule => (
                <Card key={schedule.id}>
                  <CardHeader>
                    <CardTitle className="flex justify-between items-center">
                      <span>{formatDate(schedule.raffleDate)}</span>
                      {getStatusBadge(schedule.status)}
                    </CardTitle>
                    <CardDescription>
                      생성일: {formatDateTime(schedule.createdAt)}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="grid grid-cols-2 gap-2">
                        <div>
                          <p className="text-sm font-medium text-gray-500">리조트</p>
                          <p>{resorts.find(r => r.code === schedule.resortCode)?.name || schedule.resortCode}</p>
                        </div>
                        <div>
                          <p className="text-sm font-medium text-gray-500">객실 유형</p>
                          <p>{getRoomTypeDisplay(schedule.roomType)}</p>
                        </div>
                        <div>
                          <p className="text-sm font-medium text-gray-500">신청자 수</p>
                          <p>{schedule.totalApplications}명</p>
                        </div>
                        <div>
                          <p className="text-sm font-medium text-gray-500">당첨자 수</p>
                          <p>{schedule.winnersCount}명</p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-between">
                    <Button 
                      variant="outline" 
                      className="text-red-600 border-red-200 hover:bg-red-50"
                      onClick={() => {
                        setSelectedSchedule(schedule);
                        setConfirmDeleteDialogOpen(true);
                      }}
                    >
                      <Trash className="mr-2 h-4 w-4" />
                      삭제
                    </Button>
                    <Button 
                      className="bg-amber-500 hover:bg-amber-600"
                      onClick={() => {
                        setSelectedSchedule(schedule);
                        setConfirmExecuteDialogOpen(true);
                      }}
                    >
                      <Award className="mr-2 h-4 w-4" />
                      추첨 실행
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          )}
        </TabsContent>

        {/* 완료된 추첨 */}
        <TabsContent value="completed">
          {completedSchedules.length === 0 ? (
            <Card>
              <CardContent className="pt-6 text-center">
                <Info className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-500">완료된 추첨 내역이 없습니다.</p>
              </CardContent>
            </Card>
          ) : (
            <div className="space-y-6">
              {completedSchedules.map(schedule => (
                <Card key={schedule.id}>
                  <CardHeader>
                    <CardTitle className="flex justify-between items-center">
                      <span>{formatDate(schedule.raffleDate)}</span>
                      {getStatusBadge(schedule.status)}
                    </CardTitle>
                    <CardDescription>
                      완료일시: {schedule.completedAt && formatDateTime(schedule.completedAt)}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="grid grid-cols-2 gap-2">
                        <div>
                          <p className="text-sm font-medium text-gray-500">리조트</p>
                          <p>{resorts.find(r => r.code === schedule.resortCode)?.name || schedule.resortCode}</p>
                        </div>
                        <div>
                          <p className="text-sm font-medium text-gray-500">객실 유형</p>
                          <p>{getRoomTypeDisplay(schedule.roomType)}</p>
                        </div>
                        <div>
                          <p className="text-sm font-medium text-gray-500">신청자 수</p>
                          <p>{schedule.totalApplications}명</p>
                        </div>
                        <div>
                          <p className="text-sm font-medium text-gray-500">당첨자 수</p>
                          <p>{schedule.winnersCount}명</p>
                        </div>
                        {schedule.completedAt && (
                          <div>
                            <p className="text-sm font-medium text-gray-500">완료 일시</p>
                            <p>{schedule.completedAt ? formatDateTime(schedule.completedAt) : ''}</p>
                          </div>
                        )}
                      </div>

                      <div>
                        <p className="text-sm font-medium text-gray-500 mb-2">당첨자 목록</p>
                        <div className="rounded-md border">
                          <Table>
                            <TableHeader>
                              <TableRow>
                                <TableHead className="w-[50px]">No.</TableHead>
                                <TableHead>이름</TableHead>
                                <TableHead>연락처</TableHead>
                                <TableHead>이메일</TableHead>
                              </TableRow>
                            </TableHeader>
                            <TableBody>
                              {schedule.winnersList?.map((winner, index) => (
                                <TableRow key={index}>
                                  <TableCell>{index + 1}</TableCell>
                                  <TableCell>{winner.name}</TableCell>
                                  <TableCell>{winner.phoneNumber}</TableCell>
                                  <TableCell>{winner.email}</TableCell>
                                </TableRow>
                              ))}
                            </TableBody>
                          </Table>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button className="w-full" variant="outline">
                      <RefreshCw className="mr-2 h-4 w-4" />
                      당첨자에게 알림 재발송
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          )}
        </TabsContent>
      </Tabs>

      {/* 추첨 삭제 확인 다이얼로그 */}
      <Dialog open={confirmDeleteDialogOpen} onOpenChange={setConfirmDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>추첨 일정 삭제</DialogTitle>
            <DialogDescription>
              이 추첨 일정을 삭제하시겠습니까? 이 작업은 취소할 수 없습니다.
            </DialogDescription>
          </DialogHeader>
          {selectedSchedule && (
            <div className="py-4">
              <div className="space-y-1">
                <p className="text-sm font-medium">추첨 날짜: {formatDate(selectedSchedule.raffleDate)}</p>
                <p className="text-sm font-medium">리조트: {resorts.find(r => r.code === selectedSchedule.resortCode)?.name || selectedSchedule.resortCode}</p>
                <p className="text-sm font-medium">객실 유형: {getRoomTypeDisplay(selectedSchedule.roomType)}</p>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setConfirmDeleteDialogOpen(false)}>
              취소
            </Button>
            <Button variant="destructive" onClick={handleDeleteRaffle}>
              삭제 확인
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* 추첨 실행 확인 다이얼로그 */}
      <Dialog open={confirmExecuteDialogOpen} onOpenChange={setConfirmExecuteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>추첨 실행</DialogTitle>
            <DialogDescription>
              추첨을 실행하시겠습니까? 이 작업은 취소할 수 없으며, 당첨자에게 자동으로 알림이 발송됩니다.
            </DialogDescription>
          </DialogHeader>
          {selectedSchedule && (
            <div className="py-4">
              <div className="space-y-1">
                <p className="text-sm font-medium">추첨 날짜: {formatDate(selectedSchedule.raffleDate)}</p>
                <p className="text-sm font-medium">리조트: {resorts.find(r => r.code === selectedSchedule.resortCode)?.name || selectedSchedule.resortCode}</p>
                <p className="text-sm font-medium">객실 유형: {getRoomTypeDisplay(selectedSchedule.roomType)}</p>
                <p className="text-sm font-medium">신청자 수: {selectedSchedule.totalApplications}명</p>
                <p className="text-sm font-medium">당첨자 수: {selectedSchedule.winnersCount}명</p>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setConfirmExecuteDialogOpen(false)}>
              취소
            </Button>
            <Button onClick={handleExecuteRaffle}>
              추첨 실행 확인
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <DrawingScheduleDialog
        open={drawingDialogOpen}
        onOpenChange={setDrawingDialogOpen}
        onScheduleCreate={handleDrawingScheduleCreate}
      />
    </div>
  );
};

const DrawingScheduleDialog = ({ open, onOpenChange, onScheduleCreate }: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onScheduleCreate: (schedule: DrawingSchedule) => void;
}) => {
  const [scheduleType, setScheduleType] = useState<'date' | 'weekday'>('weekday');
  const [isRecurring, setIsRecurring] = useState(true);
  const [selectedDays, setSelectedDays] = useState<string[]>([]);
  const [startDate, setStartDate] = useState<Date>();
  const [endDate, setEndDate] = useState<Date>();
  const [selectedResort, setSelectedResort] = useState('');
  const [selectedRoomType, setSelectedRoomType] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onScheduleCreate({
      scheduleType,
      isRecurring,
      selectedDays: scheduleType === 'weekday' ? selectedDays : undefined,
      startDate: scheduleType === 'date' ? startDate : undefined,
      endDate: scheduleType === 'date' ? endDate : undefined,
      daysBeforeDrawing: 13,
      resortCode: selectedResort,
      roomType: selectedRoomType,
      active: true
    });
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>추첨 일정 생성</DialogTitle>
          <DialogDescription>
            추첨 일정을 설정합니다. 일자 지정 또는 요일 지정 방식을 선택할 수 있습니다.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-4">
            <div className="space-y-2">
              <Label>일정 설정 방식</Label>
              <RadioGroup value={scheduleType} onValueChange={(value: 'date' | 'weekday') => setScheduleType(value)}>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="date" id="date" />
                  <Label htmlFor="date">일자 지정</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="weekday" id="weekday" />
                  <Label htmlFor="weekday">요일 지정</Label>
                </div>
              </RadioGroup>
            </div>

            {scheduleType === 'weekday' && (
              <>
                <div className="flex items-center justify-between">
                  <Label htmlFor="recurring">주기적 추첨 설정</Label>
                  <Switch
                    id="recurring"
                    checked={isRecurring}
                    onCheckedChange={setIsRecurring}
                  />
                </div>

                {isRecurring && (
                  <div className="space-y-4">
                    <Label>추첨 요일 선택</Label>
                    <div className="grid grid-cols-2 gap-4">
                      {DAYS_OF_WEEK.map((day) => (
                        <div key={day.value} className="flex items-center space-x-2">
                          <Checkbox
                            id={`day-${day.value}`}
                            checked={selectedDays.includes(day.value)}
                            onCheckedChange={(checked: boolean) => {
                              if (checked) {
                                setSelectedDays([...selectedDays, day.value]);
                              } else {
                                setSelectedDays(selectedDays.filter(d => d !== day.value));
                              }
                            }}
                          />
                          <Label htmlFor={`day-${day.value}`}>{day.label}</Label>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </>
            )}

            {scheduleType === 'date' && (
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label>추첨 기간 설정</Label>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>시작일</Label>
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button
                            variant="outline"
                            className="w-full justify-start text-left font-normal"
                          >
                            <CalendarIcon className="mr-2 h-4 w-4" />
                            {startDate ? format(startDate, 'PPP', { locale: ko }) : '날짜 선택'}
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0">
                          <Calendar
                            mode="single"
                            selected={startDate}
                            onSelect={setStartDate}
                            initialFocus
                          />
                        </PopoverContent>
                      </Popover>
                    </div>
                    <div className="space-y-2">
                      <Label>종료일</Label>
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button
                            variant="outline"
                            className="w-full justify-start text-left font-normal"
                          >
                            <CalendarIcon className="mr-2 h-4 w-4" />
                            {endDate ? format(endDate, 'PPP', { locale: ko }) : '날짜 선택'}
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0">
                          <Calendar
                            mode="single"
                            selected={endDate}
                            onSelect={setEndDate}
                            initialFocus
                          />
                        </PopoverContent>
                      </Popover>
                    </div>
                  </div>
                </div>
              </div>
            )}

            <div className="space-y-2">
              <Label>추첨일 설정</Label>
              <p className="text-sm text-gray-500">추첨일 13일 전에 자동으로 설정됩니다.</p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="resort">리조트</Label>
              <Select value={selectedResort} onValueChange={setSelectedResort}>
                <SelectTrigger id="resort">
                  <SelectValue placeholder="리조트 선택" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="resort-a">리조트 A (제주도)</SelectItem>
                  <SelectItem value="resort-b">리조트 B (강원도)</SelectItem>
                  <SelectItem value="resort-c">리조트 C (부산)</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="roomType">객실 유형</Label>
              <Select value={selectedRoomType} onValueChange={setSelectedRoomType}>
                <SelectTrigger id="roomType">
                  <SelectValue placeholder="객실 유형 선택" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="STANDARD">스탠다드</SelectItem>
                  <SelectItem value="DELUXE">디럭스</SelectItem>
                  <SelectItem value="SUITE">스위트</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => onOpenChange(false)}>
              취소
            </Button>
            <Button type="submit">
              추첨 일정 생성
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default RaffleManagement;