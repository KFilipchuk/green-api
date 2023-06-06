import cls from './WhatsAppChat.module.scss'
import {Button, CircularProgress, TextField} from "@mui/material";
import {Message, MessageType} from "@/entities/Message";
import {ChangeEvent, useMemo, useRef, useState} from "react";
import {useAppSelector} from "@/shared/hooks/useAppSelector/useAppSelector";
import {selectUserAuthData} from "@/entities/User";

export const WhatsAppChat = () => {
    const authData = useAppSelector(selectUserAuthData)

    const [messages, setMessages] = useState<MessageType[]>([])
    const [text, setText] = useState('')
    const [loading, setLoading] = useState(false)

    const interval = useRef<ReturnType<typeof setInterval>>()

    const API = useMemo(() => {
        return whatsAppClient.restAPI({
            idInstance: authData?.id,
            apiTokenInstance: authData?.apiToken
        })
    }, [])

    const onChangeMessage = (e: ChangeEvent<HTMLInputElement>) => {
        setText(e.target.value)
    }

    const startReceivingIncomingMessages = async () => {
        if (interval.current) clearInterval(interval.current)

        interval.current = setInterval(() => {
            try {
                API.webhookService.receiveNotification().then((response: any) => {
                    if (!response) return

                    API.webhookService.deleteNotification(response.receiptId)

                    if (response.body.typeWebhook === 'outgoingMessageReceived') {
                        setMessages(s => [...s, {
                            type: 'received',
                            text: response.body.messageData.textMessageData.textMessage
                        }])
                    }
                })
            } catch (e) {
                console.error(e)
            }
        }, 5000)
    }


    const sendMessage = () => {
        setLoading(true)

        API.message.sendMessage(`${authData?.phone}@c.us`, null, text).then(async () => {
            setMessages(s => ([
                ...s, {type: 'sent', text}
            ]))
            setText('')
            startReceivingIncomingMessages()
        }).finally(() => {
            setLoading(false)
        })
    }

    return (
        <div className={cls.WhatsAppChat}>
            <div className={cls.MessagesContainer}>
                {Boolean(messages.length) ? messages.map((msg, i) => (
                    <Message key={i} text={msg.text} type={msg.type}/>
                )) : <h3>Здесь ещё нет сообщений</h3>}
            </div>
            <TextField placeholder="Введите сообщение" value={text} onChange={onChangeMessage}/>
            <Button variant="contained" onClick={sendMessage} disabled={loading}>
                {loading ? <CircularProgress/> : 'Отправить'}
            </Button>
        </div>
    )
}
