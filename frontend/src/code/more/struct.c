#include<stdio.h> 
//结构体类型的定义
struct abc{
	char name[50];
	int age;
};

//定义类型同时定义变量
struct acb2{
	char name[50];
	int age;
}s2 = { "李四", 22 };

//省略结构体类型名
struct{
	char name[50];
	int age;
}s3 = { "孙悟空", 25 };

int main(void){
	//先定义类型，再定义变量（常用）
	struct abc s1 = { "张三", 18 };
	
	printf("%d,%s\n",s1.age,s1.name);
	printf("%d,%s\n",s2.age,s2.name);
	printf("%d,%s\n",s3.age,s3.name);
}
