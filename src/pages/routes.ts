import buildRouteTree, { getParam } from 'build-route-tree';

const routes = buildRouteTree({
  categories: {
    category: getParam({ results: null }),
  },
  tickets: {
    ticket: getParam({ results: null }),
  },
  about: null,
  quiz: {
    results: null,
  },
});

export { routes };
