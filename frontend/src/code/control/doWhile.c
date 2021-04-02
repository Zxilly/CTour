#include <stdio.h>
int main(void)
{
    int i = 0;
    do
    {
        printf("%d\n", i); //将依次输出0 1 2 3 4 5 6 7 8  9
    } while (i++ < 9);

    int j = 666;
    do
    {
        printf("进入循环体\n"); //无论表达式语句是否成立，都会先执行一次代码块语句
    } while (j < 0);
}
