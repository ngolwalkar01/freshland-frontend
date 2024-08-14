"use client";

import SeasonOverview from '@/components/pages/seasonoverview/seasonoverview';
import Layout from '@/components/layout';
import ActiveUserKlaviyo from '@/components/atoms/activeUserKlaviyo';

const Season = () => {
    return (
        <Layout>
            <ActiveUserKlaviyo />
            <SeasonOverview />
        </Layout>
    )
};

export default Season;