import { BrowserRouter, Switch, Route } from "react-router-dom";
import { Provider } from "@/components/Provider";
import { Archive } from "@/pages/Archive";
import { Single } from "@/pages/Single";

export function App() {
  return (
    <Provider
    // baseUrl="https://nolan.dystrick.dev"
    // basePath="/blog"
    >
      <BrowserRouter>
        <Switch>
          <Route
            path="/:slug"
            render={(props: any) => {
              return <Single slug={props.match.params.slug} />;
            }}
          />
          <Route path="/" component={Archive} />
        </Switch>
      </BrowserRouter>
    </Provider>
  );
}
