import { Asset } from "./asset.model";

export interface AssetMap{
    [type: string]: Asset[];
}