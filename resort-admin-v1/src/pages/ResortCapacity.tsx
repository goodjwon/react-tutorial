// src/pages/ResortCapacity.jsx
import React, { useState, useEffect } from 'react';
import { 
  Calendar as CalendarIcon, 
  Search,
  Filter,
  Hotel,
  Users,
  CreditCard,
  Check,
  X
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';
import {
  Popover,
  PopoverContent,
  PopoverTrigger
} from '@/components/ui/popover';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Calendar } from '@/components/ui/calendar';
import { format } from 'date-fns';
import { ko } from 'date-fns/locale';

// 가상 데이터 (API 응답 시뮬레이션)
const getResortCapacity = (_resortCode: string, _startDate: string, _endDate: string) => {
  // 실제 API 호출 시뮬레이션
  return [
    {
      date: '2024-08-01',
      roomTypes: [
        { 
          roomType: 'STANDARD', 
          capacity: 20, 
          occupied: 15, 
          available: 5, 
          price: 150000, 
          season: '성수기' 
        },
        { 
          roomType: 'DELUXE', 
          capacity: 15, 
          occupied: 10, 
          available: 5, 
          price: 200000, 
          season: '성수기' 
        },
        { 
          roomType: 'SUITE', 
          capacity: 5, 
          occupied: 3, 
          available: 2, 
          price: 300000, 
          season: '성수기' 
        }
      ]
    },
    {
      date: '2024-08-02',
      roomTypes: [
        { 
          roomType: 'STANDARD', 
          capacity: 20, 
          occupied: 18, 
          available: 2, 
          price: 150000, 
          season: '성수기' 
        },
        { 
          roomType: 'DELUXE', 
          capacity: 15, 
          occupied: 12, 
          available: 3, 
          price: 200000, 
          season: '성수기' 
        },
        { 
          roomType: 'SUITE', 
          capacity: 5, 
          occupied: 4, 
          available: 1, 
          price: 300000, 
          season: '성수기' 
        }
      ]
    },
    {
      date: '2024-08-03',
      roomTypes: [
        { 
          roomType: 'STANDARD', 
          capacity: 20, 
          occupied: 17, 
          available: 3, 
          price: 150000, 
          season: '성수기' 
        },
        { 
          roomType: 'DELUXE', 
          capacity: 15, 
          occupied: 15, 
          available: 0, 
          price: 200000, 
          season: '성수기' 
        },
        { 
          roomType: 'SUITE', 
          capacity: 5, 
          occupied: 5, 
          available: 0, 
          price: 300000, 
          season: '성수기' 
        }
      ]
    },
    {
      date: '2024-08-04',
      roomTypes: [
        { 
          roomType: 'STANDARD', 
          capacity: 20, 
          occupied: 10, 
          available: 10, 
          price: 150000, 
          season: '성수기' 
        },
        { 
          roomType: 'DELUXE', 
          capacity: 15, 
          occupied: 8, 
          available: 7, 
          price: 200000, 
          season: '성수기' 
        },
        { 
          roomType: 'SUITE', 
          capacity: 5, 
          occupied: 2, 
          available: 3, 
          price: 300000, 
          season: '성수기' 
        }
      ]
    },
    {
      date: '2024-08-05',
      roomTypes: [
        { 
          roomType: 'STANDARD', 
          capacity: 20, 
          occupied: 8, 
          available: 12, 
          price: 120000, 
          season: '준성수기' 
        },
        { 
          roomType: 'DELUXE', 
          capacity: 15, 
          occupied: 5, 
          available: 10, 
          price: 170000, 
          season: '준성수기' 
        },
        { 
          roomType: 'SUITE', 
          capacity: 5, 
          occupied: 1, 
          available: 4, 
          price: 250000, 
          season: '준성수기' 
        }
      ]
    }
  ];
};

const getResortDetails = () => [
  { code: 'RESORT1', name: '리조트 A', location: '제주도', rooms: 40 },
  { code: 'RESORT2', name: '리조트 B', location: '강원도', rooms: 30 },
  { code: 'RESORT3', name: '리조트 C', location: '부산', rooms: 50 }
];

const getRoomDetails = (_resortCode: string, roomType: string) => {
  // 실제 API 호출 시뮬레이션
  return {
    roomType: roomType,
    name: roomType === 'STANDARD' ? '스탠다드 룸' : roomType === 'DELUXE' ? '디럭스 룸' : '스위트 룸',
    description: '아름다운 전망이 있는 편안한 객실입니다.',
    amenities: ['무선 인터넷', '에어컨', '미니바', 'TV', '욕실'],
    maxOccupancy: roomType === 'STANDARD' ? 2 : roomType === 'DELUXE' ? 3 : 4,
    size: roomType === 'STANDARD' ? '25㎡' : roomType === 'DELUXE' ? '35㎡' : '50㎡',
    bedType: roomType === 'STANDARD' ? '퀸 사이즈 1개' : roomType === 'DELUXE' ? '킹 사이즈 1개' : '킹 사이즈 1개, 싱글 1개',
    images: ['/path/to/image1.jpg', '/path/to/image2.jpg']
  };
};

