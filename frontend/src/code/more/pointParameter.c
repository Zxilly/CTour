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
	swap1(a, b); //以往的值传递，不会改变main函数中变量的值
	printf("a = %d, b = %d\n", a, b);	//a依旧为3，b依旧为5

	a = 3;
	b = 5;
	swap2(&a, &b); //使用指针传递地址，swap2函数会通过地址去访问变量，从而进行改变
	printf("a2 = %d, b2 = %d\n", a, b);		//a变成5，b变成3

	return 0;
}

