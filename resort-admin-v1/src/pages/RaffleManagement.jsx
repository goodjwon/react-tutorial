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

// 가상 데이터 (API 응답 시뮬레이션)
const getRaffleSchedules = () => [
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
      { name: '박지성', phoneNumber: '010-****-3456', email: 'park****@example.com' },
      { name: '최민수', phoneNumber: '010-****-4567', email: 'choi****@example.com' },
      { name: '정다운', phoneNumber: '010-****-5678', email: 'jung****@example.com' },
      { name: '강수진', phoneNumber: '010-****-6789', email: 'kang****@example.com' },
      { name: '윤세라', phoneNumber: '010-****-7890', email: 'yoon****@example.com' },
      { name: '조현우', phoneNumber: '010-****-8901', email: 'jo****@example.com' },
      { name: '한미영', phoneNumber: '010-****-9012', email: 'han****@example.com' },
      { name: '송재원', phoneNumber: '010-****-0123', email: 'song****@example.com' }
    ],
    createdAt: '2024-06-15T09:20:00',
    completedAt: '2024-07-30T10:00:00'
  }
];

const getResorts = () => [
  { code: 'RESORT1', name: '리조트 A', location: '제주도' },
  { code: 'RESORT2', name: '리조트 B', location: '강원도' },
  { code: 'RESORT3', name: '리조트 C', location: '부산' }
];

const RaffleManagement = () => {
  const [raffleSchedules, setRaffleSchedules] = useState([]);
  const [resorts, setResorts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [createDialogOpen, setCreateDialogOpen] = useState(false);
  const [confirmDeleteDialogOpen, setConfirmDeleteDialogOpen] = useState(false);
  const [confirmExecuteDialogOpen, setConfirmExecuteDialogOpen] = useState(false);
  const [selectedSchedule, setSelectedSchedule] = useState(null);
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedResort, setSelectedResort] = useState('');
  const [selectedRoomType, setSelectedRoomType] = useState('');
  const [winnersCount, setWinnersCount] = useState(5);
  const [formError, setFormError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [activeTab, setActiveTab] = useState('upcoming');

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

    // 실제 구현에서는 API 호출이 이루어질 것입니다
    const newSchedule = {
      id: raffleSchedules.length + 1,
      raffleDate: format(selectedDate, 'yyyy-MM-dd'),
      status: 'SCHEDULED',
      resortCode: selectedResort,
      roomType: selectedRoomType,
      totalApplications: 0,
      winnersCount: winnersCount,
      createdAt: new Date().toISOString()
    };

    setRaffleSchedules(prev => [...prev, newSchedule]);
    setCreateDialogOpen(false);
    setSelectedDate(null);
    setSelectedResort('');
    setSelectedRoomType('');
    setWinnersCount(5);
    setFormError('');
    setSuccessMessage('추첨 일정이 성공적으로 생성되었습니다.');

    // 3초 후에 성공 메시지 삭제
    setTimeout(() => {
      setSuccessMessage('');
    }, 3000);
  };

  const handleDeleteRaffle = () => {
    // 실제 구현에서는 API 호출이 이루어질 것입니다
    setRaffleSchedules(prev => prev.filter(schedule => schedule.id !== selectedSchedule.id));
    setConfirmDeleteDialogOpen(false);
    setSelectedSchedule(null);
    setSuccessMessage('추첨 일정이 삭제되었습니다.');

    // 3초 후에 성공 메시지 삭제
    setTimeout(() => {
      setSuccessMessage('');
    }, 3000);
  };

  const handleExecuteRaffle = () => {
    // 실제 구현에서는 API 호출이 이루어질 것입니다
    setRaffleSchedules(prev => 
      prev.map(schedule => 
        schedule.id === selectedSchedule.id 
          ? { 
              ...schedule, 
              status: 'COMPLETED', 
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

    // 3초 후에 성공 메시지 삭제
    setTimeout(() => {
      setSuccessMessage('');
    }, 3000);
  };

  const getRoomTypeDisplay = (roomType) => {
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

  const getStatusBadge = (status) => {
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

  const formatDate = (dateString) => {
    return format(new Date(dateString), 'yyyy년 MM월 dd일');
  };

  const formatDateTime = (dateTimeString) => {
    return format(new Date(dateTimeString), 'yyyy년 MM월 dd일 HH:mm');
  };

  const upcomingSchedules = raffleSchedules.filter(
    schedule => schedule.status === 'SCHEDULED'
  );

  const completedSchedules = raffleSchedules.filter(
    schedule => schedule.status === 'COMPLETED'
  );

  if (loading) {
    return <div className="flex justify-center items-center h-full">로딩 중...</div>;
  }

  return (
    <div className="space-y-6">
      {/* 상단 헤더 및 버튼 */}
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">추첨 관리</h2>
        <Button onClick={() => setCreateDialogOpen(true)}>
          <Plus className="mr-2 h-4 w-4" />
          새 추첨 일정 생성
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
                <Button className="mt-4" variant="outline" onClick={() => setCreateDialogOpen(true)}>
                  <Plus className="mr-2 h-4 w-4" />
                  새 추첨 일정 생성
                </Button>
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
                      완료일시: {formatDateTime(schedule.completedAt)}
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
                              {schedule.winnersList.map((winner, index) => (
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

      {/* 추첨 생성 다이얼로그 */}
      <Dialog open={createDialogOpen} onOpenChange={setCreateDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>추첨 일정 생성</DialogTitle>
            <DialogDescription>
              새로운 추첨 일정을 생성합니다. 모든 필드를 채워주세요.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            {formError && (
              <Alert variant="destructive">
                <AlertTriangle className="h-4 w-4" />
                <AlertTitle>오류</AlertTitle>
                <AlertDescription>{formError}</AlertDescription>
              </Alert>
            )}

            <div className="space-y-2">
              <Label>추첨 날짜</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className="w-full justify-start text-left font-normal"
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {selectedDate ? format(selectedDate, 'PPP', { locale: ko }) : '날짜 선택'}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={selectedDate}
                    onSelect={setSelectedDate}
                    disabled={(date) => date < new Date()}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>

            <div className="space-y-2">
              <Label htmlFor="resort">리조트</Label>
              <Select value={selectedResort} onValueChange={setSelectedResort}>
                <SelectTrigger>
                  <SelectValue placeholder="리조트 선택" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    {resorts.map(resort => (
                      <SelectItem key={resort.code} value={resort.code}>
                        {resort.name} ({resort.location})
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="roomType">객실 유형</Label>
              <Select value={selectedRoomType} onValueChange={setSelectedRoomType}>
                <SelectTrigger>
                  <SelectValue placeholder="객실 유형 선택" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectItem value="STANDARD">스탠다드</SelectItem>
                    <SelectItem value="DELUXE">디럭스</SelectItem>
                    <SelectItem value="SUITE">스위트</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="winnersCount">당첨자 수</Label>
              <Input
                id="winnersCount"
                type="number"
                min={1}
                max={50}
                value={winnersCount}
                onChange={(e) => setWinnersCount(parseInt(e.target.value))}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setCreateDialogOpen(false)}>
              취소
            </Button>
            <Button onClick={handleCreateRaffle}>
              추첨 일정 생성
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

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
    </div>
  );
};

export default RaffleManagement;