const getRoomTypeDisplay = (roomType: 'STANDARD' | 'DELUXE' | 'SUITE') => {
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

const formatPrice = (price: number) => {
  return new Intl.NumberFormat('ko-KR', {
    style: 'currency',
    currency: 'KRW',
    maximumFractionDigits: 0
  }).format(price);
};

const ResortCapacity = () => {
  const [selectedResort, setSelectedResort] = useState('RESORT1');
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date(new Date().setDate(new Date().getDate() + 7)));
  const [capacityData, setCapacityData] = useState<Array<{ date: string; roomTypes: Array<{ roomType: string; capacity: number; occupied: number; available: number; price: number; season: string; }> }>>([]);
  const [resorts, setResorts] = useState<Array<{ code: string; name: string; location: string; rooms: number; }>>([]);
  const [loading, setLoading] = useState(true);
  const [roomTypeFilter, setRoomTypeFilter] = useState('ALL');
  const [selectedRoomDetails, setSelectedRoomDetails] = useState<{ roomType: string; name: string; description: string; amenities: string[]; maxOccupancy: number; size: string; bedType: string; images: string[]; } | null>(null);
  const [viewType, setViewType] = useState('table');

  useEffect(() => {
    // 실제 구현에서는 API 호출이 이루어질 것입니다
    setResorts(getResortDetails());
    
    const formattedStartDate = format(startDate, 'yyyyMMdd');
    const formattedEndDate = format(endDate, 'yyyyMMdd');
    
    const data = getResortCapacity(selectedResort, formattedStartDate, formattedEndDate);
    setCapacityData(data);
    setLoading(false);
  }, [selectedResort, startDate, endDate]);

  const handleRoomTypeClick = (resortCode: string, roomType: 'STANDARD' | 'DELUXE' | 'SUITE') => {
    const details = getRoomDetails(resortCode, roomType);
    setSelectedRoomDetails(details);
  };

  const filteredCapacityData = capacityData.map(day => {
    if (roomTypeFilter === 'ALL') {
      return day;
    }
    
    return {
      ...day,
      roomTypes: day.roomTypes.filter(room => room.roomType === roomTypeFilter)
    };
  });

  const getAvailabilityColor = (available: number, capacity: number) => {
    const ratio = available / capacity;
    if (ratio === 0) return 'bg-red-100 text-red-800';
    if (ratio < 0.2) return 'bg-orange-100 text-orange-800';
    if (ratio < 0.5) return 'bg-amber-100 text-amber-800';
    return 'bg-green-100 text-green-800';
  };

  if (loading) {
    return <div className="flex justify-center items-center h-full">로딩 중...</div>;
  }

  return (
    <div className="space-y-6">
      {/* 검색 필터 */}
      <Card>
        <CardHeader>
          <CardTitle>객실 현황 조회</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-4">
            <div className="space-y-2">
              <Label htmlFor="resort">리조트 선택</Label>
              <Select value={selectedResort} onValueChange={setSelectedResort}>
                <SelectTrigger id="resort">
                  <SelectValue placeholder="리조트 선택" />
                </SelectTrigger>
                <SelectContent className="select-content">
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
              <Label>체크인 날짜</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className="w-full justify-start text-left font-normal"
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {format(startDate, 'PPP', { locale: ko })}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0 popover-content">
                  <Calendar
                    mode="single"
                    selected={startDate}
                    onSelect={(date) => date && setStartDate(date)}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>
            
            <div className="space-y-2">
              <Label>체크아웃 날짜</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className="w-full justify-start text-left font-normal"
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {format(endDate, 'PPP', { locale: ko })}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0 popover-content">
                  <Calendar
                    mode="single"
                    selected={endDate}
                    onSelect={(date) => date && setEndDate(date)}
                    initialFocus
                    disabled={(date) => date < startDate}
                  />
                </PopoverContent>
              </Popover>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="roomType">객실 유형</Label>
              <Select value={roomTypeFilter} onValueChange={setRoomTypeFilter}>
                <SelectTrigger id="roomType">
                  <SelectValue placeholder="객실 유형 선택" />
                </SelectTrigger>
                <SelectContent className="select-content">
                  <SelectGroup>
                    <SelectItem value="ALL">모든 객실</SelectItem>
                    <SelectItem value="STANDARD">스탠다드</SelectItem>
                    <SelectItem value="DELUXE">디럭스</SelectItem>
                    <SelectItem value="SUITE">스위트</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* 뷰 타입 선택 */}
      <div className="flex flex-col w-full">
        <Tabs value={viewType} onValueChange={setViewType} className="w-full">
          <div className="flex justify-end mb-4">
            <TabsList>
              <TabsTrigger value="table">테이블 보기</TabsTrigger>
              <TabsTrigger value="grid">그리드 보기</TabsTrigger>
            </TabsList>
          </div>

          {/* 테이블 뷰 */}
          <TabsContent value="table" className="mt-0 w-full">
            <Card className="w-full">
              <CardHeader>
                <CardTitle className="text-left">
                  {resorts.find(r => r.code === selectedResort)?.name} 객실 현황
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="rounded-md border w-full">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="w-[150px]">날짜</TableHead>
                        <TableHead>객실 유형</TableHead>
                        <TableHead className="text-right">가격</TableHead>
                        <TableHead className="text-center">총 객실 수</TableHead>
                        <TableHead className="text-center">예약됨</TableHead>
                        <TableHead className="text-center">예약 가능</TableHead>
                        <TableHead>시즌</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredCapacityData.length === 0 ? (
                        <TableRow>
                          <TableCell colSpan={7} className="text-center py-6 text-gray-500">
                            데이터가 없습니다
                          </TableCell>
                        </TableRow>
                      ) : (
                        filteredCapacityData.flatMap((day, dayIndex) => 
                          day.roomTypes.map((room, roomIndex) => (
                            <TableRow 
                              key={`${dayIndex}-${roomIndex}`}
                              className="cursor-pointer hover:bg-gray-50"
                              onClick={() => handleRoomTypeClick(selectedResort, room.roomType as 'STANDARD' | 'DELUXE' | 'SUITE')}
                            >
                              {roomIndex === 0 && (
                                <TableCell rowSpan={day.roomTypes.length} className="font-medium">
                                  {day.date}
                                </TableCell>
                              )}
                              <TableCell>{getRoomTypeDisplay(room.roomType as 'STANDARD' | 'DELUXE' | 'SUITE')}</TableCell>
                              <TableCell className="text-right font-medium">
                                {formatPrice(room.price)}
                              </TableCell>
                              <TableCell className="text-center">{room.capacity}</TableCell>
                              <TableCell className="text-center">{room.occupied}</TableCell>
                              <TableCell className="text-center">
                                <Badge className={getAvailabilityColor(room.available, room.capacity)}>
                                  {room.available}
                                </Badge>
                              </TableCell>
                              <TableCell>{room.season}</TableCell>
                            </TableRow>
                          ))
                        )
                      )}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* 그리드 뷰 */}
          <TabsContent value="grid" className="mt-0">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {filteredCapacityData.map((day, dayIndex) => (
                <Card key={dayIndex}>
                  <CardHeader>
                    <CardTitle className="text-lg">{day.date}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {day.roomTypes.map((room, roomIndex) => (
                        <div 
                          key={roomIndex} 
                          className="p-4 border rounded-md cursor-pointer hover:bg-gray-50"
                          onClick={() => handleRoomTypeClick(selectedResort, room.roomType as 'STANDARD' | 'DELUXE' | 'SUITE')}
                        >
                          <div className="flex justify-between items-center mb-2">
                            <h3 className="font-medium">{getRoomTypeDisplay(room.roomType as 'STANDARD' | 'DELUXE' | 'SUITE')}</h3>
                            <Badge className={getAvailabilityColor(room.available, room.capacity)}>
                              {room.available}/{room.capacity} 가능
                            </Badge>
                          </div>
                          <div className="flex justify-between text-sm">
                            <span className="text-gray-500">시즌: {room.season}</span>
                            <span className="font-medium">{formatPrice(room.price)}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>

      {/* 객실 상세 정보 */}
      {selectedRoomDetails && (
        <Card>
          <CardHeader>
            <CardTitle>{selectedRoomDetails.name} 상세 정보</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-6 md:grid-cols-2">
              <div className="space-y-4">
                <div>
                  <h4 className="font-medium mb-2">객실 설명</h4>
                  <p className="text-gray-600">{selectedRoomDetails.description}</p>
                </div>
                <div>
                  <h4 className="font-medium mb-2">편의 시설</h4>
                  <ul className="list-disc list-inside text-gray-600">
                    {selectedRoomDetails.amenities.map((amenity, index) => (
                      <li key={index}>{amenity}</li>
                    ))}
                  </ul>
                </div>
              </div>
              <div className="space-y-4">
                <div>
                  <h4 className="font-medium mb-2">객실 정보</h4>
                  <ul className="space-y-2 text-gray-600">
                    <li>최대 수용 인원: {selectedRoomDetails.maxOccupancy}명</li>
                    <li>객실 크기: {selectedRoomDetails.size}</li>
                    <li>침대 구성: {selectedRoomDetails.bedType}</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-medium mb-2">객실 사진</h4>
                  <div className="grid grid-cols-2 gap-2">
                    {selectedRoomDetails.images.map((image, index) => (
                      <div key={index} className="aspect-video bg-gray-100 rounded-md">
                        {/* 실제 이미지가 있다면 여기에 표시 */}
                        <div className="w-full h-full flex items-center justify-center text-gray-400">
                          이미지 {index + 1}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default ResortCapacity;