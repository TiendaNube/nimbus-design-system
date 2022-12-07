/**
 * Created by: Júnior Conquista (junior.conquista@nuvemshop.com.br)
 */

interface Rule {
  test: RegExp;
  loader?: string;
  use?: any;
  exclude?: RegExp;
}

export const arrayFilterEmpty = (array: Rule[]) => array.filter((x) => !!x);
