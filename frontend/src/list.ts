interface list {
  [sectionName: string]: {
    name: string;
    description: string;
    content: {
      [k: string]: {
        title: string;
        hasCode: boolean;
      };
    };
  };
}

const infoList:list = {
  welcome: {
    name: "欢迎",
    description: "学习使用本指南：包括如何在不同的课程间切换以及运行代码。",
    content: {
      helloworld: {
        title: "你好，世界！",
        hasCode: true,
      },
      component: {
        title: "C 语言基本组成",
        hasCode: true,
      },
      end: {
        title: "第一章结束",
        hasCode: false,
      },
    },
  },
  basis: {
    name: "基础篇",
    description:"学习 C 程序的基本结构。",
    content: {
      variable: {
        title: "变量",
        hasCode: true,
      },
      constant: {
        title: "常量",
        hasCode: true,
      },
      return: {
        title: "返回值",
        hasCode: true,
      },
      express: {
        title: "表达式和语句",
        hasCode: false,
      },
      dataType: {
        title: "基本数据类型",
        hasCode: true,
      },
      typeChange: {
        title: "类型转换",
        hasCode: true,
      },
      headFile: {
        title: "头文件",
        hasCode: false,
      },
      function: {
        title: "函数",
        hasCode: true,
      },
      main: {
        title: "主函数",
        hasCode: true,
      },
      IO: {
        title: "输入输出",
        hasCode: true,
      },
      operator: {
        title: "运算符",
        hasCode: true,
      },
      end: {
        title: "第二章结束",
        hasCode: false,
      },
    },
  },
  control: {
    name: "流程控制语句",
    description: "学习如何使用条件、循环、分支语句来控制代码的流程。",
    content: {
      if: {
        title: "if",
        hasCode: true,
      },
      ifElse: {
        title: "if-else",
        hasCode: true,
      },
      for: {
        title: "for",
        hasCode: true,
      },
      while: {
        title: "while",
        hasCode: true,
      },
      doWhile: {
        title: "do-while",
        hasCode: true,
      },
      nested: {
        title: "嵌套循环",
        hasCode: true,
      },
      exercise: {
        title: "练习：输出九九乘法表",
        hasCode: true,
      },
      breakContinue: {
        title: "break - continue",
        hasCode: true,
      },
      switch: {
        title: "switch-case-default",
        hasCode: true,
      },
      end: {
        title: "第三章结束",
        hasCode: false,
      },
    },
  },
  more: {
    name: "更多",
    description: "学习如何基于现有类型定义新的类型",
    content: {
      array: {
        title: "数组",
        hasCode: true,
      },
      doubleArray: {
        title: "二维数组",
        hasCode: true,
      },
      string: {
        title: "字符串",
        hasCode: true,
      },
      point: {
        title: "指针",
        hasCode: true,
      },
      pointParameter: {
        title: "指针参数",
        hasCode: true,
      },
      struct: {
        title: "结构体",
        hasCode: true,
      },
      structNested: {
        title: "结构体嵌套",
        hasCode: true,
      },
      end: {
        title: "第三章结束",
        hasCode: false,
      },
    },
  },
};

export default infoList;
