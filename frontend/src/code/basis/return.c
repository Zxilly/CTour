#include<stdio.h>
int fun1(){
    return 666;			//�˺������շ�����ֵ��666
}

int fun2(){
    int a = 11;
    int b = 22;
    return a+b;			//�˺������շ�����ֵ��33
    printf("��һ�в������\n");	//ע�⣺��return֮�����䲻�ᱻִ�У���Ϊ�����Ѿ�ֹͣ
}

int main(void){
   	printf("%d\n",fun1());//���666
    printf("%d\n",fun2());//���33
}
