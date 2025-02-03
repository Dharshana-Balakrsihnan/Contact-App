import { useLocation, useNavigate, useParams } from "react-router-dom";

export function withRouter(Component) {
  function ComponentWithRouterProps(props) {
    let location = useLocation();
    let navigate = useNavigate();
    let params = useParams();
    return (
      <Component
        {...props}
        location={location}
        history={{ push: navigate }}
        params={params}
      />
    );
  }
  return ComponentWithRouterProps;
}
