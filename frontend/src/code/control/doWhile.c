#include <stdio.h>
int main(void){
    int i = 0;
    do{
       printf("%d\n",i);	//灏嗕緷娆¤緭鍑�0 1 2 3 4 5 6 7 8  9     
    }
    while( i++ < 9 );
        
    int j = 666;
    do{
        printf("杩涘叆寰幆浣揬n");	//鏃犺琛ㄨ揪寮忚鍙ユ槸鍚︽垚绔嬶紝閮戒細鍏堟墽琛屼竴娆′唬鐮佸潡璇彞
    }while( j < 0);
}
