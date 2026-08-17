#!/usr/bin/env node
// 为 GitHub Pages 生成可直接访问的 /services 子页面（SPA 无回退，直链需要物理 HTML）
import { readFileSync, writeFileSync, mkdirSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const indexFile = path.join(root, "dist", "client", "index.html");
const servicesDir = path.join(root, "dist", "client", "services");

const html = readFileSync(indexFile, "utf8")
  .replaceAll("./assets/", "../assets/")
  .replace(
    /<title>.*?<\/title>/,
    "<title>网站代做服务｜个人网站 / 作品集站 / 落地页</title>",
  )
  .replace(
    /content="高嘉勤的个人展示网站[^"]*"/,
    'content="个人网站、作品集站、落地页代做，AI 工具高效开发，从需求到上线一站式交付，300 元起。"',
  );

mkdirSync(servicesDir, { recursive: true });
writeFileSync(path.join(servicesDir, "index.html"), html);
console.log("Generated dist/client/services/index.html");
