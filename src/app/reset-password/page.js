
import ResetPassword from '@/components/pages/resetpassword';
import { Suspense } from "react";
import { commonTranslation} from '@/locales';
const lang = process.env.NEXT_PUBLIC_LANG || 'se';
const Reset = () => {
    const cmt = commonTranslation[lang];
    return (
        <Suspense fallback={<div>{cmt.loading}</div>}>
            <ResetPassword />
        </Suspense>
    )
};

export default Reset;