interface OrderDetails {
    authorized_payment_method: string;
    session_id: string;
    fraud_status: 'ACCEPTED' | 'REJECTED' | 'PENDING';
    order_id: string;
    redirect_url: string;
}

export interface KlarnaSuccessApiResponse {
    success: boolean;
    order: OrderDetails;
}