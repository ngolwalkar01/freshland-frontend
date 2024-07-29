
import ResetPassword from '@/components/pages/resetpassword';
import { Suspense } from "react";

const Reset = () => {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <ResetPassword />
        </Suspense>
    )
};

export default Reset;