#include <stdio.h>
int main()
{
	char c1[] = {'c', ' ', 'p', 'r', 'o', 'g'}; //普通字符数组
	printf("c1 = %s\n", c1);

	//以‘\0’(‘\0’就是数字0)结尾的字符数组是字符串
	char c2[] = {'c', ' ', 'p', 'r', 'o', 'g', '\0'};
	printf("c2 = %s\n", c2);

	//字符串处理以‘\0’(数字0)作为结束符，后面的'h', 'e', 'l', 'l', 'o'不会输出
	char c3[] = {'c', ' ', 'p', 'r', 'o', 'g', '\0', 'h', 'e', 'l', 'l', 'o', '\0'};
	printf("c3 = %s\n", c3);

	for (int i = 0; i < 13; i++)
	{
		printf("%c", c3[i]); //而通过遍历数组的方式就可以将所有数值全部输出
	}
	printf("\n");
	return 0;
}
