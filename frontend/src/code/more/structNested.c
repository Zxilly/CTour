#include <stdio.h>
struct person
{
	char name[20];
	char sex;
};

struct stu
{
	int id;
	struct person one; //(嵌套结构体，给这个结构体起名字）
};

int main()
{
	//结构体数组，将结构体类型和普通的数据类型理解成一个模式即可
	struct stu s[2] = {1, "lily", 'F', 2, "yuri", 'M'};
	int i = 0;
	for (i = 0; i < 2; i++)
	{
		printf("id = %d\tone.name=%s\tone.sex=%c\n", s[i].id, s[i].one.name, s[i].one.sex);
	}
	return 0;
}
