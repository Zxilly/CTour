#include <stdio.h>
int main(void){
    //分段赋值
    int a[3][4] = 
	{ 
		{ 1, 2, 3, 4 },
		{ 5, 6, 7, 8, },
		{ 9, 10, 11, 12 }
	};
	
    for(int i = 0 ; i < 3 ; i++ ){
        for(int j = 0 ; j < 4 ; j++ ){
            printf("%d\t",a[i][j]);
        }
        printf("\n");
    }
    printf("\n");

    //连续赋值
	int b[3][4] = { 1, 2, 3, 4 , 5, 6, 7, 8, 9, 10, 11, 12  };
    for(int i = 0 ; i < 3 ; i++ ){
        for(int j = 0 ; j < 4 ; j++ ){
            printf("%d\t",b[i][j]);
        }
        printf("\n");
    }
    printf("\n");

	//可以只给部分元素赋初值，未初始化则为0
	int c[3][4] = { 1, 2, 3, 4  };
    for(int i = 0 ; i < 3 ; i++ ){
        for(int j = 0 ; j < 4 ; j++ ){
            printf("%d\t",c[i][j]);
        }
        printf("\n");
    }
}
