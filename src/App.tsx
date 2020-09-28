import React, { useEffect } from 'react';
import { Switch, BrowserRouter as Router, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { Helmet } from 'react-helmet';
import Hammer from 'hammerjs';
import store from '~/model/configStore';
import NoMatch from './page/NoMatch';
import route from './config/route';
import Home from './page/Home';
import market from './config/market';

function App() {
  // 阻止中间滚轮事件， 右键事件的默认行为
  // 阻止菜单事件
  useEffect(() => {
    const cancelRightClick = (e: MouseEvent) => {
      if (e.button > 0) {
        e.stopPropagation();
        e.preventDefault();
      }
    };
    const cancelMenu = (e: MouseEvent) => {
      e.stopPropagation();
      e.preventDefault();
    };
    document.documentElement.addEventListener('mousedown', cancelRightClick);
    document.documentElement.addEventListener('contextmenu', cancelMenu);
    return () => {
      document.documentElement.removeEventListener(
        'mousedown',
        cancelRightClick
      );

      document.documentElement.removeEventListener('contextmenu', cancelMenu);
    };
  }, []);

  // 阻止长按行为
  useEffect(() => {
    // Create an instance of Hammer with the reference.
    var hammer = new Hammer(document.documentElement, {
      domEvents: true,
      preset: [[Hammer.Press]]
    });
    hammer.on('press', function (e) {
      e.preventDefault();
      // @ts-ignore
      e.srcEvent.stopPropagation();
    });

    return () => {
      hammer.destroy();
    };
  }, []);

  return (
    <Provider store={store}>
      <Helmet>
        <title>{market.name}</title>
      </Helmet>
      <Router>
        <div className="App">
          <Switch>
            <Route exact path="/">
              <NoMatch />
            </Route>
            <Route path={route.home.path}>
              <Home />
            </Route>
            <Route path="*">
              <NoMatch />
            </Route>
          </Switch>
        </div>
      </Router>
    </Provider>
  );
}

export default App;
