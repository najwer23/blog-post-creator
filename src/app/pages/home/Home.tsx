import { useDocumentTitle } from '@app/hooks/useDocumentTitle';
import { Button } from 'najwer23morsels/lib/button';
import { Grid } from 'najwer23morsels/lib/grid';
import { TextBox } from 'najwer23morsels/lib/textbox';
import { useState } from 'react';
import type { BlogPostSection } from './Blog.types';
import { BlogPostRenderSection } from './BlogPostRenderSection';

interface BlogJson {
  title: string;
  id: string;
  sections: BlogPostSection[];
}

export const Home = () => {
  useDocumentTitle('Home | Mariusz Najwer');

  const [json, setJson] = useState<BlogJson>({
    title: 'Blog title',
    id: '1',
    sections: [],
  });

  return (
    <Grid layout="container" widthMax={'1600px'} padding={'40px 20px 40px 20px'} margin={'auto'}>
      <Grid layout="flex" justifyContent="flex-start" alignItems="flex-start">
        <Grid layout="container" widthMax={'500px'} widthMin={'500px'} margin={0}>
          <TextBox mobileSize={20} desktopSize={20} margin={'0 0 40px'}>
            Sections
          </TextBox>

          <Button
            height={'40px'}
            width={'100px'}
            backgroundColor="grey"
            onClick={() => {
              setJson((prev) => ({
                ...prev,
                sections: [
                  ...prev.sections,
                  {
                    name: 'post-title',
                    data: {
                      title: '#1 My first blog post',
                      date: '29/03/2026',
                    },
                  },
                ],
              }));
            }}
          >
            <TextBox mobileSize={18} desktopSize={18}>
              Title
            </TextBox>
          </Button>
        </Grid>

        <Grid layout="container" widthMax={'1000px'} widthMin={'1000px'} margin={0}>
          <TextBox mobileSize={20} desktopSize={20} margin={'0 0 40px'}>
            Post
          </TextBox>

          <Grid layout="container">
            {json.sections.map((section, index) => (
              <Grid
                key={index}
                layout="flex"
                justifyContent="flex-start"
                alignItems="flex-start"
                gap={{ col: '10px', row: '20px' }}
              >
                <Grid
                  layout="flex"
                  justifyContent="flex-start"
                  widthMax={'200px'}
                  widthMin={'200px'}
                  margin={0}
                  gap={{ col: '10px', row: '20px' }}
                >
                  {index}
                  <Button
                    width={'50px'}
                    height={'30px'}
                    backgroundColor="green"
                    onClick={() => {
                      setJson((prev) => ({
                        ...prev,
                        sections: prev.sections.map((section, i) =>
                          i === index
                            ? {
                                name: 'post-title',
                                data: {
                                  title: '#1 My first blog post',
                                  date: '29/03/2000098',
                                },
                              }
                            : section,
                        ),
                      }));
                    }}
                  >
                    <TextBox mobileSize={15} desktopSize={15}>
                      Edit
                    </TextBox>
                  </Button>

                  <Button
                    width={'50px'}
                    height={'30px'}
                    backgroundColor="red"
                    onClick={() => {
                      setJson((prev) => ({
                        ...prev,
                        sections: prev.sections.filter((_, i) => i !== index),
                      }));
                    }}
                  >
                    <TextBox mobileSize={15} desktopSize={15}>
                      Del
                    </TextBox>
                  </Button>
                </Grid>
                <div>
                  <BlogPostRenderSection key={index} section={section} id={1} />
                </div>
              </Grid>
            ))}
          </Grid>
        </Grid>
      </Grid>

      <Grid layout="container" widthMax={'500px'} widthMin={'500px'} margin={'40px 0 0 0'}>
        <TextBox mobileSize={20} desktopSize={20} margin={'0 0 40px'}>
          JSON
        </TextBox>

        <Grid layout="container" widthMax={'1400px'}>
          <pre>{JSON.stringify(json, null, 2)}</pre>
        </Grid>
      </Grid>
    </Grid>
  );
};
