// src/pages/ReservationDetail.jsx
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  ArrowLeft,
  Calendar,
  User,
  Mail,
  Phone,
  Home,
  Users,
  CreditCard,
  Edit,
  Trash,
  Send,
  Clock
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogFooter, 
  DialogHeader, 
  DialogTitle 
} from '@/components/ui/dialog';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger
} from '@/components/ui/tabs';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Separator } from '@/components/ui/separator';
import { Switch } from '@/components/ui/switch';
import { Checkbox } from '@/components/ui/checkbox';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';

interface Reservation {
  id: number;
  reservationNumber: string;
  name: string;
  phoneNumber: string;
  email: string;
  checkIn: string;
  checkOut: string;
  roomType: 'STANDARD' | 'DELUXE' | 'SUITE';
  resortCode: string;
  resortName: string;
  adults: number;
  children: number;
  totalPrice: number;
  pricePerDay: number;
  reservationStatus: 'CONFIRMED' | 'PENDING' | 'CANCELLED';
  paymentStatus: 'PAID' | 'UNPAID';
  specialRequests?: string;
  createdAt: string;
  updatedAt: string;
  history: Array<{
    timestamp: string;
    action: string;
    description: string;
  }>;
}

interface DrawingSchedule {
  isRecurring: boolean;
  selectedDays: string[];
  daysBeforeDrawing: number;
  resortCode: string;
  roomType: string;
  active: boolean;
}

interface DrawingScheduleDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onScheduleCreate: (schedule: DrawingSchedule) => void;
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

