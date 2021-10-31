import { UsernamePasswordForm } from "./username-password-form"

const login = (username: string, password: string) => console.log({ username, password });

export const Login = () => {

  return <UsernamePasswordForm label="Login" onSubmit={login}/>
};
