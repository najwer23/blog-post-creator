import { TextBox } from 'najwer23morsels/lib/textbox';
import type { PostSection } from '../post/Post.types';

export const SectionSubheading: React.FC<{
  section: Extract<PostSection, { name: 'post-subheading' }>;
}> = ({ section }) => {
  return (
    <>
      <TextBox mobileSize={18} desktopSize={20} tag="h3" margin={'30px 0 0'} color="black" fontWeight={800}>
        {section.data.text}
      </TextBox>
    </>
  );
};
