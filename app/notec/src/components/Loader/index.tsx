import { CircularProgress } from '@mui/material';
import View from '../View';

const Loader = () => {
  return (
    <View fullScreen>
      <CircularProgress size={'5rem'} />
    </View>
  );
};

export default Loader;
