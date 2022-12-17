import './styles/index.scss';
import 'normalize.css';
import Layout from './components/Layout';
import { STEPS, useTimelapseContext } from './contexts/TimelapseContext';
import Upload from './components/Steps/Upload';
import Edit from './components/Steps/Edit';
import Finish from './components/Steps/Finish';

function App() {
  const {
    state: { currentStep },
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

  return <Layout>{currentStepElement()}</Layout>;
}

export default App;
