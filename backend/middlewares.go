package main

import (
	"net/http"
)

func (cfg *appConfig) withTxMiddleware(next txHandler) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		ctx := r.Context()

		tx, err := cfg.db.Begin(ctx)
		if err != nil {
			writeJSONError(w, http.StatusInternalServerError, "error", err)
			return
		}
		defer tx.Rollback(ctx)

		qtx := cfg.database.WithTx(tx)

		if Error := next(w, r, qtx); Error.err != nil {
			writeJSONError(w, Error.code, Error.message, Error.err)
			return
		}

		if err := tx.Commit(ctx); err != nil {
			writeJSONError(w, http.StatusInternalServerError, "error", err)
			return
		}
	}
}
