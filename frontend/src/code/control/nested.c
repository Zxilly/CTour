#include <stdio.h>
int main(void)
{
    for (int i = 1; i < 5; i++)
    {
        int j = 0;
        while (j++ < 2)
        {
            printf("i = %d , j = %d\n", i, j);
        }
        printf("=======外层循环一次===============\n");
    }
}
