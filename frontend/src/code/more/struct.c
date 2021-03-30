#include <stdio.h> 
//缁撴瀯浣撶被鍨嬬殑瀹氫箟
struct abc{
	char name[50];
	int age;
};

//瀹氫箟绫诲瀷鍚屾椂瀹氫箟鍙橀噺
struct acb2{
	char name[50];
	int age;
}s2 = { "鏉庡洓", 22 };

//鐪佺暐缁撴瀯浣撶被鍨嬪悕
struct{
	char name[50];
	int age;
}s3 = { "瀛欐偀绌�", 25 };

int main(void){
	//鍏堝畾涔夌被鍨嬶紝鍐嶅畾涔夊彉閲忥紙甯哥敤锛�
	struct abc s1 = { "寮犱笁", 18 };
	
	printf("%d,%s\n",s1.age,s1.name);
	printf("%d,%s\n",s2.age,s2.name);
	printf("%d,%s\n",s3.age,s3.name);
}
