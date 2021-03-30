#include <stdio.h>
struct person{
	char name[20];
	char sex;
};

struct stu{
	int id;
	struct person one;	//(宓屽缁撴瀯浣擄紝缁欒繖涓粨鏋勪綋璧峰悕瀛楋級
};

int main(){
    //缁撴瀯浣撴暟缁勶紝灏嗙粨鏋勪綋绫诲瀷鍜屾櫘閫氱殑鏁版嵁绫诲瀷鐞嗚В鎴愪竴涓ā寮忓嵆鍙�
	struct stu s[2] = { 1, "lily", 'F', 2, "yuri", 'M' };
	int i = 0;
	for (i = 0; i < 2; i++){
		printf("id = %d\tone.name=%s\tone.sex=%c\n", s[i].id, s[i].one.name, s[i].one.sex);
	}
	return 0;
}
