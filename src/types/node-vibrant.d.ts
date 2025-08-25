declare module "node-vibrant" {
  export default class Vibrant {
    static from(src: string): Vibrant;
    getPalette(): Promise<any>;
  }
}