const DrawingScheduleDialog = ({ open, onOpenChange, onScheduleCreate }: DrawingScheduleDialogProps) => {
  const [isRecurring, setIsRecurring] = useState(true);
  const [selectedDays, setSelectedDays] = useState<string[]>([]);
  const [daysBeforeDrawing] = useState(13);
  const [selectedResort, setSelectedResort] = useState('');
  const [selectedRoomType, setSelectedRoomType] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onScheduleCreate({
      isRecurring,
      selectedDays,
      daysBeforeDrawing,
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
            추첨 일정을 설정합니다. 주기적 추첨을 설정하면 매주 지정된 요일에 자동으로 추첨이 진행됩니다.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-4">
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

// 가상 데이터 (API 응답 시뮬레이션)
const getReservationDetails = (id: string): Reservation => ({
  id: 1,
  reservationNumber: id,
  name: "홍길동",
  phoneNumber: "010-1234-5678",
  email: "hong@example.com",
  checkIn: "2024-08-01",
  checkOut: "2024-08-03",
  roomType: "STANDARD" as const,
  resortCode: "RESORT1",
  resortName: "리조트 A",
  adults: 2,
  children: 1,
  totalPrice: 300000,
  pricePerDay: 150000,
  reservationStatus: "CONFIRMED",
  createdAt: "2024-07-15T09:30:00",
  updatedAt: "2024-07-15T10:15:00",
  paymentStatus: "PAID",
  specialRequests: "조용한 방으로 배정 부탁드립니다.",
  history: [
    { 
      timestamp: "2024-07-15T09:30:00", 
      action: "CREATED", 
      description: "예약이 생성되었습니다." 
    },
    { 
      timestamp: "2024-07-15T09:35:00", 
      action: "EMAIL_SENT", 
      description: "예약 확인 이메일이 발송되었습니다." 
    },
    { 
      timestamp: "2024-07-15T10:15:00", 
      action: "STATUS_CHANGED", 
      description: "예약 상태가 대기중에서 확정으로 변경되었습니다." 
    }
  ]
});

const ReservationDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [reservation, setReservation] = useState<Reservation | null>(null);
  const [loading, setLoading] = useState(true);
  const [cancelDialogOpen, setCancelDialogOpen] = useState(false);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [messageDialogOpen, setMessageDialogOpen] = useState(false);
  const [selectedTemplate, setSelectedTemplate] = useState("confirmation");

  useEffect(() => {
    if (!id) return;
    setReservation(getReservationDetails(id));
    setLoading(false);
  }, [id]);

  const handleCancelReservation = () => {
    if (!reservation) return;
    
    setReservation({
      ...reservation,
      reservationStatus: "CANCELLED",
      history: [
        ...reservation.history,
        {
          timestamp: new Date().toISOString(),
          action: "STATUS_CHANGED",
          description: "예약 상태가 확정에서 취소로 변경되었습니다."
        }
      ]
    });
    setCancelDialogOpen(false);
  };

  const handleEditReservation = (data: Partial<Reservation>) => {
    if (!reservation) return;
    
    setReservation({
      ...reservation,
      ...data,
      updatedAt: new Date().toISOString(),
      history: [
        ...reservation.history,
        {
          timestamp: new Date().toISOString(),
          action: "UPDATED",
          description: "예약 정보가 수정되었습니다."
        }
      ]
    });
    setEditDialogOpen(false);
  };

  const handleSendMessage = (templateType: 'email' | 'sms') => {
    if (!reservation) return;
    
    const messageType = templateType === "email" ? "EMAIL_SENT" : "SMS_SENT";
    const description = templateType === "email" 
      ? `예약 관련 이메일(${selectedTemplate})이 발송되었습니다.` 
      : `예약 관련 SMS(${selectedTemplate})가 발송되었습니다.`;

    setReservation({
      ...reservation,
      history: [
        ...reservation.history,
        {
          timestamp: new Date().toISOString(),
          action: messageType,
          description
        }
      ]
    });
    setMessageDialogOpen(false);
  };

  const getStatusBadge = (status: 'CONFIRMED' | 'PENDING' | 'CANCELLED') => {
    switch (status) {
      case 'CONFIRMED':
        return <Badge className="bg-green-100 text-green-800 hover:bg-green-100">확정</Badge>;
      case 'PENDING':
        return <Badge className="bg-amber-100 text-amber-800 hover:bg-amber-100">대기중</Badge>;
      case 'CANCELLED':
        return <Badge className="bg-red-100 text-red-800 hover:bg-red-100">취소됨</Badge>;
      default:
        return <Badge className="bg-gray-100 text-gray-800 hover:bg-gray-100">{status}</Badge>;
    }
  };

  const getRoomTypeDisplay = (roomType: 'STANDARD' | 'DELUXE' | 'SUITE') => {
    switch (roomType) {
      case 'STANDARD':
        return '표준';
      case 'DELUXE':
        return '디럭스';
      case 'SUITE':
        return '스위트';
      default:
        return roomType;
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('ko-KR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date);
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('ko-KR', {
      style: 'currency',
      currency: 'KRW',
      maximumFractionDigits: 0
    }).format(price);
  };

  if (loading) {
    return <div className="flex justify-center items-center h-full">로딩 중...</div>;
  }

  if (!reservation) {
    return (
      <div className="flex flex-col items-center justify-center h-full text-center space-y-4">
        <h2 className="text-2xl font-bold">예약을 찾을 수 없습니다</h2>
        <p className="text-gray-500">요청한 예약 정보가 존재하지 않습니다.</p>
        <Button onClick={() => navigate('/reservations')}>
          <ArrowLeft className="mr-2 h-4 w-4" />
          예약 목록으로 돌아가기
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* 상단 헤더 */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div className="flex items-center space-x-4">
          <Button variant="outline" size="icon" onClick={() => navigate('/reservations')}>
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <div>
            <h2 className="text-2xl font-bold">예약 #{reservation.reservationNumber}</h2>
            <p className="text-gray-500">생성일: {formatDate(reservation.createdAt)}</p>
          </div>
        </div>
        <div className="flex flex-wrap gap-2">
          <Button variant="outline" onClick={() => setMessageDialogOpen(true)}>
            <Send className="mr-2 h-4 w-4" />
            메시지 발송
          </Button>
          {reservation.reservationStatus !== 'CANCELLED' && (
            <>
              <Button variant="outline" onClick={() => setEditDialogOpen(true)}>
                <Edit className="mr-2 h-4 w-4" />
                수정
              </Button>
              <Button variant="outline" onClick={() => setCancelDialogOpen(true)}>
                <Trash className="mr-2 h-4 w-4" />
                취소
              </Button>
            </>
          )}
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        {/* 왼쪽 열: 예약 정보 */}
        <div className="md:col-span-2 space-y-6">
          {/* 예약 상세 정보 */}
          <Card>
            <CardHeader>
              <CardTitle>예약 정보</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-6 md:grid-cols-2">
                <div className="space-y-4">
                  <div className="space-y-1">
                    <p className="text-sm font-medium text-gray-500">예약 상태</p>
                    <div className="flex items-center">
                      {getStatusBadge(reservation.reservationStatus)}
                    </div>
                  </div>

                  <div className="space-y-1">
                    <p className="text-sm font-medium text-gray-500">예약자 정보</p>
                    <div className="flex items-center">
                      <User className="h-4 w-4 text-gray-500 mr-2" />
                      <p>{reservation.name}</p>
                    </div>
                    <div className="flex items-center">
                      <Phone className="h-4 w-4 text-gray-500 mr-2" />
                      <p>{reservation.phoneNumber}</p>
                    </div>
                    <div className="flex items-center">
                      <Mail className="h-4 w-4 text-gray-500 mr-2" />
                      <p>{reservation.email}</p>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="space-y-1">
                    <p className="text-sm font-medium text-gray-500">일정 정보</p>
                    <div className="flex items-center">
                      <Calendar className="h-4 w-4 text-gray-500 mr-2" />
                      <p>체크인: {reservation.checkIn}</p>
                    </div>
                    <div className="flex items-center">
                      <Calendar className="h-4 w-4 text-gray-500 mr-2" />
                      <p>체크아웃: {reservation.checkOut}</p>
                    </div>
                    <div className="flex items-center">
                      <Users className="h-4 w-4 text-gray-500 mr-2" />
                      <p>인원: 성인 {reservation.adults}명, 아동 {reservation.children}명</p>
                    </div>
                  </div>

                  <div className="space-y-1">
                    <p className="text-sm font-medium text-gray-500">숙소 정보</p>
                    <div className="flex items-center">
                      <Home className="h-4 w-4 text-gray-500 mr-2" />
                      <p>{reservation.resortName}</p>
                    </div>
                    <div className="flex items-center ml-6">
                      <p>객실 유형: {getRoomTypeDisplay(reservation.roomType)}</p>
                    </div>
                  </div>
                </div>
              </div>

              <Separator className="my-6" />

              <div className="space-y-4">
                <div className="space-y-1">
                  <p className="text-sm font-medium text-gray-500">결제 정보</p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <CreditCard className="h-4 w-4 text-gray-500 mr-2" />
                      <p>결제 상태: {reservation.paymentStatus === 'PAID' ? '결제 완료' : '미결제'}</p>
                    </div>
                    <p className="font-medium">{formatPrice(reservation.totalPrice)}</p>
                  </div>
                  <div className="flex items-center justify-between ml-6">
                    <p>1박 요금</p>
                    <p>{formatPrice(reservation.pricePerDay)}</p>
                  </div>
                  <div className="flex items-center justify-between ml-6">
                    <p>숙박 일수</p>
                    <p>{(new Date(reservation.checkOut).getTime() - new Date(reservation.checkIn).getTime()) / (1000 * 60 * 60 * 24)}박</p>
                  </div>
                </div>

                {reservation.specialRequests && (
                  <div className="space-y-1">
                    <p className="text-sm font-medium text-gray-500">특별 요청사항</p>
                    <p className="p-3 bg-gray-50 rounded-md">{reservation.specialRequests}</p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* 예약 이력 */}
          <Card>
            <CardHeader>
              <CardTitle>예약 이력</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {reservation.history.map((historyItem, index) => (
                  <div key={index} className="flex items-start space-x-4">
                    <div className="mt-1">
                      <Clock className="h-5 w-5 text-gray-400" />
                    </div>
                    <div className="space-y-1 flex-1">
                      <div className="flex items-center justify-between">
                        <p className="font-medium">{historyItem.description}</p>
                        <p className="text-sm text-gray-500">{formatDate(historyItem.timestamp)}</p>
                      </div>
                      <Badge variant="outline">{historyItem.action}</Badge>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* 오른쪽 열: 요약 및 액션 */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>예약 요약</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <p className="font-medium">상태</p>
                  {getStatusBadge(reservation.reservationStatus)}
                </div>
                <div className="flex items-center justify-between">
                  <p className="font-medium">예약번호</p>
                  <p>{reservation.reservationNumber}</p>
                </div>
                <div className="flex items-center justify-between">
                  <p className="font-medium">체크인</p>
                  <p>{reservation.checkIn}</p>
                </div>
                <div className="flex items-center justify-between">
                  <p className="font-medium">체크아웃</p>
                  <p>{reservation.checkOut}</p>
                </div>
                <div className="flex items-center justify-between">
                  <p className="font-medium">총 금액</p>
                  <p className="font-bold">{formatPrice(reservation.totalPrice)}</p>
                </div>
              </div>

              <Separator />

              <div className="space-y-2">
                <Button className="w-full" variant="outline" onClick={() => setMessageDialogOpen(true)}>
                  <Send className="mr-2 h-4 w-4" />
                  메시지 발송
                </Button>
                {reservation.reservationStatus !== 'CANCELLED' && (
                  <>
                    <Button className="w-full" variant="outline" onClick={() => setEditDialogOpen(true)}>
                      <Edit className="mr-2 h-4 w-4" />
                      예약 수정
                    </Button>
                    <Button className="w-full" variant="outline" onClick={() => setCancelDialogOpen(true)}>
                      <Trash className="mr-2 h-4 w-4" />
                      예약 취소
                    </Button>
                  </>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* 예약 취소 확인 다이얼로그 */}
      <Dialog open={cancelDialogOpen} onOpenChange={setCancelDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>예약 취소</DialogTitle>
            <DialogDescription>
              이 예약을 취소하시겠습니까? 이 작업은 취소할 수 없습니다.
            </DialogDescription>
          </DialogHeader>
          <div className="py-4">
            <div className="space-y-1">
              <p className="text-sm font-medium">예약번호: {reservation.reservationNumber}</p>
              <p className="text-sm font-medium">예약자: {reservation.name}</p>
              <p className="text-sm text-gray-500">체크인: {reservation.checkIn}</p>
              <p className="text-sm text-gray-500">체크아웃: {reservation.checkOut}</p>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setCancelDialogOpen(false)}>
              취소
            </Button>
            <Button variant="outline" onClick={handleCancelReservation}>
              예약 취소 확인
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* 예약 수정 다이얼로그 */}
      <Dialog open={editDialogOpen} onOpenChange={setEditDialogOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>예약 정보 수정</DialogTitle>
            <DialogDescription>
              아래 양식을 작성하여 예약 정보를 수정하세요.
            </DialogDescription>
          </DialogHeader>
          <div className="py-4 space-y-4">
            <div className="space-y-2">
              <Label htmlFor="checkIn">체크인 날짜</Label>
              <Input
                id="checkIn"
                type="date"
                defaultValue={reservation.checkIn}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="checkOut">체크아웃 날짜</Label>
              <Input
                id="checkOut"
                type="date"
                defaultValue={reservation.checkOut}
              />
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="adults">성인</Label>
                <Input
                  id="adults"
                  type="number"
                  min={1}
                  defaultValue={reservation.adults}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="children">아동</Label>
                <Input
                  id="children"
                  type="number"
                  min={0}
                  defaultValue={reservation.children}
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="specialRequests">특별 요청사항</Label>
              <Textarea
                id="specialRequests"
                defaultValue={reservation.specialRequests}
                placeholder="특별 요청사항을 입력하세요"
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setEditDialogOpen(false)}>
              취소
            </Button>
            <Button onClick={() => handleEditReservation({
              checkIn: (document.getElementById('checkIn') as HTMLInputElement).value,
              checkOut: (document.getElementById('checkOut') as HTMLInputElement).value,
              adults: parseInt((document.getElementById('adults') as HTMLInputElement).value),
              children: parseInt((document.getElementById('children') as HTMLInputElement).value),
              specialRequests: (document.getElementById('specialRequests') as HTMLTextAreaElement).value
            })}>
              저장
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* 메시지 발송 다이얼로그 */}
      <Dialog open={messageDialogOpen} onOpenChange={setMessageDialogOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>메시지 발송</DialogTitle>
            <DialogDescription>
              고객에게 이메일 또는 SMS 메시지를 발송합니다.
            </DialogDescription>
          </DialogHeader>
          <Tabs defaultValue="email">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="email">이메일</TabsTrigger>
              <TabsTrigger value="sms">SMS</TabsTrigger>
            </TabsList>
            <TabsContent value="email" className="space-y-4 py-4">
              <div className="space-y-2">
                <Label>수신자</Label>
                <Input
                  value={reservation.email}
                  readOnly
                />
              </div>
              
              <div className="space-y-2">
                <Label>템플릿 선택</Label>
                <RadioGroup defaultValue={selectedTemplate} onValueChange={setSelectedTemplate}>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="confirmation" id="confirmation" />
                    <Label htmlFor="confirmation">예약 확정</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="reminder" id="reminder" />
                    <Label htmlFor="reminder">체크인 리마인더</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="cancellation" id="cancellation" />
                    <Label htmlFor="cancellation">예약 취소</Label>
                  </div>
                </RadioGroup>
              </div>
              
              <Button onClick={() => handleSendMessage("email")}>
                이메일 발송
              </Button>
            </TabsContent>
            <TabsContent value="sms" className="space-y-4 py-4">
              <div className="space-y-2">
                <Label>수신자</Label>
                <Input
                  value={reservation.phoneNumber}
                  readOnly
                />
              </div>
              
              <div className="space-y-2">
                <Label>템플릿 선택</Label>
                <RadioGroup defaultValue={selectedTemplate} onValueChange={setSelectedTemplate}>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="confirmation" id="sms-confirmation" />
                    <Label htmlFor="sms-confirmation">예약 확정</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="reminder" id="sms-reminder" />
                    <Label htmlFor="sms-reminder">체크인 리마인더</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="cancellation" id="sms-cancellation" />
                    <Label htmlFor="sms-cancellation">예약 취소</Label>
                  </div>
                </RadioGroup>
              </div>
              
              <Button onClick={() => handleSendMessage("sms")}>
                SMS 발송
              </Button>
            </TabsContent>
          </Tabs>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ReservationDetail;