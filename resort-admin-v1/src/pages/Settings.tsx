// src/pages/Settings.jsx
import React, { useState, useEffect } from 'react';
import {
  Save, 
  Plus,
  Trash,
  Edit,
  CheckCircle,
  Mail,
  MessageSquare,
  Settings as SettingsIcon,
  Hotel
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger
} from '@/components/ui/tabs';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogClose
} from '@/components/ui/dialog';
import {
  Alert,
  AlertDescription,
  AlertTitle
} from '@/components/ui/alert';
import { Badge } from '@/components/ui/badge';

interface Settings {
  resorts: Array<{
    id: number;
    code: string;
    name: string;
    location: string;
    apiUrl: string;
    apiKey: string;
    active: boolean;
  }>;
  emailSettings: {
    smtpServer: string;
    smtpPort: number;
    senderEmail: string;
    senderName: string;
    username: string;
    password: string;
  };
  smsSettings: {
    providerUrl: string;
    apiKey: string;
    senderNumber: string;
  };
  systemSettings: {
    raffleTime: string;
    reminderDays: number;
  };
}

// 가상 데이터 (API 응답 시뮬레이션)
const getSettings = () => ({
  resorts: [
    { 
      id: 1,
      code: 'RESORT1', 
      name: '리조트 A', 
      location: '제주도', 
      apiUrl: 'https://api.resort-a.com',
      apiKey: 'ak_resort1_xxxxxxxxxxxx',
      active: true
    },
    { 
      id: 2,
      code: 'RESORT2', 
      name: '리조트 B', 
      location: '강원도', 
      apiUrl: 'https://api.resort-b.com',
      apiKey: 'ak_resort2_xxxxxxxxxxxx',
      active: true
    },
    { 
      id: 3,
      code: 'RESORT3', 
      name: '리조트 C', 
      location: '부산', 
      apiUrl: 'https://api.resort-c.com',
      apiKey: 'ak_resort3_xxxxxxxxxxxx',
      active: true
    }
  ],
  emailSettings: {
    smtpServer: 'smtp.example.com',
    smtpPort: 587,
    senderEmail: 'noreply@resortapp.com',
    senderName: '리조트 예약 시스템',
    username: 'api_user',
    password: '********'
  },
  smsSettings: {
    providerUrl: 'https://api.sms-provider.com',
    apiKey: 'sms_api_xxxxxxxxxxxx',
    senderNumber: '01012345678'
  },
  systemSettings: {
    raffleTime: '10:00',
    reminderDays: 2
  }
});

