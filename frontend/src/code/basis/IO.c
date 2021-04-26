#include <stdio.h>
#include <stdlib.h>
int main(void)
{
   char c;
   printf("Input a char:");
   getchar();
   putchar(c);
   printf("\n");

   int a;
   printf("Input a integer number:");
   scanf("%d", &a);
   printf("%d\n", a);

   double b;
   printf("Input a float number:");
   scanf("%lf", &b);
   printf("%lf\n", b);

   printf("Input a string:");
   getchar();
   printf("\n");
}
