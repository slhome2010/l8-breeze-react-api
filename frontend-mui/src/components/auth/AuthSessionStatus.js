import Alert from "@mui/material/Alert";

const AuthSessionStatus = ({ status, ...props }) => (
  <div {...props}>
    {status && (
      <Alert variant="outlined" severity="success">
        {status}
      </Alert>
    )}
  </div>
)

export default AuthSessionStatus
