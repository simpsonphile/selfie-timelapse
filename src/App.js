import './styles/index.scss';
import 'normalize.css';
import Layout from './components/Layout';
import { STEPS, useTimelapseContext } from './contexts/TimelapseContext';
import Upload from './components/Steps/Upload';
import Edit from './components/Steps/Edit';
import Finish from './components/Steps/Finish';
import ProgressBar from './components/ProgressBar';

function App() {
  const {
    state: { currentStep, progress, timelapseLoading, images },
  } = useTimelapseContext();

  const currentStepElement = () => {
    switch (currentStep) {
      case STEPS.UPLOAD:
        return <Upload />;
      case STEPS.EDIT:
        return <Edit />;
      case STEPS.FINISH:
        return <Finish />;
      default:
        return <Upload />;
    }
  };

  return (
    <Layout>
      {timelapseLoading && (
        <ProgressBar done={progress} parts={images.length} />
      )}
      {currentStepElement()}
    </Layout>
  );
}

export default App;
