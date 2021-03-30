#include <stdio.h>
void swap1(int x, int y){
	int tmp;
	tmp = x;
	x = y;
	y = tmp;
	printf("x = %d, y = %d\n", x, y);
}

void swap2(int *x, int *y){
	int tmp;
	tmp = *x;
	*x = *y;
	*y = tmp;
}

int main(){
	int a = 3;
	int b = 5;
	swap1(a, b); //浠ュ線鐨勫�间紶閫掞紝涓嶄細鏀瑰彉main鍑芥暟涓彉閲忕殑鍊�
	printf("a = %d, b = %d\n", a, b);	//a渚濇棫涓�3锛宐渚濇棫涓�5

	a = 3;
	b = 5;
	swap2(&a, &b); //浣跨敤鎸囬拡浼犻�掑湴鍧�锛宻wap2鍑芥暟浼氶�氳繃鍦板潃鍘昏闂彉閲忥紝浠庤�岃繘琛屾敼鍙�
	printf("a2 = %d, b2 = %d\n", a, b);		//a鍙樻垚5锛宐鍙樻垚3

	return 0;
}

