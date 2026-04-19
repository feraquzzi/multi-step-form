package service

import (
	"context"
	"database/sql"
	"multi-step-form-main/internal/models"
	"multi-step-form-main/internal/repository"
	"multi-step-form-main/internal/validator"
)

type UserService struct {
	DB *sql.DB
}

func NewUserService(db *sql.DB) *UserService {
	return &UserService{DB: db}
}

func (s *UserService) CreateUser(ctx context.Context, user *models.InputData) error{
	
	if err := validator.ValidateInputData(user); err != nil {
		return err
	}

	err := repository.InsertUserData(ctx, s.DB, user)
	if err != nil {
		return err
	}

	return nil
}