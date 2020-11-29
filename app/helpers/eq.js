import { helper } from '@ember/component/helper';

function eq(args) {
  let [str1, str2] = args;
  return str1 === str2;
}

export default helper(eq);
