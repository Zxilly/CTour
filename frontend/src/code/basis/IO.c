#include<stdio.h>
#include<stdlib.h>
int main(void){
   char c = 'A';
   putchar(c);
   printf("\n");
   
   int a = 123 ; 
   printf("%d\n" , a);
      
   double b = 3.141592;
   printf("%lf\n",b);
   

   
   char str[1024] = { "abcdefg" } ; 
   puts(str);
   printf("\n");
}
