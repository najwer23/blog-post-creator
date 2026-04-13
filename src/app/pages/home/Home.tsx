import { useDocumentTitle } from '@app/hooks/useDocumentTitle';
import { Grid } from 'najwer23morsels/lib/grid';
import { TextBox } from 'najwer23morsels/lib/textbox';
// import styles from './Home.module.css';

export const Home = () => {
  useDocumentTitle('Home | Mariusz Najwer');

  return (
    <Grid layout="container" padding={'0 0 40px 0'} margin={0}>
      <TextBox tag="h2" desktopSize={30} mobileSize={24} fontWeight={500}>
        Hello World!
      </TextBox>
    </Grid>
  );
};
