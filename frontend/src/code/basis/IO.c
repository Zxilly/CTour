#include <stdio.h>
#include <stdlib.h>
int main(void)
{
   char c;
   printf("请输入一个字符:");
   getchar();
   putchar(c);
   printf("\n");

   int a;
   printf("请输入一个数值:");
   scanf("%d", &a);
   printf("%d\n", a);

   double b;
   printf("请输入一个带小数的数值:");
   scanf("%lf", &b);
   printf("%lf\n", b);

   printf("请输入一串字符:");
   getchar();
   char str[1024] = {};
   gets(str);
   puts(str);
   printf("\n");
}
