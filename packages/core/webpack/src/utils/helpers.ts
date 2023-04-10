/**
 * Created by: Júnior Conquista (junior.conquista@nuvemshop.com.br)
 */

export const arrayFilterEmpty = (
  array: {
    test: RegExp;
    loader?: string;
    use?: any;
    exclude?: RegExp;
  }[]
) => array.filter((x) => !!x);
