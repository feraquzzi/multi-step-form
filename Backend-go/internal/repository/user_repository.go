package repository

import (
	"context"
	"database/sql"
	"log"
	"multi-step-form-main/internal/models"

	"time"

	"multi-step-form-main/internal/utils"
)

func InsertUserData(ctx context.Context, db *sql.DB, user *models.InputData) error {
	ctx, cancel := context.WithTimeout(ctx, 5*time.Second)
	defer cancel()

	query := `INSERT INTO user_input(user_name, email, phone, user_plan, online_option, storage_option, user_profile, billing)
		VALUES (:1, :2, :3, :4, :5, :6, :7, :8)`

	_, err := db.ExecContext(ctx, query,
		user.Name,
		user.Email,
		user.Phone,
		user.Plan,
		utils.BoolToChar(user.Addons.Online),
		utils.BoolToChar(user.Addons.Storage),
		utils.BoolToChar(user.Addons.Profile),
		user.Billing,
	)

	if err != nil {
		log.Printf("Failed to Insert data %v", err)
		return err
	}

	return nil
}
