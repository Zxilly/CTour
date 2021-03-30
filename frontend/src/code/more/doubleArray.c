#include <stdio.h>
int main(void){
    //鍒嗘璧嬪��
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

    //杩炵画璧嬪��
	int b[3][4] = { 1, 2, 3, 4 , 5, 6, 7, 8, 9, 10, 11, 12  };
    for(int i = 0 ; i < 3 ; i++ ){
        for(int j = 0 ; j < 4 ; j++ ){
            printf("%d\t",b[i][j]);
        }
        printf("\n");
    }
    printf("\n");

	//鍙互鍙粰閮ㄥ垎鍏冪礌璧嬪垵鍊硷紝鏈垵濮嬪寲鍒欎负0
	int c[3][4] = { 1, 2, 3, 4  };
    for(int i = 0 ; i < 3 ; i++ ){
        for(int j = 0 ; j < 4 ; j++ ){
            printf("%d\t",c[i][j]);
        }
        printf("\n");
    }
}
