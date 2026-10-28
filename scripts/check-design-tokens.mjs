// Fails when a stylesheet or inline style hard-codes a value that has a design token in src/styles/globals.css,
// or when code reaches for a UI library other than components/ui, Radix and lucide-react.
// Run with `npm run lint:tokens`.
import { execSync } from "node:child_process";
import { readFileSync, existsSync } from "node:fs";

const TOKEN_SOURCE = "src/styles/globals.css";
const BREAKPOINT_SOURCE = "src/styles/_breakpoints.scss";
const NAMED_COLOR = /(?<![\w-])(white|black|red|blue|green|yellow|orange|purple|pink|gr[ae]y)(?![\w-])/i;
const COLOR_PROPERTY = /^(color|background(-color)?|border(-(top|right|bottom|left))?(-color)?|outline(-color)?|fill|stroke|box-shadow|text-shadow|caret-color)$/;
// The UI libraries components/ui replaced; none may come back.
const OTHER_UI_LIBRARY = /(from\s+|import\s+|require\()["'](antd|react-bootstrap|bootstrap|@mui\/[\w-]+|@emotion\/[\w-]+|sweetalert2|react-icons|@fortawesome\/[\w-]+)(\/[^"']*)?["']/;
const BOOTSTRAP_CLASS = /className=["'][^"']*\b(m[tbsexy]?-[0-5]|p[tbsexy]?-[0-5]|btn(-[a-z]+)?|form-(control|group|label|select|check)|container(-fluid)?|row|col(-[a-z0-9]+)*)\b/;

const files = execSync("git ls-files -co --exclude-standard", { encoding: "utf8" })
  .split("\n")
  .filter((f) => f && existsSync(f) && !f.startsWith("node_modules/") && !f.startsWith("scripts/"));

const problems = [];
const report = (file, line, message, text) => problems.push(`${file}:${line}  ${message}\n    ${text.trim()}`);

for (const file of files.filter((f) => /\.(s?css)$/.test(f) && f !== TOKEN_SOURCE)) {
  readFileSync(file, "utf8").split("\n").forEach((raw, i) => {
    const line = raw.replace(/\/\/.*$/, "").replace(/\/\*.*?\*\//g, "");
    const decl = line.match(/^\s*([a-z-]+)\s*:\s*(.+?);?\s*$/);
    if (/#[0-9a-f]{3,8}\b/i.test(line)) report(file, i + 1, "hex color: use a --color-* token", raw);
    if (/rgba?\(\s*\d/.test(line)) report(file, i + 1, "rgb() color: use rgba(var(--color-*-rgb), alpha)", raw);
    if (/\$(color|shadow)-|(darken|lighten|transparentize|mix)\(/.test(line)) report(file, i + 1, "Sass color: use a token", raw);
    if (decl && COLOR_PROPERTY.test(decl[1]) && NAMED_COLOR.test(decl[2])) report(file, i + 1, "named color: use a --color-* token", raw);
    if (decl && decl[1] === "font-family" && !/^(var\(--font-[\w-]+\)|inherit)/.test(decl[2])) report(file, i + 1, "font-family: use var(--font-sans)", raw);
    if (decl && decl[1] === "z-index" && !/^(var\(--z-[\w-]+\)|0|auto|-1)/.test(decl[2])) report(file, i + 1, "z-index: use a --z-* token", raw);
    if (file !== BREAKPOINT_SOURCE && /@media[^{]*\d+px/.test(line)) report(file, i + 1, "breakpoint: use @include bp.up()/bp.down()", raw);
  });
}

for (const file of files.filter((f) => /\.(jsx?|tsx?)$/.test(f))) {
  readFileSync(file, "utf8").split("\n").forEach((raw, i) => {
    if (/["'`]#[0-9a-f]{3,8}["'`]/i.test(raw)) report(file, i + 1, "hex color in JS: use a class or var(--color-*)", raw);
    const colorProp = raw.match(/\b(color|backgroundColor|background|borderColor|border)\s*:\s*["'`]([^"'`]+)["'`]/);
    if (colorProp && (NAMED_COLOR.test(colorProp[2]) || /#[0-9a-f]{3,8}|rgba?\(\s*\d/i.test(colorProp[2]))) {
      report(file, i + 1, "color in inline style: use a class or var(--color-*)", raw);
    }
    if (/<[a-z]+[^>]*\sclass=["']/.test(raw)) report(file, i + 1, "use className, not class", raw);
    if (OTHER_UI_LIBRARY.test(raw)) report(file, i + 1, "UI library: use components/ui, Radix or lucide-react", raw);
    if (BOOTSTRAP_CLASS.test(raw)) report(file, i + 1, "Bootstrap class: use components/ui or a module class", raw);
  });
}

if (problems.length) {
  console.error(`Design token check failed (${problems.length}):\n\n${problems.join("\n")}`);
  process.exit(1);
}
console.log("Design token check passed: no hard-coded colors, fonts, layers or breakpoints, and no other UI library.");
