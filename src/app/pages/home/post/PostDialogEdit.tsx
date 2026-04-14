import { Dialog } from 'najwer23morsels/lib/dialog';
import { usePostStore } from './Post.store';

export const BlogDialogEdit: React.FC<{}> = () => {
  const sectionId = usePostStore.use.sectionId();
  const sectionIdDialogOpen = usePostStore.use.sectionIdDialogOpen();
  const closeSectionIdDialog = usePostStore.use.closeSectionIdDialog();
  return (
    <>
      <Dialog maxWidth={'900px'} open={sectionIdDialogOpen} onCancel={() => closeSectionIdDialog()}>
        Halo {sectionId}
      </Dialog>
    </>
  );
};
