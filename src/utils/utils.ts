// Most Used Languages

import { LanguageEdge, Repository } from "@/types";

export const mostUsedLanguages = (
  data: Repository[]
): Array<{
  language: string;
  count: number;
}> => {
  const languages: string[] = [];
  let currentLanguagesCount: Array<{
    language: string;
    count: number;
  }> = [];

  data.forEach((value: Repository) => {
    console.log(value);
    value.languages.edges.forEach((val: LanguageEdge) => {
      if (languages.includes(val.node.name)) {
        const lang = val.node.name;
        currentLanguagesCount = currentLanguagesCount.map((v) => {
          if (v.language === lang) {
            return { ...v, count: v.count + 1 };
          }
          return v;
        });
        //console.log(currentLanguagesCount, "AQUI");
      } else {
        languages.push(val.node.name);
        currentLanguagesCount.push({ language: val.node.name, count: 1 });
        //console.log(currentLanguagesCount, "AQUI 2");
      }
    });
  });

  currentLanguagesCount = currentLanguagesCount
    .sort((value1, value2) => value2.count - value1.count)
    .slice(0, 5);

  return currentLanguagesCount;
};

export const mostStarredRepos = (data: Repository[]) => {
  let reposCount: Array<{
    repo: string;
    count: number;
  }> = [];

  data.forEach((value: Repository) => {
    reposCount.push({ repo: value.name, count: value.stargazerCount });
  });

  reposCount = reposCount
    .sort((value1, value2) => value2.count - value1.count)
    .slice(0, 5);

  return reposCount;
};

export const mostForkedRepos = (data: Repository[]) => {
  let reposCount: Array<{
    repo: string;
    count: number;
  }> = [];

  data.forEach((value: Repository) => {
    reposCount.push({ repo: value.name, count: value.forkCount });
  });

  reposCount = reposCount
    .sort((value1, value2) => value2.count - value1.count)
    .slice(0, 5);

  return reposCount;
};
