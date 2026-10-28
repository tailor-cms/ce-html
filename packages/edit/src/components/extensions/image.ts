import { createAssetId, isStorageUrl } from '@tailor-cms/cek-common';
import { reactive, watchEffect } from 'vue';
import Image from '@tiptap/extension-image';
import type { ImageOptions } from '@tiptap/extension-image';
import { mergeAttributes } from '@tiptap/vue-3';

export interface ImageStorage {
  // Signed URLs by data-asset-id, for images whose src is a storage:// URI
  urls: Record<string, string>;
}

// Asset picked from TailorAssetPicker
export interface AssetPick {
  url: string;
  publicUrl?: string | null;
  name?: string;
}

declare module '@tiptap/vue-3' {
  interface Storage {
    image: ImageStorage;
  }
  interface Commands<ReturnType> {
    assetImage: {
      setAssetImage: (asset: AssetPick) => ReturnType;
    };
  }
}

export default Image.configure({ inline: true }).extend<
  ImageOptions,
  ImageStorage
>({
  addStorage() {
    return { urls: reactive<Record<string, string>>({}) };
  },
  addAttributes() {
    return {
      ...this.parent?.(),
      width: {
        default: null,
        renderHTML: ({ width }) => (width ? { style: `width: ${width};` } : {}),
        parseHTML: (element) => element.style.width.replace(/['"]+/g, ''),
      },
      assetId: {
        default: null,
        parseHTML: (element) => element.getAttribute('data-asset-id'),
        renderHTML: ({ assetId }) =>
          assetId ? { 'data-asset-id': assetId } : {},
      },
    };
  },
  addCommands() {
    return {
      ...this.parent?.(),
      // Library images get an id; the signed URL shows them before the
      // first save returns
      setAssetImage:
        ({ url, publicUrl, name }) =>
        ({ commands }) => {
          const assetId = isStorageUrl(url) ? createAssetId() : null;
          if (assetId && publicUrl) this.storage.urls[assetId] = publicUrl;
          const attrs = { src: url, alt: name ?? '', assetId };
          return commands.insertContent({ type: this.name, attrs });
        },
    };
  },
  // Shows the signed URL while getHTML() keeps the storage:// src. Without an
  // update method, ProseMirror recreates the view when the node changes.
  addNodeView() {
    return ({ node, HTMLAttributes }) => {
      const dom = document.createElement('img');
      const attrs = mergeAttributes(
        this.options.HTMLAttributes,
        HTMLAttributes,
      );
      // src is left to the watcher; a storage:// src would start a failed load
      Object.entries(attrs).forEach(([key, value]) => {
        if (key !== 'src' && value != null) dom.setAttribute(key, value);
      });
      const { assetId, src } = node.attrs;
      const stop = watchEffect(() => {
        const url = assetId ? this.storage.urls[assetId] : src;
        // A storage:// src can't load; wait for its signed URL
        if (url) dom.setAttribute('src', url);
        else dom.removeAttribute('src');
      });
      return { dom, destroy: stop };
    };
  },
});
