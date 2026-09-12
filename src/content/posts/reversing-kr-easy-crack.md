---
title: [Reversing.kr] Easy Crack 풀이
date: 2026-09-12
summary: Reversing.kr Easy Crack 풀이
category: Reversing
tags: [Reversing]
---

## 접근법
1. 파일을 기드라로 로드 후 올바르지 않은 값을 입력하면 출력되는 **Incorrect Password**를 검색하여 문자열을 처리하는 함수를 찾는다.
2. 기드라가 생성한 의사코드가 난해하므로 타입 및 이름을 수정한다.
3. 플래그를 획득한다.

## 실제
다음은 위 접근법을 통해 수행해본 결과이다.
```c
void __cdecl FUN_00401080(HWND param_1)

{
  byte bVar1;
  byte *pbVar2;
  int iVar3;
  char *pcVar4;
  bool bVar5;
  CHAR local_64;
  char local_63;
  char local_62;
  char acStack_61 [97];
  
  local_64 = '\0';
  pcVar4 = &local_63;
  for (iVar3 = 0x18; iVar3 != 0; iVar3 = iVar3 + -1) {
    pcVar4[0] = '\0';
    pcVar4[1] = '\0';
    pcVar4[2] = '\0';
    pcVar4[3] = '\0';
    pcVar4 = pcVar4 + 4;
  }
  pcVar4[0] = '\0';
  pcVar4[1] = '\0';
  pcVar4[2] = '\0';
  GetDlgItemTextA(param_1,1000,&local_64,100);
  if (local_63 == 'a') {
    iVar3 = _strncmp(&local_62,&DAT_00406078,2);
    if (iVar3 == 0) {
      pcVar4 = s_AGR3versing_0040606a;
      pbVar2 = (byte *)(acStack_61 + 1);
      do {
        pcVar4 = pcVar4 + 2;
        bVar1 = *pbVar2;
        bVar5 = bVar1 < (byte)*pcVar4;
        if (bVar1 != *pcVar4) {
LAB_00401102:
          iVar3 = (1 - (uint)bVar5) - (uint)(bVar5 != 0);
          goto LAB_00401107;
        }
        if (bVar1 == 0) break;
        bVar1 = pbVar2[1];
        bVar5 = bVar1 < (byte)pcVar4[1];
        if (bVar1 != pcVar4[1]) goto LAB_00401102;
        pbVar2 = pbVar2 + 2;
      } while (bVar1 != 0);
      iVar3 = 0;
LAB_00401107:
      if ((iVar3 == 0) && (local_64 == 'E')) {
        MessageBoxA(param_1,s_Congratulation_!!_00406044,s_EasyCrackMe_00406058,0x40);
        EndDialog(param_1,0);
        return;
      }
    }
  }
  MessageBoxA(param_1,s_Incorrect_Password_00406030,s_EasyCrackMe_00406058,0x10);
  return;
}
```
**GetDlgItemTextA** 함수 호출을 통해 100바이트 크기의 버퍼를 받지만 local_64, 63, 62 등 쪼개어 인식함을 볼 수 있다. 이를 해결하기 위해 local_64를 char[100]으로 지정해주었다.

또한 버퍼를 0으로 초기화하는 루프 및 컴파일러 최적화를 통해 인라인화 된 strcmp 함수를 가독있게 변경해주었다.

문자열 라벨의 경계를 잘못잡은 부분로 해결해주었다.
이는 ```pcVar4 = pcVar4 + 2;```를 확인해 앞 2바이트를 건너뛰는 것으로 확인할 수 있다.

가독성있게 개선한 코드는 다음과 같다.
```c
char input[100] = { 0 };

GetDlgItemTextA(hDlg, 1000, input, 100);

if (input[0] == 'E' &&
    input[1] == 'a' &&
    _strncmp(&input[2], &DAT_00406078, 2) == 0 &&
    strcmp(&input[4], "R3versing") == 0)
{
    MessageBoxA(hDlg, "Congratulation !!", "EasyCrackMe", MB_ICONASTERISK);
    EndDialog(hDlg, 0);
    return;
}

MessageBoxA(hDlg, "Incorrect Password", "EasyCrackMe", MB_ICONHAND);
```

위 로직의 각 조건을 만족하는 값을 찾으면, 다음과 같은 플래그를 도출할 수 있다.

이때, ``DAT_00406078``은 5y이다.

``local_64``는 E를 기대하고, ``local_63``은 a를 기대한다.

또한 ``local_62``는 ``DAT_00406078``의 데이터는 5y를 기대한다.

그 이후의 데이터는 ``pcVar4 + 2`` 위치의 데이터를 기대한다. 이는 R3versing으로 플래그는
**Ea5yR3versing**이다.