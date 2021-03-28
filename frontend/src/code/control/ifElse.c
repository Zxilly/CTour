#include <stdio.h>
int main(void){
    int i = 9;
    if( i > 6 ){		//满足条件，进入代码块内
        printf("if条件满足，可以执行此行语句\n");
    }else{
        printf("当if成立时，则不会进入else代码块\n");
    }
    
    if( i > 99){
        printf("if条件不满足，不能执行此行语句\n");
    }else{
        printf("if条件不满足时，那么就会进入else代码块\n");
    }
}
