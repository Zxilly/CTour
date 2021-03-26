#include <stdio.h>
int main(void){
    int i = 9;
    if( i > 6 ){		//满足条件，进入代码块内
        printf("if条件满足，可以执行此行语句");
    }
    
    if( i > 99){
        printf("if条件不满足，不能执行此行语句");
    }
    
    printf("%d\n" , i>6);	//输出1
    printf("%d\n" , i>99);	//输出0
}
