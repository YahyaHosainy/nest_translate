import DevConfig from './dev.config';
import ProdConfig from './prod.config';
import ConfigInterface from './type.config';

export var environment: ConfigInterface & { NODE_ENV: string };

if (process.env.NODE_ENV === 'production') {
  environment = {
    NODE_ENV: process.env.NODE_ENV,
    ...ProdConfig,
  };
} else {
  environment = {
    NODE_ENV: process.env.NODE_ENV,
    ...DevConfig,
  };
}

export default environment;
