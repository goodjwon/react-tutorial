// src/pages/ReservationsList.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  CheckCircle, 
  XCircle, 
  Clock,
  Search,
  Filter,
  ChevronDown,
  ChevronUp,
  MoreHorizontal
} from 'lucide-react';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';
import { 
  Pagination, 
  PaginationContent, 
  PaginationItem, 
  PaginationLink, 
  PaginationNext, 
  PaginationPrevious 
} from '@/components/ui/pagination';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';

// 가상 데이터
const getReservations = () => [
  {
    id: 1,
    reservationNumber: "RES12345",
    name: "홍길동",
    phoneNumber: "010-1234-5678",
    email: "hong@example.com",
    checkIn: "2024-08-01",
    checkOut: "2024-08-03",
    roomType: "STANDARD",
    resortCode: "RESORT1",
    adults: 2,
    children: 1,
    totalPrice: 300000,
    reservationStatus: "CONFIRMED",
    createdAt: "2024-07-15T09:30:00"
  },
  {
    id: 2,
    reservationNumber: "RES12346",
    name: "김철수",
    phoneNumber: "010-2345-6789",
    email: "kim@example.com",
    checkIn: "2024-08-05",
    checkOut: "2024-08-07",
    roomType: "DELUXE",
    resortCode: "RESORT2",
    adults: 2,
    children: 0,
    totalPrice: 400000,
    reservationStatus: "PENDING",
    createdAt: "2024-07-16T10:15:00"
  },
  {
    id: 3,
    reservationNumber: "RES12347",
    name: "이영희",
    phoneNumber: "010-3456-7890",
    email: "lee@example.com",
    checkIn: "2024-08-10",
    checkOut: "2024-08-12",
    roomType: "SUITE",
    resortCode: "RESORT3",
    adults: 3,
    children: 1,
    totalPrice: 600000,
    reservationStatus: "CONFIRMED",
    createdAt: "2024-07-16T14:20:00"
  },
  {
    id: 4,
    reservationNumber: "RES12348",
    name: "박지성",
    phoneNumber: "010-4567-8901",
    email: "park@example.com",
    checkIn: "2024-08-15",
    checkOut: "2024-08-17",
    roomType: "STANDARD",
    resortCode: "RESORT1",
    adults: 2,
    children: 2,
    totalPrice: 350000,
    reservationStatus: "CANCELLED",
    createdAt: "2024-07-17T11:45:00"
  },
  {
    id: 5,
    reservationNumber: "RES12349",
    name: "최민수",
    phoneNumber: "010-5678-9012",
    email: "choi@example.com",
    checkIn: "2024-08-20",
    checkOut: "2024-08-22",
    roomType: "DELUXE",
    resortCode: "RESORT2",
    adults: 2,
    children: 0,
    totalPrice: 420000,
    reservationStatus: "CONFIRMED",
    createdAt: "2024-07-18T09:10:00"
  }
];

