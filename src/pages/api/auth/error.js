import { useRouter } from 'next/router';

export default function ErrorPage() {
    const router = useRouter();
    const { error } = router.query;

    return (
        <div>
            <h1>Authentication Error</h1>
            <p>An error occurred during the authentication process.</p>
            <p>Error Details: {error}</p>
        </div>
    );
}
