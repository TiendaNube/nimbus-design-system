const fs = require("fs");
const path = require("path");
const glob = require("glob");

const modifiers = [":active", ":focus", ":hover", ":disabled", "::after"];

const run = () => {
  const paths = glob.sync(path.join("./dist/index.css"));
  const source = fs.readFileSync(paths[0], "utf8");
  const hashs = source
    ?.match(
      /.nimbus-\w+(__\w{6,})(:active|:focus|:hover|:disabled|::after)? {$/gm
    )
    ?.reduce((prev, curr) => {
      const hash = curr
        .replace(/:active|:focus|:hover|:disabled|::after/, "")
        .replace(" {", "");
      prev.push(hash);
      return prev;
    }, []);

  // // ?.match(/^\.\w+\\\.\w+(__\w{7,}) {$/gm)
  // ?.reduce((prev, curr) => {
  //   const hash = curr.match(/(__\w{7,})/gm)[0];
  //   prev.push(hash);
  //   return prev;
  // }, []);

  // console.log(
  //   source?.match(/^\.nimbus-\w+__\w+?(__\w{6,}):?:?\w+ {$/gm)[0]
  // );

  // const matches = source?.matchAll(/^\.nimbus-\w+__\w+?(__\w{7,}) {$/gm);

  const matches = Array.from(
    source.matchAll(
      /^(?:\.nimbus-\w+__\w+?)(__\w{7,})(?:\:{0,2}(?:disabled|focus|active|hover))? {$/gm
    ),
    (m) => m[1]
  );

  const uniqueMatches = [...new Set(matches)];

  let content = source;

  uniqueMatches?.forEach((hash) => {
    const regex = new RegExp(`${hash}\\b`, "gm");
    content = content.replace(regex, "");
  });

  const writeStream = fs.createWriteStream("dist/partners.css");
  writeStream.write(content);
  writeStream.end();
};

try {
  run();
} catch (err) {
  console.error(`\x1b[33m ${err.message} \x1b[0m`);
  process.exit(1);
}
