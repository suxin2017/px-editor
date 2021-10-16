import { action, makeObservable } from "mobx";
import { ComponentStore } from "store";

export interface IImageStoreProps {
  src: string | undefined;
  width: string;
  height: string;
}

export class ImageStore extends ComponentStore<IImageStoreProps> {
 
}
