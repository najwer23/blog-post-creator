import { useDocumentTitle } from '@app/hooks/useDocumentTitle';
import { storageItemGet } from '@app/storage/storageItemGet';
import { storageItemSet } from '@app/storage/storageItemSet';
import { Button } from 'najwer23morsels/lib/button';
import { Grid } from 'najwer23morsels/lib/grid';
import { TextBox } from 'najwer23morsels/lib/textbox';
import { useEffect } from 'react';
import { usePostStore } from './post/Post.store';
import { BlogDialogEdit } from './post/PostDialogEdit';
import { PostRenderSection } from './post/PostRenderSection';

const STORAGE_KEY = 'blog-post-creator';

export const Home = () => {
  useDocumentTitle('Home | Mariusz Najwer');

  const postJson = usePostStore.use.postJson();
  const setPostJson = usePostStore.use.setPostJson();
  const addSectionTitle = usePostStore.use.addSectionTitle();
  const addSectionSubheading = usePostStore.use.addSectionSubheading();
  const addSectionP = usePostStore.use.addSectionP();
  const removeSection = usePostStore.use.removeSection();
  const openSectionIdDialog = usePostStore.use.openSectionIdDialog();

  useEffect(() => {
    const stored = storageItemGet(localStorage, STORAGE_KEY);
    if (stored) {
      setPostJson(() => stored);
    }
  }, [setPostJson]);

  useEffect(() => {
    if (!postJson) return;
    storageItemSet(localStorage, STORAGE_KEY, postJson, 999999);
  }, [postJson]);

  return (
    <Grid layout="container" widthMax="1600px" padding="40px 20px 40px 20px" margin="auto">
      <BlogDialogEdit />

      <Grid layout="flex" justifyContent="flex-start" alignItems="flex-start">
        <Grid layout="container" widthMax="500px" widthMin="500px" margin={0}>
          <TextBox mobileSize={20} desktopSize={20} margin="0 0 40px">
            Sections
          </TextBox>

          <Button height="40px" width="100px" backgroundColor="orange" onClick={addSectionTitle}>
            <TextBox mobileSize={18} desktopSize={18}>
              Post Title
            </TextBox>
          </Button>
          <Button height="40px" width="120px" backgroundColor="orange" onClick={addSectionP} margin={'20px 0 0'}>
            <TextBox mobileSize={18} desktopSize={18}>
              Paragpraph
            </TextBox>
          </Button>

          <Button
            height="40px"
            width="120px"
            backgroundColor="orange"
            onClick={addSectionSubheading}
            margin={'20px 0 0'}
          >
            <TextBox mobileSize={18} desktopSize={18}>
              Subheading
            </TextBox>
          </Button>
        </Grid>

        <Grid layout="container" widthMax="1000px" widthMin="1000px" margin={0}>
          <TextBox mobileSize={20} desktopSize={20} margin="0 0 40px">
            Post
          </TextBox>

          <Grid layout="container">
            {postJson.sections.map((section, index) => (
              <Grid
                key={index}
                layout="flex"
                justifyContent="flex-start"
                alignItems="flex-start"
                gap={{ col: '10px', row: '20px' }}
              >
                <div>
                  <Grid layout="container">
                    <TextBox mobileSize={15} desktopSize={15}>
                      {index} {section.name}
                    </TextBox>
                    <Grid
                      layout="flex"
                      justifyContent="flex-start"
                      widthMax="200px"
                      widthMin="200px"
                      margin={0}
                      gap={{ col: '10px', row: '20px' }}
                    >
                      <Button
                        width="50px"
                        height="30px"
                        backgroundColor="#4BB543"
                        onClick={() => openSectionIdDialog(index)}
                      >
                        <TextBox mobileSize={15} desktopSize={15} color="white">
                          Edit
                        </TextBox>
                      </Button>
                      <Button width="50px" height="30px" backgroundColor="#ff3333" onClick={() => removeSection(index)}>
                        <TextBox mobileSize={15} desktopSize={15} color="white">
                          Del
                        </TextBox>
                      </Button>
                    </Grid>
                  </Grid>
                </div>

                <div>
                  <PostRenderSection section={section} id={1} />
                </div>
              </Grid>
            ))}
          </Grid>
        </Grid>
      </Grid>

      <Grid layout="container" widthMax="500px" widthMin="500px" margin="40px 0 0 0">
        <TextBox mobileSize={20} desktopSize={20} margin="0 0 40px">
          JSON
        </TextBox>

        <Grid layout="container" widthMax="1400px">
          <pre>{JSON.stringify(postJson, null, 2)}</pre>
        </Grid>
      </Grid>
    </Grid>
  );
};
