import {ZodError} from "zod";
import {customZodError} from "../validation";

export enum ErrorCodes {
    ALREADY_EXISTS = 'already_exists',
    BAD_REQUEST = 'bad_request',
    NOT_FOUND = 'not_found',
    UNAUTHORIZED = 'unauthorized',
    FORBIDDEN = 'forbidden',
    GENERIC = 'error',
    MISSING_PARAMETERS = 'missing_parameters',
    INTEGRATION_NOT_FOUND = 'integration_not_found',
    LOCATION_MISMATCH_INTEGRATION = 'location_mismatch_integration',
    LOCATION_ASSIGNED = 'location_already_assigned',
    ORDER_NOT_FOUND = 'order_not_found',
    VALIDATION_ERROR = 'validation_error',
    INVALID_CART = 'invalid_cart',
    NOT_ONBOARDING = 'user_not_onboarding',
    UPDATE_PASSWORD_ERROR = 'update_password_error',
    NO_MENU_JOB = 'no_menu_job',
    OTTONOMY_API_ERROR = 'ottonomy_api_error',
    HUBSPOT_API_ERROR = 'hubspot_api_error',
    INVALID_PHONE_NUMBER = 'invalid_phone_number',
    GUEST_NOT_FOUND = 'guest_not_found',
    INVALID_OTP_CODE = 'invalid_otp_code',
    INVALID_EMAIL = 'invalid_email',
    MISSING_EMAIL = 'missing_email',
    MISSING_PASSWORD = 'missing_password',
    INVALID_CREDENTIALS = 'invalid_credentials',
    MERCHANT_NOT_CONFIGURED = 'merchant_not_configured',
    DUPLICATED_KEY = 'duplicated_key',
    BLOCKED_USER = 'blocked_user',
    DASHBOARD_ACCESS_DENIED = 'dashboard_access_denied',
    RESERVATION_NOT_FOUND = 'no_reservation_found',
    PMS_ERROR = 'pms_error',
    INTEGRATION_CONNECTED = 'integration_connected',
    INTEGRATION_NOT_SUPPORTED = 'integration_not_supported',
    RESET_PASSWORD_EXPIRED = 'reset_password_expired',
    USER_IS_MEMBER = 'user_is_member',
    USER_IS_NOT_MEMBER = 'user_is_not_member',
    USER_CAN_NOT_REMOVE = 'user_can_not_remove',
    USER_CAN_NOT_ADD = 'user_can_not_add',
    USER_NOT_VERIFIED = 'user_not_verified',
    DOORDASH_API_ERROR = 'doordash_api_error',
    NO_DATA_AVAILABLE = 'no_data_available',
}

export enum HttpCodes {
    OK = 200,
    CREATED = 201,
    MULTIPLE_CHOICES = 300,
    MOVED_PERMANENTLY = 301,
    RESOURCE_MOVED = 302,
    SEE_OTHER = 303,
    NOT_MODIFIED = 304,
    USE_PROXY = 305,
    SWITCH_PROXY = 306,
    TEMPORARY_REDIRECT = 307,
    PERMANENT_REDIRECT = 308,
    BAD_REQUEST = 400,
    UNAUTHORIZED = 401,
    PAYMENT_REQUIRED = 402,
    FORBIDDEN = 403,
    NOT_FOUND = 404,
    METHOD_NOT_ALLOWED = 405,
    NOT_ACCEPTABLE = 406,
    PROXY_AUTHENTICATION_REQUIRED = 407,
    REQUEST_TIMEOUT = 408,
    CONFLICT = 409,
    GONE = 410,
    TOO_MANY_REQUESTS = 429,
    INTERNAL_SERVER_ERROR = 500,
    NOT_IMPLEMENTED = 501,
    BAD_GATEWAY = 502,
    SERVICE_UNAVAILABLE = 503,
    GATEWAY_TIMEOUT = 504,
}

abstract class HttpError extends Error {
    public status: number;

    public code: string;

    public data: Record<string, unknown>;
}

export class BadRequest extends HttpError {
    constructor(
        message = 'Bad Request',
        code = ErrorCodes.BAD_REQUEST,
        data = {}
    ) {
        super(message);
        this.status = HttpCodes.BAD_REQUEST;
        this.code = code;
        this.data = data;
    }
}

export const handleError = (
    err: any
): {
    status: number;
    data: {
        success: boolean;
        message: string;
        code: string;
    };
} => {
    let message: string =
        err instanceof ZodError ? customZodError(err) : err.message;
    let code =
        err instanceof ZodError
            ? ErrorCodes.VALIDATION_ERROR
            : err.code || ErrorCodes.GENERIC;
    if (message.includes('E11000')) {
        code = ErrorCodes.DUPLICATED_KEY;
        const duplicatedKey = message
            .substring(message.indexOf('{') + 1, message.lastIndexOf(':'))
            .trim();
        message = `Duplicated key: ${duplicatedKey}`;
    }
    return {
        status: err.status || HttpCodes.BAD_REQUEST,
        data: {
            success: false,
            message,
            code,
        },
    };
};