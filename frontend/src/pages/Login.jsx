import Form from "../components/Form";

function Login({ setIsAdmin }) {
    return <Form route="/api/token/" method="login" setIsAdmin={setIsAdmin} />;
}

export default Login;
