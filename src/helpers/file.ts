import fs from "fs";

export async function getOrCreateFolder(fileName: string) {
  if (!(await fs.existsSync(fileName))) {
    await fs.mkdirSync(fileName);
  }

  return fileName;
}

export async function readOrCreateFile(
  fileName: string,
  defaultValue?: string
) {
  let file: any;

  const exists = await fs.existsSync(fileName);

  if (exists) {
    file = await fs.readFileSync(fileName, { encoding: "utf-8" });
  } else {
    file = await fs.writeFileSync(fileName, defaultValue || "", { flag: "wx" });
  }

  return file;
}

export async function writeFile(fileName: string, content: string | string[]) {
  return fs.writeFileSync(
    fileName,
    Array.isArray(content) ? content.join("") : content
  );
}
