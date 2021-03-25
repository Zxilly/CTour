#include<stdio.h>
int main(void){
    int a[] = {1,2,3,4};
    int b[10] = {1,2,3,4,5};
    int c[10] = {0};
    int i = 0 ;
    while(i<4){
    	printf("%d\t",a[i++]);
	}
    printf("\n");
    int j = 0 ;
    while( j < 10){
    	printf("%d\t",b[j++]);
	}
    printf("\n");
    int k = 0 ;
    while( k < 10){
    	printf("%d\t",c[k++]);
	}
}
