#include <stdio.h>
int main(void){
    int i = 9;
    if( i > 6 ){		//婊¤冻鏉′欢锛岃繘鍏ヤ唬鐮佸潡鍐�
        printf("if鏉′欢婊¤冻锛屽彲浠ユ墽琛屾琛岃鍙�");
    }
    
    if( i > 99){
        printf("if鏉′欢涓嶆弧瓒筹紝涓嶈兘鎵ц姝よ璇彞");
    }
    
    printf("%d\n" , i>6);	//杈撳嚭1
    printf("%d\n" , i>99);	//杈撳嚭0
}
