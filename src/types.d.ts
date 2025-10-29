declare module 'responsive-loader/sharp.js';
declare module '*!rl' {
  interface ResponsiveImageOutput {
    src: string;
    srcSet: string;
    placeholder: string | undefined;
    images: { path: string; width: number; height: number }[];
    width: number;
    height: number;
    toString: () => string;
  }

  const src: ResponsiveImageOutput;
  export default src;
}