const ReservationsList = () => {
  const navigate = useNavigate();
  const [reservations, setReservations] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("ALL");
  const [resortFilter, setResortFilter] = useState("ALL");
  const [loading, setLoading] = useState(true);
  const [sorting, setSorting] = useState({ field: 'createdAt', direction: 'desc' });
  const [selectedReservation, setSelectedReservation] = useState(null);
  const [cancelDialogOpen, setCancelDialogOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  useEffect(() => {
    // 실제 구현에서는 API 호출이 이루어질 것입니다
    setReservations(getReservations());
    setLoading(false);
  }, []);

  const handleSort = (field) => {
    setSorting(prev => ({
      field,
      direction: prev.field === field && prev.direction === 'asc' ? 'desc' : 'asc'
    }));
  };

  const sortedReservations = [...reservations].sort((a, b) => {
    if (sorting.direction === 'asc') {
      return a[sorting.field] > b[sorting.field] ? 1 : -1;
    } else {
      return a[sorting.field] < b[sorting.field] ? 1 : -1;
    }
  });

  const filteredReservations = sortedReservations.filter(reservation => {
    const matchesSearch = 
      reservation.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      reservation.reservationNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
      reservation.email.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesStatus = 
      statusFilter === "ALL" || 
      reservation.reservationStatus === statusFilter;
    
    const matchesResort = 
      resortFilter === "ALL" || 
      reservation.resortCode === resortFilter;
    
    return matchesSearch && matchesStatus && matchesResort;
  });

  // 페이지네이션 계산
  const totalPages = Math.ceil(filteredReservations.length / itemsPerPage);
  const paginatedReservations = filteredReservations.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleCancelReservation = () => {
    // 실제 구현에서는 API 호출이 이루어질 것입니다
    setReservations(prev => 
      prev.map(res => 
        res.id === selectedReservation.id 
          ? { ...res, reservationStatus: "CANCELLED" } 
          : res
      )
    );
    setCancelDialogOpen(false);
  };

  const handleConfirmReservation = (id) => {
    // 실제 구현에서는 API 호출이 이루어질 것입니다
    setReservations(prev => 
      prev.map(res => 
        res.id === id 
          ? { ...res, reservationStatus: "CONFIRMED" } 
          : res
      )
    );
  };

  const getStatusBadge = (status) => {
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

  const getRoomTypeDisplay = (roomType) => {
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

  const getResortDisplay = (resortCode) => {
    switch (resortCode) {
      case 'RESORT1':
        return '리조트 A';
      case 'RESORT2':
        return '리조트 B';
      case 'RESORT3':
        return '리조트 C';
      default:
        return resortCode;
    }
  };

  if (loading) {
    return <div className="flex justify-center items-center h-full">로딩 중...</div>;
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>예약 목록</CardTitle>
        </CardHeader>
        <CardContent>
          {/* 검색 및 필터 */}
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="relative flex-grow">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
              <Input
                type="text"
                placeholder="예약번호, 이름 또는 이메일로 검색"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-8"
              />
            </div>
            <div className="flex flex-col sm:flex-row gap-4">
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-[140px]">
                  <SelectValue placeholder="상태 필터" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectItem value="ALL">모든 상태</SelectItem>
                    <SelectItem value="CONFIRMED">확정</SelectItem>
                    <SelectItem value="PENDING">대기중</SelectItem>
                    <SelectItem value="CANCELLED">취소됨</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>

              <Select value={resortFilter} onValueChange={setResortFilter}>
                <SelectTrigger className="w-[140px]">
                  <SelectValue placeholder="리조트 필터" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectItem value="ALL">모든 리조트</SelectItem>
                    <SelectItem value="RESORT1">리조트 A</SelectItem>
                    <SelectItem value="RESORT2">리조트 B</SelectItem>
                    <SelectItem value="RESORT3">리조트 C</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* 예약 테이블 */}
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[120px] cursor-pointer" onClick={() => handleSort('reservationNumber')}>
                    예약번호
                    {sorting.field === 'reservationNumber' && (
                      sorting.direction === 'asc' ? <ChevronUp className="inline ml-1 h-4 w-4" /> : <ChevronDown className="inline ml-1 h-4 w-4" />
                    )}
                  </TableHead>
                  <TableHead className="cursor-pointer" onClick={() => handleSort('name')}>
                    예약자
                    {sorting.field === 'name' && (
                      sorting.direction === 'asc' ? <ChevronUp className="inline ml-1 h-4 w-4" /> : <ChevronDown className="inline ml-1 h-4 w-4" />
                    )}
                  </TableHead>
                  <TableHead className="hidden md:table-cell cursor-pointer" onClick={() => handleSort('checkIn')}>
                    체크인
                    {sorting.field === 'checkIn' && (
                      sorting.direction === 'asc' ? <ChevronUp className="inline ml-1 h-4 w-4" /> : <ChevronDown className="inline ml-1 h-4 w-4" />
                    )}
                  </TableHead>
                  <TableHead className="hidden md:table-cell">객실 유형</TableHead>
                  <TableHead className="hidden lg:table-cell">리조트</TableHead>
                  <TableHead className="cursor-pointer" onClick={() => handleSort('reservationStatus')}>
                    상태
                    {sorting.field === 'reservationStatus' && (
                      sorting.direction === 'asc' ? <ChevronUp className="inline ml-1 h-4 w-4" /> : <ChevronDown className="inline ml-1 h-4 w-4" />
                    )}
                  </TableHead>
                  <TableHead className="text-right">작업</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {paginatedReservations.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={7} className="text-center py-6 text-gray-500">
                      예약 내역이 없습니다
                    </TableCell>
                  </TableRow>
                ) : (
                  paginatedReservations.map((reservation) => (
                    <TableRow key={reservation.id} className="cursor-pointer hover:bg-gray-50" onClick={() => navigate(`/reservations/${reservation.reservationNumber}`)}>
                      <TableCell className="font-medium">{reservation.reservationNumber}</TableCell>
                      <TableCell>
                        <div>{reservation.name}</div>
                        <div className="text-xs text-gray-500">{reservation.email}</div>
                      </TableCell>
                      <TableCell className="hidden md:table-cell">
                        <div>{reservation.checkIn}</div>
                        <div className="text-xs text-gray-500">{`${reservation.adults}성인, ${reservation.children}아동`}</div>
                      </TableCell>
                      <TableCell className="hidden md:table-cell">{getRoomTypeDisplay(reservation.roomType)}</TableCell>
                      <TableCell className="hidden lg:table-cell">{getResortDisplay(reservation.resortCode)}</TableCell>
                      <TableCell>
                        {getStatusBadge(reservation.reservationStatus)}
                      </TableCell>
                      <TableCell className="text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild onClick={(e) => e.stopPropagation()}>
                            <Button variant="ghost" size="icon">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem onClick={(e) => {
                              e.stopPropagation();
                              navigate(`/reservations/${reservation.reservationNumber}`);
                            }}>
                              상세 정보
                            </DropdownMenuItem>
                            {reservation.reservationStatus === 'PENDING' && (
                              <DropdownMenuItem onClick={(e) => {
                                e.stopPropagation();
                                handleConfirmReservation(reservation.id);
                              }}>
                                예약 확정
                              </DropdownMenuItem>
                            )}
                            {reservation.reservationStatus !== 'CANCELLED' && (
                              <DropdownMenuItem 
                                className="text-red-600"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  setSelectedReservation(reservation);
                                  setCancelDialogOpen(true);
                                }}
                              >
                                예약 취소
                              </DropdownMenuItem>
                            )}
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>

          {/* 페이지네이션 */}
          {totalPages > 1 && (
            <div className="mt-4 flex justify-center">
              <Pagination>
                <PaginationContent>
                  <PaginationItem>
                    <PaginationPrevious 
                      onClick={() => setCurrentPage(page => Math.max(page - 1, 1))}
                      disabled={currentPage === 1}
                    />
                  </PaginationItem>
                  
                  {[...Array(totalPages)].map((_, i) => (
                    <PaginationItem key={i}>
                      <PaginationLink
                        isActive={currentPage === i + 1}
                        onClick={() => setCurrentPage(i + 1)}
                      >
                        {i + 1}
                      </PaginationLink>
                    </PaginationItem>
                  ))}
                  
                  <PaginationItem>
                    <PaginationNext 
                      onClick={() => setCurrentPage(page => Math.min(page + 1, totalPages))}
                      disabled={currentPage === totalPages}
                    />
                  </PaginationItem>
                </PaginationContent>
              </Pagination>
            </div>
          )}
        </CardContent>
      </Card>

      {/* 예약 취소 확인 다이얼로그 */}
      <Dialog open={cancelDialogOpen} onOpenChange={setCancelDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>예약 취소</DialogTitle>
            <DialogDescription>
              이 예약을 취소하시겠습니까? 이 작업은 취소할 수 없습니다.
            </DialogDescription>
          </DialogHeader>
          {selectedReservation && (
            <div className="py-4">
              <div className="space-y-1">
                <p className="text-sm font-medium">예약번호: {selectedReservation.reservationNumber}</p>
                <p className="text-sm font-medium">예약자: {selectedReservation.name}</p>
                <p className="text-sm text-gray-500">체크인: {selectedReservation.checkIn}</p>
                <p className="text-sm text-gray-500">체크아웃: {selectedReservation.checkOut}</p>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setCancelDialogOpen(false)}>
              취소
            </Button>
            <Button variant="destructive" onClick={handleCancelReservation}>
              예약 취소 확인
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ReservationsList;