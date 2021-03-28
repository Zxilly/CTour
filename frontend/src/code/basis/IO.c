#include<stdio.h>
#include<stdlib.h>
int main(void){
   char c;
   c = getchar();
   putchar(c);
   printf("\n");
   
   int a ; 
   scanf("%d\n" , &a);
   printf("%d\n" , a);
   
   char str[1024] ;
	gets(str);
   puts(str);
   printf("\n");
}
