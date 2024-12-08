package httpErrors

type HTTPError struct {
	ErrStatus  int    `json:"error_status,omitempty"`
	ErrMessage string `json:"error_message,omitempty"`
}

func NewHTTPError(status int, message string) HTTPError {
	return HTTPError{
		ErrStatus:  status,
		ErrMessage: message,
	}
}
