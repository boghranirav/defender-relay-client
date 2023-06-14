import fs from "fs";
import crypto from "crypto";

export class EncryptedStorage {
  protected key: Buffer;
  constructor(key: Buffer) {
    this.key = key;
  }

  private encrypt(data: string) {
    const iv = crypto.randomBytes(16);
    const cipher = crypto.createCipheriv("aes-256-cbc", this.key, iv);
    const encrypted = Buffer.concat([cipher.update(data), cipher.final()]);
    return iv.toString("hex") + ":" + encrypted.toString("hex");
  }

  private decrypt(encryptedData: any) {
    const [ivHex, encryptedHex] = encryptedData.split(":");
    const iv = Buffer.from(ivHex, "hex");
    const encrypted = Buffer.from(encryptedHex, "hex");
    const decipher = crypto.createDecipheriv("aes-256-cbc", this.key, iv);
    const decrypted = Buffer.concat([
      decipher.update(encrypted),
      decipher.final(),
    ]);
    return decrypted.toString();
  }

  saveToFile(filename: string, data: string) {
    const encryptedData = this.encrypt(data);
    fs.writeFileSync(filename, encryptedData);
  }

  loadFromFile(filename: string) {
    const encryptedData = fs.readFileSync(filename, "utf8");
    return this.decrypt(encryptedData);
  }
}
