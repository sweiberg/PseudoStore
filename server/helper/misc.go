package helper

import "regexp"

var URLParamString = regexp.MustCompile(`[^a-zA-Z0-9+]+`)

func SanitizeURLParameter(parameter string) string {
	return URLParamString.ReplaceAllString(parameter, "")
}
