import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";

const AuthSessionErrors = ({ errors = [], ...props }) => (
  <div {...props}>
    {errors.length > 0 && (
      <Alert variant="outlined" severity="error">
        {errors.map((error) => (
          <li key={error}>{error}</li>
        ))}
      </Alert>
    )}
  </div>
)

export default AuthSessionErrors

