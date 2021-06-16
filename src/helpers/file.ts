import fs from "fs";

export async function getOrCreateFolder(fileName: string) {
  if (!(await fs.existsSync(fileName))) {
    await fs.mkdirSync(fileName);
  }

  return fileName;
}

export async function createFile(fileName: string, content: string | string[]) {
  return fs.writeFileSync(
    fileName,
    Array.isArray(content) ? content.join("") : content
  );
}
