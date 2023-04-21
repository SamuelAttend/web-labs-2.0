import { Box, Button, TextField } from "@mui/material";
import { useState } from "react";
import { sx } from "../../props/box.sx";

export default function Index() {
    const [email, setEmail] = useState<String>("");

    const [password, setPassword] = useState<String>("");
    const [passwordError, setPasswordError] = useState<boolean>(false);

    return (
        <>
            <Box sx={sx}>
                <TextField
                    value={email}
                    onChange={(e) => {
                        setEmail(e.target.value);
                    }}
                    label={"Email"}
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

                <Button
                    variant="outlined"
                    onClick={() => {
                        if (!passwordError) {
                            console.log("CLICK!");
                        }
                    }}
                >
                    submit
                </Button>
            </Box>
        </>
    );
}