const Settings = () => {
  const [settings, setSettings] = useState<Settings>({
    resorts: [],
    emailSettings: {
      smtpServer: '',
      smtpPort: 587,
      senderEmail: '',
      senderName: '',
      username: '',
      password: ''
    },
    smsSettings: {
      providerUrl: '',
      apiKey: '',
      senderNumber: ''
    },
    systemSettings: {
      raffleTime: '10:00',
      reminderDays: 2
    }
  });
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('resorts');
  const [editResortDialogOpen, setEditResortDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [selectedResort, setSelectedResort] = useState<Settings['resorts'][0] | null>(null);
  const [successMessage, setSuccessMessage] = useState('');
  
  // 리조트 편집을 위한 폼 상태
  const [editForm, setEditForm] = useState({
    name: '',
    code: '',
    location: '',
    apiUrl: '',
    apiKey: '',
    active: true
  });

  useEffect(() => {
    // 실제 구현에서는 API 호출이 이루어질 것입니다
    setSettings(getSettings());
    setLoading(false);
  }, []);

  useEffect(() => {
    if (selectedResort) {
      setEditForm({
        name: selectedResort.name,
        code: selectedResort.code,
        location: selectedResort.location,
        apiUrl: selectedResort.apiUrl,
        apiKey: selectedResort.apiKey,
        active: selectedResort.active
      });
    } else {
      setEditForm({
        name: '',
        code: '',
        location: '',
        apiUrl: '',
        apiKey: '',
        active: true
      });
    }
  }, [selectedResort]);

  const handleSaveResort = () => {
    // 필드 검증
    if (!editForm.name || !editForm.code || !editForm.location || !editForm.apiUrl || !editForm.apiKey) {
      alert('모든 필드를 입력해주세요.');
      return;
    }

    // 실제 구현에서는 API 호출이 이루어질 것입니다
    if (selectedResort) {
      // 리조트 수정
      setSettings((prev: Settings) => ({
        ...prev,
        resorts: prev.resorts.map(resort => 
          resort.id === selectedResort.id ? { ...resort, ...editForm } : resort
        )
      }));
      setSuccessMessage('리조트 정보가 성공적으로 업데이트되었습니다.');
    } else {
      // 새 리조트 추가
      const newResort = {
        id: (settings?.resorts?.length ?? 0) + 1,
        ...editForm
      };
      setSettings((prev: Settings) => ({
        ...prev,
        resorts: [...prev.resorts, newResort]
      }));
      setSuccessMessage('새 리조트가 성공적으로 추가되었습니다.');
    }
    setEditResortDialogOpen(false);
    setSelectedResort(null);

    // 3초 후에 성공 메시지 삭제
    setTimeout(() => {
      setSuccessMessage('');
    }, 3000);
  };

  const handleDeleteResort = () => {
    // 실제 구현에서는 API 호출이 이루어질 것입니다
    setSettings((prev: Settings) => ({
      ...prev,
      resorts: prev.resorts.filter(resort => resort.id !== selectedResort?.id)
    }));
    setDeleteDialogOpen(false);
    setSelectedResort(null);
    setSuccessMessage('리조트가 삭제되었습니다.');

    // 3초 후에 성공 메시지 삭제
    setTimeout(() => {
      setSuccessMessage('');
    }, 3000);
  };

  const handleToggleResortActive = (resortId: number, active: boolean) => {
    setSettings((prev: Settings) => ({
      ...prev,
      resorts: prev.resorts.map(resort => 
        resort.id === resortId ? { ...resort, active } : resort
      )
    }));
  };

  const handleSaveEmailSettings = () => {
    // 실제 구현에서는 API 호출이 이루어질 것입니다
    setSuccessMessage('이메일 설정이 저장되었습니다.');
    setTimeout(() => {
      setSuccessMessage('');
    }, 3000);
  };

  const handleSaveSmsSettings = () => {
    // 실제 구현에서는 API 호출이 이루어질 것입니다
    setSuccessMessage('SMS 설정이 저장되었습니다.');
    setTimeout(() => {
      setSuccessMessage('');
    }, 3000);
  };

  const handleSaveSystemSettings = () => {
    // 실제 구현에서는 API 호출이 이루어질 것입니다
    setSuccessMessage('시스템 설정이 저장되었습니다.');
    setTimeout(() => {
      setSuccessMessage('');
    }, 3000);
  };

  if (loading) {
    return <div className="flex justify-center items-center h-full">로딩 중...</div>;
  }

  return (
    <div className="space-y-6">
      {/* 상단 헤더 */}
      <div>
        <h2 className="text-2xl font-bold">시스템 설정</h2>
        <p className="text-gray-500">시스템 전반적인 설정을 관리합니다.</p>
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
      <Tabs defaultValue="resorts" value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid grid-cols-3 w-full max-w-md">
          <TabsTrigger value="resorts">리조트 관리</TabsTrigger>
          <TabsTrigger value="notification">알림 설정</TabsTrigger>
          <TabsTrigger value="system">시스템 설정</TabsTrigger>
        </TabsList>

        {/* 리조트 관리 탭 */}
        <TabsContent value="resorts" className="space-y-6">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-medium">리조트 목록</h3>
            <Button onClick={() => {
              setSelectedResort(null);
              setEditResortDialogOpen(true);
            }}>
              <Plus className="mr-2 h-4 w-4" />
              새 리조트 추가
            </Button>
          </div>

          <div className="space-y-4">
            {settings.resorts.map(resort => (
              <Card key={resort.id}>
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-center">
                    <CardTitle>{resort.name}</CardTitle>
                    <Badge variant={resort.active ? "default" : "outline"}>
                      {resort.active ? "활성화" : "비활성화"}
                    </Badge>
                  </div>
                  <CardDescription>{resort.location} | 코드: {resort.code}</CardDescription>
                </CardHeader>
                <CardContent className="pb-2">
                  <div className="space-y-2">
                    <p className="text-sm text-gray-500">API 정보</p>
                    <p className="font-mono text-xs mt-1">URL: {resort.apiUrl}</p>
                    <p className="font-mono text-xs mt-1">API Key: {resort.apiKey.slice(0, 10)}...</p>
                  </div>
                </CardContent>
                <div className="px-6 py-4 border-t flex justify-between items-center">
                  <div className="flex items-center space-x-2">
                    <Switch 
                      id={`resort-active-${resort.id}`}
                      checked={resort.active}
                      onCheckedChange={(checked) => handleToggleResortActive(resort.id, checked)}
                    />
                    <Label htmlFor={`resort-active-${resort.id}`}>활성화</Label>
                  </div>
                  <div className="space-x-2">
                    <Button 
                      variant="outline" 
                      className="text-red-600 border-red-200 hover:bg-red-50"
                      onClick={() => {
                        setSelectedResort(resort);
                        setDeleteDialogOpen(true);
                      }}
                    >
                      <Trash className="mr-2 h-4 w-4" />
                      삭제
                    </Button>
                    <Button 
                      variant="outline"
                      onClick={() => {
                        setSelectedResort(resort);
                        setEditResortDialogOpen(true);
                      }}
                    >
                      <Edit className="mr-2 h-4 w-4" />
                      수정
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* 알림 설정 탭 */}
        <TabsContent value="notification" className="space-y-6">
          <Tabs defaultValue="email">
            <TabsList>
              <TabsTrigger value="email">이메일 설정</TabsTrigger>
              <TabsTrigger value="sms">SMS 설정</TabsTrigger>
            </TabsList>
            
            {/* 이메일 설정 */}
            <TabsContent value="email" className="space-y-6 pt-4">
              <Card>
                <CardHeader>
                  <CardTitle>이메일 서버 설정</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="smtpServer">SMTP 서버</Label>
                      <Input 
                        id="smtpServer" 
                        value={settings.emailSettings.smtpServer}
                        onChange={(e) => setSettings(prev => ({
                          ...prev,
                          emailSettings: {
                            ...prev.emailSettings,
                            smtpServer: e.target.value
                          }
                        }))}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="smtpPort">SMTP 포트</Label>
                      <Input 
                        id="smtpPort" 
                        type="number"
                        value={settings.emailSettings.smtpPort}
                        onChange={(e) => setSettings(prev => ({
                          ...prev,
                          emailSettings: {
                            ...prev.emailSettings,
                            smtpPort: parseInt(e.target.value)
                          }
                        }))}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="senderEmail">발신자 이메일</Label>
                      <Input 
                        id="senderEmail" 
                        value={settings.emailSettings.senderEmail}
                        onChange={(e) => setSettings(prev => ({
                          ...prev,
                          emailSettings: {
                            ...prev.emailSettings,
                            senderEmail: e.target.value
                          }
                        }))}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="senderName">발신자 이름</Label>
                      <Input 
                        id="senderName" 
                        value={settings.emailSettings.senderName}
                        onChange={(e) => setSettings(prev => ({
                          ...prev,
                          emailSettings: {
                            ...prev.emailSettings,
                            senderName: e.target.value
                          }
                        }))}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="username">사용자명</Label>
                      <Input 
                        id="username" 
                        value={settings.emailSettings.username}
                        onChange={(e) => setSettings(prev => ({
                          ...prev,
                          emailSettings: {
                            ...prev.emailSettings,
                            username: e.target.value
                          }
                        }))}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="password">비밀번호</Label>
                      <Input 
                        id="password" 
                        type="password"
                        value={settings.emailSettings.password}
                        onChange={(e) => setSettings(prev => ({
                          ...prev,
                          emailSettings: {
                            ...prev.emailSettings,
                            password: e.target.value
                          }
                        }))}
                      />
                    </div>
                  </div>
                </CardContent>
                <div className="px-6 py-4 border-t flex justify-end">
                  <Button onClick={handleSaveEmailSettings}>
                    <Save className="mr-2 h-4 w-4" />
                    저장
                  </Button>
                </div>
              </Card>
            </TabsContent>
            
            {/* SMS 설정 */}
            <TabsContent value="sms" className="space-y-6 pt-4">
              <Card>
                <CardHeader>
                  <CardTitle>SMS 서비스 설정</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="providerUrl">API URL</Label>
                      <Input 
                        id="providerUrl" 
                        value={settings.smsSettings.providerUrl}
                        onChange={(e) => setSettings(prev => ({
                          ...prev,
                          smsSettings: {
                            ...prev.smsSettings,
                            providerUrl: e.target.value
                          }
                        }))}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="apiKey">API Key</Label>
                      <Input 
                        id="apiKey" 
                        value={settings.smsSettings.apiKey}
                        onChange={(e) => setSettings(prev => ({
                          ...prev,
                          smsSettings: {
                            ...prev.smsSettings,
                            apiKey: e.target.value
                          }
                        }))}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="senderNumber">발신자 번호</Label>
                      <Input 
                        id="senderNumber" 
                        value={settings.smsSettings.senderNumber}
                        onChange={(e) => setSettings(prev => ({
                          ...prev,
                          smsSettings: {
                            ...prev.smsSettings,
                            senderNumber: e.target.value
                          }
                        }))}
                      />
                    </div>
                  </div>
                </CardContent>
                <div className="px-6 py-4 border-t flex justify-end">
                  <Button onClick={handleSaveSmsSettings}>
                    <Save className="mr-2 h-4 w-4" />
                    저장
                  </Button>
                </div>
              </Card>
            </TabsContent>
          </Tabs>
        </TabsContent>

        {/* 시스템 설정 탭 */}
        <TabsContent value="system" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>시스템 일반 설정</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="raffleTime">추첨 실행 시간</Label>
                  <Input 
                    id="raffleTime" 
                    type="time"
                    value={settings.systemSettings.raffleTime}
                    onChange={(e) => setSettings(prev => ({
                      ...prev,
                      systemSettings: {
                        ...prev.systemSettings,
                        raffleTime: e.target.value
                      }
                    }))}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="reminderDays">체크인 알림 발송 (몇일 전)</Label>
                  <Input 
                    id="reminderDays" 
                    type="number"
                    min={1}
                    max={7}
                    value={settings.systemSettings.reminderDays}
                    onChange={(e) => setSettings(prev => ({
                      ...prev,
                      systemSettings: {
                        ...prev.systemSettings,
                        reminderDays: parseInt(e.target.value)
                      }
                    }))}
                  />
                </div>
              </div>
            </CardContent>
            <div className="px-6 py-4 border-t flex justify-end">
              <Button onClick={handleSaveSystemSettings}>
                <Save className="mr-2 h-4 w-4" />
                저장
              </Button>
            </div>
          </Card>
        </TabsContent>
      </Tabs>

      {/* 리조트 추가/수정 다이얼로그 */}
      <Dialog open={editResortDialogOpen} onOpenChange={setEditResortDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{selectedResort ? '리조트 수정' : '새 리조트 추가'}</DialogTitle>
            <DialogDescription>
              {selectedResort 
                ? '리조트 정보를 수정하고 저장하세요.' 
                : '새 리조트의 정보를 입력하세요.'}
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="edit-name">리조트 이름</Label>
              <Input 
                id="edit-name" 
                value={editForm.name}
                onChange={(e) => setEditForm(prev => ({ ...prev, name: e.target.value }))}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="edit-code">리조트 코드</Label>
              <Input 
                id="edit-code" 
                value={editForm.code}
                onChange={(e) => setEditForm(prev => ({ ...prev, code: e.target.value }))}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="edit-location">위치</Label>
              <Input 
                id="edit-location" 
                value={editForm.location}
                onChange={(e) => setEditForm(prev => ({ ...prev, location: e.target.value }))}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="edit-apiUrl">API URL</Label>
              <Input 
                id="edit-apiUrl" 
                value={editForm.apiUrl}
                onChange={(e) => setEditForm(prev => ({ ...prev, apiUrl: e.target.value }))}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="edit-apiKey">API Key</Label>
              <Input 
                id="edit-apiKey" 
                value={editForm.apiKey}
                onChange={(e) => setEditForm(prev => ({ ...prev, apiKey: e.target.value }))}
              />
            </div>

            <div className="flex items-center space-x-2">
              <Switch 
                id="edit-active"
                checked={editForm.active}
                onCheckedChange={(checked) => setEditForm(prev => ({ ...prev, active: checked }))}
              />
              <Label htmlFor="edit-active">활성화</Label>
            </div>
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">취소</Button>
            </DialogClose>
            <Button onClick={handleSaveResort}>
              저장
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* 삭제 확인 다이얼로그 */}
      <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>리조트 삭제</DialogTitle>
            <DialogDescription>
              이 리조트를 삭제하시겠습니까? 이 작업은 취소할 수 없습니다.
            </DialogDescription>
          </DialogHeader>
          {selectedResort && (
            <div className="py-4">
              <div className="space-y-1">
                <p className="text-sm font-medium">리조트 이름: {selectedResort.name}</p>
                <p className="text-sm font-medium">코드: {selectedResort.code}</p>
                <p className="text-sm text-gray-500">위치: {selectedResort.location}</p>
              </div>
            </div>
          )}
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">취소</Button>
            </DialogClose>
            <Button variant="destructive" onClick={handleDeleteResort}>
              삭제 확인
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Settings;