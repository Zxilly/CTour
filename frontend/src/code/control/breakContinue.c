#include <stdio.h>
int main(void){
    int i = 9;
    while( i-- > 0 ){
        if( i % 2 == 0){	//当i可以整除2的时候，就跳过该次循环，直接执行下一次循环
            continue;
        }
        printf("%d\t",i);	//只有当i为7、5、3、1时，这个语句才会被执行
    }
    printf("\n");
    int j = 9;
    while( j-- > 0 ){
        if( j == 5){		//当j等于5的时候，直接跳出循环，执行后面的语句
			break;
        }
        printf("%d\t",j);	//只有当j大于5时，这个语句才会被执行
    }
    printf("\n");
    for(int i = 1 ; i < 5 ; i++ ){
        int j = 0;
        while( j++ < 5 ){
            if( j > 3){		//嵌套循环中，一个break只能跳出一重循环
                break;
            }
            printf("i = %d , j = %d\n",i,j);	//每次循环都只有j小于3才会执行这个语句
        }
        printf("=======外层循环一次===============\n");
    } 
}
