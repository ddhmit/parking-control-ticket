import React, { ReactNode } from 'react';
import { Route } from 'react-router-dom';

export const createRoute = (
  config: any,
  parentPath: string = ''
): ReactNode => {
  let Page = config.component;
  let path = parentPath + config.path;
  path = path.trim();
  return (
    <Route key={config.path} exact path={path} component={() => <Page />} />
  );
};
