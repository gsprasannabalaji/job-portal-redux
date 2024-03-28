import Auth from "./Auth";
import Layout from "./Layout";

const WithLayout = (Component) => {
  return (
    <Auth>
      <Layout>
        <Component />
      </Layout>
    </Auth>
  );
};

export default WithLayout;
