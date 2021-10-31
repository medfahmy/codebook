import { useState } from "react"

interface UsernamePasswordFormProps {
  label: string;
  onSubmit: (username: string, password: string) => void;
}

export const UsernamePasswordForm = ({ label, onSubmit }: UsernamePasswordFormProps) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

 return (
    <div>
      <input value={username} onChange={(e) => setUsername(e.target.value)}/>
      <input value={password} onChange={(e) => setPassword(e.target.value)}/>
      <button onClick={() => onSubmit(username, password)}>{label}</button>
    </div>
  )

};
