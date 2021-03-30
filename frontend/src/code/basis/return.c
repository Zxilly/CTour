#include <stdio.h>
int fun1(){
    return 666;			//此函数最终返回数值：666
}

int fun2(){
    int a = 11;
    int b = 22;
    return a+b;			//此函数最终返回数值：33
    printf("这一行不会输出\n");	//注意：在return之后的语句不会被执行，因为函数已经停止
}

int main(void){
   	printf("%d\n",fun1());	//输出666
    printf("%d\n",fun2());	//输出33
}
