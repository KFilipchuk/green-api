import cls from './LoginForm.module.scss'
import {Box, Button, TextField} from "@mui/material";
import {ChangeEvent, useState} from "react";
import {userActions} from "@/entities/User";
import {useAppDispatch} from "@/shared/hooks/useAppDispatch/useAppDispatch";
import {User} from "@/entities/User";

export const LoginForm = () => {
    const dispatch = useAppDispatch()

    const [user, setUser] = useState<User>({
        id: '1101827633',
        apiToken: '8da9d8ae79034821aa6b113d998bfb846ce28d15b81448f3a8',
        phone: '375336221306'
    })

    const onChangeId = (e: ChangeEvent<HTMLInputElement>) => {
        setUser(s => ({...s, id: e.target.value}))
    }

    const onChangeToken = (e: ChangeEvent<HTMLInputElement>) => {
        setUser(s => ({...s, apiToken: e.target.value}))
    }

    const onChangePhone = (e: ChangeEvent<HTMLInputElement>) => {
        setUser(s => ({...s, phone: e.target.value}))
    }

    const authByIdAndToken = () => {
        if (!user.id || !user.apiToken || !user.phone) return

        dispatch(userActions.setAuthData(user))
    }

    return (
        <Box className={cls.LoginForm}>
            <h2>Вам необходимо авторизоваться</h2>
            <TextField variant="outlined" placeholder="Введите ваш id" label="id" value={user.id} onChange={onChangeId} />
            <TextField variant="outlined" placeholder="Введите ваш apiToken" label="apiToken" value={user.apiToken} onChange={onChangeToken} />
            <TextField variant="outlined" placeholder="Введите номер телефона, с кем хотите начать чат" label="userPhone" value={user.phone} onChange={onChangePhone} />
            <Button variant="contained" type="submit" onClick={authByIdAndToken}>Войти</Button>
        </Box>
    )
}
