package httpErrors

type HTTPError struct {
	ErrorStatus  int    `json:"error_status"`
	ErrorMessage string `json:"error_message"`
}

func NewHTTPError(status int, message string) HTTPError {
	return HTTPError{
		ErrorStatus:  status,
		ErrorMessage: message,
	}
}
