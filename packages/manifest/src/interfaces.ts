import type * as common from '@tailor-cms/cek-common';

export interface ElementData extends common.ElementConfig {
  content: string;
  // `imageUrls.<data-asset-id>` -> storage:// URI; rebuilt from content on save
  assets?: Record<string, string>;
  // Signed image URLs by data-asset-id, resolved from `assets` on read
  imageUrls?: Record<string, string>;
}

export type DataInitializer = common.DataInitializer<ElementData>;
export type Element = common.Element<ElementData>;
export type ElementManifest = common.ElementManifest<ElementData>;
