import { storageItemGet } from '@app/storage/storageItemGet';
import { createSelectors } from '@app/store/createSelectors';
import { create } from 'zustand';
import type { PostJson, PostSection, PostSectionData } from './Post.types';

type PostStore = {
  postJson: PostJson;
  sectionId: number;
  sectionIdDialogOpen: boolean;
  setPostJson: (updater: (prev: PostJson) => PostJson) => void;
  openSectionIdDialog: (id: number) => void;
  closeSectionIdDialog: () => void;
  addSectionTitle: () => void;
  addSectionCode: () => void;
  addSectionSubheading: () => void;
  addSectionP: () => void;
  removeSection: (index: number) => void;
  updateSection: (updatedSection: PostJson['sections'][number]) => void;
  updateSectionData: <K extends PostSection['name']>(index: number, name: K, data: PostSectionData<K>) => void;
  updateSectionDataAndTitle: (index: number, name: 'post-title', data: PostSectionData<'post-title'>) => void;
};

const updateSectionByIndex = <K extends PostSection['name']>(
  state: PostStore,
  index: number,
  name: K,
  data: PostSectionData<K>,
): PostStore => ({
  ...state,
  postJson: {
    ...state.postJson,
    sections: state.postJson.sections.map((section, i) =>
      i === index && section.name === name ? ({ ...section, data } as PostSection) : section,
    ),
  },
});

const loadInitialPostJson = () => {
  const STORAGE_KEY = 'blog-post-creator';

  return (
    storageItemGet(localStorage, STORAGE_KEY) ?? {
      title: '',
      id: '',
      sections: [],
    }
  );
};

const usePostStoreBase = create<PostStore>()((set) => ({
  postJson: loadInitialPostJson(),
  sectionId: 0,
  sectionIdDialogOpen: false,
  setPostJson: (updater) =>
    set((state) => ({
      postJson: updater(state.postJson),
    })),
  openSectionIdDialog: (id) =>
    set({
      sectionId: id,
      sectionIdDialogOpen: true,
    }),
  closeSectionIdDialog: () =>
    set({
      sectionIdDialogOpen: false,
    }),
  addSectionTitle: () =>
    set((state) => ({
      postJson: {
        ...state.postJson,
        title: '',
        sections: [
          ...state.postJson.sections,
          {
            name: 'post-title',
            data: {
              title: '#',
              date: '29/03/2026',
            },
          },
        ],
      },
    })),
  addSectionP: () =>
    set((state) => ({
      postJson: {
        ...state.postJson,
        sections: [
          ...state.postJson.sections,
          {
            name: 'post-p',
            data: {
              text: 'Example',
            },
          },
        ],
      },
    })),
  addSectionCode: () =>
    set((state) => ({
      postJson: {
        ...state.postJson,
        sections: [
          ...state.postJson.sections,
          {
            name: 'post-code',
            data: {
              code: 'const users = [\n  { name: "Anna", age: 32 },\n  { name: "Bob", age: 28 },\n  { name: "Cara", age: 40 },\n];\n\nconst byAge = users.sort((a, b) => a.age - b.age);\n',
            },
          },
        ],
      },
    })),
  addSectionSubheading: () =>
    set((state) => ({
      postJson: {
        ...state.postJson,
        sections: [
          ...state.postJson.sections,
          {
            name: 'post-subheading',
            data: {
              text: 'Example',
            },
          },
        ],
      },
    })),
  removeSection: (index) =>
    set((state) => ({
      postJson: {
        ...state.postJson,
        sections: state.postJson.sections.filter((_, i) => i !== index),
      },
    })),
  updateSection: (updatedSection) =>
    set((state) => ({
      postJson: {
        ...state.postJson,
        sections: state.postJson.sections.map((section, index) =>
          index === state.sectionId ? updatedSection : section,
        ),
      },
    })),
  updateSectionData: (index, name, data) => set((state) => updateSectionByIndex(state, index, name, data)),
  updateSectionDataAndTitle: (index, name, data) =>
    set((state) => {
      return {
        postJson: {
          ...updateSectionByIndex(state, index, name, data).postJson,
          id: data.title.match(/#(\d+)/)?.[1] ?? '',
          title: data.title,
        },
      };
    }),
}));

export const usePostStore = createSelectors(usePostStoreBase);
