#include <stdio.h>
int main(){
   int a = 5;
   int b = 3;
   int c ;
 
   c = a + b;
   printf("Line 1 - c ��ֵ�� %d\n", c );
   c = a - b;
   printf("Line 2 - c ��ֵ�� %d\n", c );
   c = a * b;
   printf("Line 3 - c ��ֵ�� %d\n", c );
   c = a / b;
   printf("Line 4 - c ��ֵ�� %d\n", c );
   c = a % b;
   printf("Line 5 - c ��ֵ�� %d\n", c );
   c = a++;  // ��ֵ���ټ� 1 ��c Ϊ 21��a Ϊ 22
   printf("Line 6 - c ��ֵ�� %d\n", c );
   c = a--;  // ��ֵ���ټ� 1 ��c Ϊ 22 ��a Ϊ 21
   printf("Line 7 - c ��ֵ�� %d\n", c );
   
   printf("Line 8 a == b ��ֵ�� %d\n",a==b);
   printf("Line 8 a > b ��ֵ�� %d\n",a>b);
}
