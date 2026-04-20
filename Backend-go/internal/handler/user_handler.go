package handler

import (
	"encoding/json"
	"log"
	"multi-step-form-main/internal/models"
	"multi-step-form-main/internal/service"
	"net/http"
)

type UserHandler struct {
	Service *service.UserService
}

func NewUserHandler(serv *service.UserService) *UserHandler {
	return &UserHandler{Service: serv}
}

// func enableCORS(w *http.ResponseWriter) {
// 	(*w).Header().Set("Access-Control-Allow-Origin", "*")
// 	(*w).Header().Set("Access-Control-Allow-Methods", "POST, GET, OPTIONS")
// 	(*w).Header().Set("Access-Control-Allow-Headers", "Content-Type")
// }

func (h *UserHandler) GatherUserData(w http.ResponseWriter, r *http.Request) {

	// enableCORS(&w)

	// if r.Method != http.MethodOptions{
	// http.Error(w, "Method not allowed", http.StatusMethodNotAllowed)
	// 	return
	// }

	log.Println("Request hit /api/user")

	if r.Method != http.MethodPost {
		http.Error(w, "Method not allowed", http.StatusMethodNotAllowed)
		return
	}

	var user models.InputData

	if err := json.NewDecoder(r.Body).Decode(&user); err != nil {
		http.Error(w, "invalid request body", http.StatusBadRequest)
		return
	}

	err := h.Service.CreateUser(r.Context(), &user)
	if err != nil {
		log.Println("SERVICE ERROR:", err)
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusCreated)

	json.NewEncoder(w).Encode(map[string]string{"message": "User created successfully"})
}
