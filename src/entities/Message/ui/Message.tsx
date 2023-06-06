import cls from './Message.module.scss'
import clsx from "clsx";

interface MessageProps {
    type: string,
    text: string
}

export const Message = (props: MessageProps) => {
    const {type, text} = props

    return (
        <div className={clsx(cls.Message, cls[type])}>
            {type === 'sent' ? 'Вы' : 'Вам'}{': '}{text}
        </div>
    )
}
