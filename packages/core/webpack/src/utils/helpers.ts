/**
 * Created by: Andrey Polyakov (andrey@polyakov.im)
 */

interface Rule {
  test: RegExp;
  loader?: string;
  use?: any;
  exclude?: RegExp;
}

export const arrayFilterEmpty = (array: Rule[]) => array.filter((x) => !!x);
