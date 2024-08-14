import { useEffect } from 'react';
import { userActiveOnSite } from '@/components/service/klaviyoTrack';

const ActiveUserKlaviyo = () => {
    useEffect(() => {
        const fetchData = async () => {
            await userActiveOnSite();
        }

        fetchData();
    }, [])
    return <></>
}

export default ActiveUserKlaviyo;