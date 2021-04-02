#include <stdio.h>
int main(void)
{
    int i = 3;
    switch (i)
    {
    case 1:
        printf("1被执行了\n");
    case 2:
        printf("2被执行了\n");
    case 3:
        printf("3被执行了\n");
    case 4:
        printf("4被执行了\n");
    case 5:
        printf("5被执行了\n");
    case 6:
        printf("6被执行了\n");
    case 7:
        printf("7被执行了\n");
        break;
    case 8:
        printf("8被执行了\n");
    defalut:
        printf("默认执行\n");
    }
}
