import infoList from "../list";

function indexSection(section: string) {
  return Object.keys(infoList).indexOf(section);
}

function indexContent(section: string, content: string) {
  const contents = infoList[section];

  if (!contents) {
    throw "Section not exist.";
  } else {
    return Object.keys(contents.content).indexOf(content);
  }
}

function getSection(sectionIndex: number) {
  return Object.keys(infoList)[sectionIndex];
}

function getContent(sectionIndex: number, contentIndex: number) {
  const key = getSection(sectionIndex);
  return Object.keys(infoList[key].content)[contentIndex];
}

function nextContent(section: string, content: string) {
  const sectionLoc = indexSection(section);
  const contentLoc = indexContent(section, content);

  const sectionNum = Object.keys(infoList).length;
  const contentNum = Object.keys(infoList[section].content).length;

  let returnFlag = false;

  if (sectionLoc === sectionNum - 1 && contentLoc === contentNum - 1) {
    returnFlag = true;
    return ["", "", returnFlag];
  }

  if (contentLoc === contentNum - 1) {
    return [
      getSection(sectionLoc + 1),
      getContent(sectionLoc + 1, 0),
      returnFlag,
    ];
  }

  return [
    getSection(sectionLoc),
    getContent(sectionLoc, contentLoc + 1),
    returnFlag,
  ];
}

function getSectionLength() {
  return Object.keys(infoList).length;
}

function getContentLength(section: string) {
  return Object.keys(infoList[section].content).length;
}

function previousContent(section: string, content: string) {
  const sectionLoc = indexSection(section);
  const contentLoc = indexContent(section, content);

  const sectionNum = getSectionLength();
  const contentNum = getContentLength(section);

  let returnFlag = false;

  if (sectionLoc === 0 && contentLoc === 0) {
    returnFlag = true;
    return ["", "", returnFlag];
  }

  if (contentLoc === 0) {
    return [
      getSection(sectionLoc - 1),
      getContent(
        sectionLoc - 1,
        getContentLength(getSection(sectionLoc - 1)) - 1
      ),
      returnFlag,
    ];
  }

  return [
    getSection(sectionLoc),
    getContent(sectionLoc, contentLoc - 1),
    returnFlag,
  ];
}
