import { Box, Button, TextField } from "@mui/material";
import { useState } from "react";
import { sx } from "../../props/box.sx";
import { useSignupMutation } from "@/store/authApi";

export default function Index() {
    const [username, setUsername] = useState<String>("");
    const [usernameError, setUsernameError] = useState<boolean>(false);

    const [password, setPassword] = useState<String>("");
    const [passwordError, setPasswordError] = useState<boolean>(false);

    const [email, setEmail] = useState<String>("");
    const [nickname, setNickname] = useState<String>("");

    const [signup] = useSignupMutation();

    return (
        <Box sx={sx}>
            <TextField
                value={username}
                onChange={(e) => {
                    setUsername(e.target.value);
                }}
                label={"Username"}
                error={usernameError}
                onBlur={() => {
                    if (username.length < 3) {
                        setUsernameError(true);
                    }
                }}
                onFocus={() => {
                    setUsernameError(false);
                }}
            />

            <TextField
                value={password}
                onChange={(e) => {
                    setPassword(e.target.value);
                }}
                label={"Password"}
                error={passwordError}
                onBlur={() => {
                    if (password.match(/^[a-zA-Z]+$/g)) {
                        setPasswordError(true);
                    }
                }}
                onFocus={() => {
                    setPasswordError(false);
                }}
            />

            <TextField
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                label={"Email"}
            />

            <TextField
                value={nickname}
                onChange={(e) => setNickname(e.target.value)}
                label={"Nickname"}
            />

            <Button
                variant="outlined"
                onClick={() => {
                    if (!(usernameError || passwordError)) {
                        signup({ username, nickname, email, password })
                            .then((info) => {
                                console.log(info);
                            })
                            .catch((error) => {
                                console.log(error);
                            });
                    }
                }}
            >
                submit
            </Button>
        </Box>
    );
}
