import type {NextPage} from 'next'
import Head from 'next/head'
import {LoginForm} from "@/features/authByIdAndToken";
import {useAppSelector} from "@/shared/hooks/useAppSelector/useAppSelector";
import {selectUserAuthData} from "@/entities/User";
import {WhatsAppChat} from "@/widgets/WhatsAppChat";

const Home: NextPage = () => {
    const isLoggedIn = useAppSelector(selectUserAuthData)

    return (
        <div>
            <Head>
                <title>Green Api Review Case</title>
                <meta name="description" content="Green Api Review Case"/>
                <link rel="icon" href="/favicon.ico"/>
            </Head>
            {isLoggedIn ? <WhatsAppChat/> : <LoginForm/>}
        </div>
    )
}

export default Home
