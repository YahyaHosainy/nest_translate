import DevConfig from './dev.config';
import ProdConfig from './prod.config';
import ConfigInterface from './type.config';

/*
|--------------------------------------------------------------------------
| Current environment variable
|--------------------------------------------------------------------------
|
| exports the current environment variables according to NODE_ENV which
| get defining from run the application commands.
| 
| yarn dev        => NODE_ENV=development
| yarn prod,start => NODE_ENV=production
|
*/

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
