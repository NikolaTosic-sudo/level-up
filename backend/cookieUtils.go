package main

import "net/http"

func (cfg *appConfig) removeCookiePath(name, path string) http.Cookie {
	cookie := http.Cookie{
		Name:     name,
		Value:    "",
		Path:     path,
		MaxAge:   -1,
		HttpOnly: true,
		Secure:   false,
		SameSite: http.SameSiteLaxMode,
	}

	return cookie
}

func (cfg *appConfig) removeCookie(name string) http.Cookie {
	cookie := cfg.removeCookiePath(name, "/")

	return cookie
}

func (cfg *appConfig) makeCookieMaxAge(name, value, path string, maxAge int) http.Cookie {
	cookie := http.Cookie{
		Name:     name,
		Value:    value,
		Path:     path,
		MaxAge:   maxAge,
		HttpOnly: true,
		Secure:   false,
		SameSite: http.SameSiteLaxMode,
	}

	return cookie
}

func (cfg *appConfig) makeCookie(name, value, path string) http.Cookie {
	cookie := cfg.makeCookieMaxAge(name, value, path, 604800)

	return cookie
}
